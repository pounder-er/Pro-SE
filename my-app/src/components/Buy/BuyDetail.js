import React from 'react';

import fire_base from '../../firebase/Firebase';
import {
    Link,
} from 'react-router-dom';
import { AiFillFileText } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import {
    Button,
    Row,
    Col,
    Label,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import 'react-pro-sidebar/dist/css/styles.css';
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import PropTypes from 'prop-types';
import { i18n } from '../i18n';
import AssignIn from './AssignIn';
import AvatarEditor from 'react-avatar-editor';

import Resizer from 'react-image-file-resizer';

import { BiImageAdd } from "react-icons/bi";

import PDFPO from '../PDF/PDFPO'

const filterValue = [
    { name: 'productID', operator: 'startsWith', type: 'string', },
    { name: 'productName', operator: 'startsWith', type: 'string', },
    { name: 'productPrice', operator: 'startsWith', type: 'string', },
    { name: 'volume', operator: 'startsWith', type: 'string', },
    { name: 'disCount', operator: 'startsWith', type: 'string', },
    { name: 'summary', operator: 'startsWith', type: 'string', },

];

const columns = [
    { name: 'productID', header: 'หมายเลขสินค้า', defaultVisible: true, groupBy: false, editable: false },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า', editable: false },
    {
        name: 'productPrice',
        groupBy: false,
        defaultFlex: 1,
        header: 'ราคาสินค้าต่อหน่วย',
        type: 'number',
        render: ({ value }) => {
            if (value == null) {
                return '-';
            }
            return value;
        }
    },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'จำนวน', editable: false },
    {
        name: 'disCount',
        groupBy: false,
        defaultFlex: 1,
        header: 'ส่วนลด',
        type: 'number',
        render: ({ value }) => {
            if (value == null) {
                return '-';
            }
            return value;
        }
    },
    {
        name: 'summary',
        groupBy: false,
        defaultFlex: 1,
        header: 'ยอดรวม',
        editable: false,
        type: 'number',
        render: ({ value }) => {
            if (value == null) {
                return '-';
            }
            return value;
        }
    },

]

const resizeImageFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 250, 250, 'JPEG', 50, 0,
        uri => {
            resolve(uri);
        },
        'blob'
    );
});

class BuyDetail extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                sourceImageFile: { in: null,
                    receipt: null
                },
                imageUrl: { in: null,
                    receipt: null
                },
                disButtonSave: true,

                // zoom: 1,
                ModalImage: false,
                disabledButtonSaveOrEdit: true,
                disabledButtonDefault: true,
                loading: false,
                // resizeImageUrl: '',

                editTable: false,
                searchText: '',
                dataSource: [],
                sum: 0,
                modalAssing: false,

                modalPdf: false

            }
            this.hiddenFileInputRef = React.createRef();
            this.selectModal = ''
        }

        componentDidMount() {
            if (this.props.profile.status == 'รอใบเสนอราคา' || this.props.profile.status == 'รอชำระเงิน') {
                this.setState({ editTable: true });
            }
            this.state.imageUrl.receipt = this.props.profile.receipt;
            this.state.imageUrl.in = this.props.profile.in;
            //await fire_base.getAllSell(this.getAllSellSuccess, this.unSuccess);
            // console.log(this.props.profile)
            console.log(this.props.profile);
            for (let x of this.props.profile.log) {
                x.productID.get()
                    .then(doc => {
                        let d = doc.data();
                        d.productID = doc.id;
                        d.productPrice = x.productPrice
                        d.disCount = x.disCount
                        d.volume = x.volume
                        console.log(d.disCount)
                        if (d.productPrice != null && d.disCount != null) {
                            d.summary = d.productPrice * d.volume - d.disCount;
                            this.state.sum += d.summary;
                        } else {
                            d.summary = null;
                        }

                        this.setState({ dataSource: this.state.dataSource.concat(d) });
                        // console.log(this.state.dataSource)
                    })
            }
        }

        toggleModalImage = (e, select) => {
            e.preventDefault();
            this.selectModal = select;
            this.setState({ ModalImage: !this.state.ModalImage });
        }

        toggleModalPdf = (e) => {
            e.preventDefault();
            this.setState({ modalPdf: !this.state.modalPdf });
        }

        setDefaultImageCrop = () => {
            this.state.sourceImageFile[this.selectModal] = null;
            this.setState({ sourceImageFile: this.state.sourceImageFile })
                // this.setState({
                //     sourceImageFile: null,

            //     disabledButtonSaveOrEdit: true,
            //     disabledButtonDefault: true,
            //     resizeImageUrl: ''
            // });
        }

        setEditorRef = (editor) => (this.editor = editor)

        uploadImageSuccess = (url) => {
            // this.state.imageUrl[this.selectModal] = url;
            // this.setState({imageUrl:this.state.imageUrl});
            // let i = {this.selectModal:this.sourceImageFile[this.selectModal]}
            console.log('upload image success');
            let i = {}
            i[this.selectModal] = url;
            // console.log(this.selectModal);
            fire_base.updateImageSellBuy(this.props.profile.InID, 'Buy', i, this.updateImageSellBuySuccess, this.unSuccess)
        }

        updateImageSellBuySuccess = () => {
            console.log('update url success');
        }

        unSuccess = (error) => {
            console.log(error);
        }


        onEditComplete = ({ value, columnId, rowIndex }) => {
            const data = [...this.state.dataSource];
            data[rowIndex] = Object.assign({}, data[rowIndex], {
                [columnId]: Number(value) });
            if (data[rowIndex]['productPrice'] != null && data[rowIndex]['disCount'] != null) {
                data[rowIndex]['summary'] = data[rowIndex]['productPrice'] * data[rowIndex]['volume'] - data[rowIndex]['disCount'];
            }

            this.state.sum = 0;
            let check = false;
            data.forEach(doc => {
                this.state.sum += doc.summary;
                if (doc.summary == null) {
                    check = true;
                }
            })

            this.setState({ dataSource: data, sum: this.state.sum, disButtonSave: check });


        }

        setDataGridRef = (ref) => (this.dataGrid = ref)

        onChangeStatus = (num) => {

            if (num == 1 || num == 2) {
                for (let i = 0; i < this.state.dataSource.length; i++) {
                    this.props.profile.log[i].productPrice = this.state.dataSource[i].productPrice
                    this.props.profile.log[i].disCount = this.state.dataSource[i].disCount
                }
            }

            fire_base.updateChangeStatusPo(this.props.profile.InID, this.props.profile.log, num, this.updateChangeSuccess, this.unSuccess)
        }

        updateChangeSuccess = () => {
            console.log('update success');
        }
        toggleModalAss = () => {

            this.setState({ modalAssing: !this.state.modalAssing });
        }

        render() {
                return ( <
                        Container fluid = { false }
                        style = {
                            { backgroundColor: 'while' } } > { /* <Button color="danger" onClick={this.toggleModalAss} style={{ width: 100 }}>zz</Button> */ } <
                        Modal isOpen = { this.state.modalAssing }
                        toggle = { this.toggleModalAss }
                        backdrop = 'static'
                        size = 'lg' >
                        <
                        ModalHeader toggle = { this.toggleModalAss } > มอบหมายงาน < /ModalHeader> <
                        ModalBody >
                        <
                        AssignIn invoice = { this.props.profile }
                        closeTogle = { this.toggleModalAss }
                        /> <
                        /ModalBody> <
                        /Modal> <
                        Modal isOpen = { this.state.modalPdf }
                        toggle = { this.toggleModalPdf }
                        backdrop = 'static'
                        size = 'lg' >
                        <
                        ModalHeader toggle = { this.toggleModalPdf } > ppp < /ModalHeader> <
                        ModalBody >
                        <
                        PDFPO data = { this.props.profile }
                        /> <
                        /ModalBody> <
                        /Modal> <
                        Modal isOpen = { this.state.ModalImage }
                        toggle = { this.toggleModalImage }
                        backdrop = 'static' >
                        <
                        ModalHeader > เลือก / แก้ ไข รูปสินค้ า < /ModalHeader> <
                        ModalBody >
                        <
                        FormGroup row >
                        <
                        Col style = {
                            { display: 'flex', justifyContent: 'center' } } >

                        {
                            this.state.sourceImageFile[this.selectModal] && ( <
                                img src = { URL.createObjectURL(this.state.sourceImageFile[this.selectModal]) }
                                />
                            )
                        }

                        {
                            !this.state.sourceImageFile[this.selectModal] && ( <
                                Button onClick = {
                                    () => this.hiddenFileInputRef.current.click() }
                                color = "secondary"
                                style = {
                                    { height: '260px', width: '260px' } } >
                                <
                                input type = "file"
                                ref = { this.hiddenFileInputRef }
                                onChange = {
                                    (e) => {
                                        console.log(e.target.files[0]);
                                        this.state.sourceImageFile[this.selectModal] = e.target.files[0];
                                        this.setState({
                                            sourceImageFile: this.state.sourceImageFile,
                                            disabledButtonSaveOrEdit: false,
                                            disabledButtonDefault: false
                                        });


                                    }
                                }
                                style = {
                                    { display: 'none' } }
                                accept = "image/*" /
                                >
                                <
                                BiImageAdd size = { 100 }
                                /> <
                                h6 style = {
                                    { marginTop: 10 } } > อั ปโหลดรูปภาพ < /h6>


                                <
                                /Button>
                            )
                        } <
                        /Col> <
                        /FormGroup> {
                            /* {this.state.sourceImageFile && (
                                                                    <FormGroup row>
                                                                        <Col >
                                                                            <Label >ซูม</Label>
                                                                            <Input
                                                                                type='range'
                                                                                min="1"
                                                                                max="2"
                                                                                step="0.01"
                                                                                value={this.state.zoom}
                                                                                onChange={(e) => this.setState({ zoom: Number(e.target.value) })}
                                                                            />
                                                                        </Col>
                                                                    </FormGroup>
                                                                )} */
                        } <
                        /ModalBody> <
                        ModalFooter > {
                            this.state.imageUrl[this.selectModal] &&
                            <
                            Button color = "primary"
                            onClick = {
                                () => {
                                    // setFieldValue('image', '');
                                    //this.setDefaultImageCrop();
                                    window.open(this.state.imageUrl[this.selectModal], "_blank")
                                }
                            } >
                            ดูรูปที่ มีอยู่ < /Button>}

                            { ' ' } <
                            Button color = "primary"
                            onClick = {
                                () => {
                                    // setFieldValue('image', '');
                                    this.setDefaultImageCrop();
                                }
                            }
                            disabled = { this.state.disabledButtonDefault } > คืนค่ าเริ่ มต้ น < /Button> { ' ' } <
                            Button
                            color = "success"
                            disabled = {!this.state.sourceImageFile[this.selectModal] }
                            onClick = {
                                async(e) => {
                                    // this.editor.getImage().toBlob(async (blob) => {
                                    //     // const resizeBlob = await resizeImageFile(blob);
                                    //     // await console.log(resizeBlob);
                                    //     // await setFieldValue('image', resizeBlob);
                                    //     const url = await URL.createObjectURL(resizeBlob);
                                    //     await this.setState({ resizeImageUrl: url });
                                    //     await console.log(url);

                                    // }, 'image/jpeg', 1);
                                    fire_base.uploadImage(this.selectModal + '/' + this.props.profile.InID, this.state.sourceImageFile[this.selectModal], this.uploadImageSuccess, this.unSuccess)

                                }
                            } >
                            แก้ ไข / บั นทึก <
                            /Button> { ' ' } <
                            Button color = "secondary"
                            onClick = { this.toggleModalImage } > ยกเลิก < /Button> <
                            /ModalFooter> <
                            /Modal> <
                            Row style = {
                                { height: 50 } } >
                            <
                            Col md = { 8 } >
                            <
                            Label > ผู้ รั บผิดชอบ: { this.props.profile.res } < /Label> <
                            /Col> <
                            /Row> <
                            Row style = {
                                { height: 50 } } >
                            <
                            Col md = { 4 } >
                            <
                            Label > หมายเลขใบแจ้ งหนี้: { this.props.profile.InID } < /Label> <
                            /Col> <
                            Col md = { 4 } >
                            <
                            Label > สถานะ: { this.props.profile.status } < /Label> <
                            /Col >

                            <
                            /Row> <
                            Row style = {
                                { height: 50 } } >
                            <
                            Col >
                            <
                            Label > วั นที่ สร้ างใบแจ้ งหนี้: { this.props.profile.dateCreate } < /Label> <
                            /Col> <
                            Col > {
                                this.props.profile.datePay && < Label > วั นที่ ชำระเงิน: { this.props.profile.datePay } < /Label>} {
                                    !this.props.profile.datePay && < Label > วั นที่ ชำระเงิน: - < /Label>} <
                                        /Col > <
                                        Col >

                                        <
                                        /Col> <
                                        /Row> <
                                        Row style = {
                                            { height: 50 } } >
                                        <
                                        Col > {
                                            this.props.profile.dateOut && < Label > วั นที่ สินค้ าออกคลั ง: { this.props.profile.dateOut } < /Label>} {
                                                !this.props.profile.dateOut && < Label > วั นที่ สินค้ าออกคลั ง: - < /Label>} <
                                                    /Col> <
                                                    Col > {
                                                        this.props.profile.dateIn && < Label > วั นที่ สินค้ าถึงสาขา: { this.props.profile.dateIn } < /Label>} {
                                                            !this.props.profile.dateIn && < Label > วั นที่ สินค้ าถึงสาขา: - < /Label>} <
                                                                /Col > <
                                                                Col >
                                                                <
                                                                /Col> <
                                                                /Row> <
                                                                Row style = {
                                                                    { height: 50 } } >
                                                                <
                                                                Col md = { 2 } >
                                                                <
                                                                Label > ใบสั่ งซื้ อ: < /Label> <
                                                                button onClick = { this.toggleModalPdf }
                                                            style = {
                                                                    { display: 'contents' } } >
                                                                <
                                                                FaFilePdf color = 'red'
                                                            size = { 25 }
                                                            /> <
                                                            /button> <
                                                            /Col> <
                                                            Col md = { 2 } >
                                                                <
                                                                Label > ใบแจ้ งหนี้: < /Label> <
                                                                button onClick = {
                                                                    (e) => { this.toggleModalImage(e, 'in');
                                                                        e.preventDefault(); } }
                                                            style = {
                                                                    { display: 'contents' } } >
                                                                <
                                                                AiFillFileText color = '#00A3FF'
                                                            size = { 30 }
                                                            /> <
                                                            /button> <
                                                            /Col> <
                                                            Col md = { 2 } >
                                                                <
                                                                Label > ใบเสร็ จ: < /Label> <
                                                                button onClick = {
                                                                    (e) => { this.toggleModalImage(e, 'receipt');
                                                                        e.preventDefault(); } }
                                                            style = {
                                                                    { display: 'contents' } } >
                                                                <
                                                                AiFillFileText color = '#00A3FF'
                                                            size = { 30 }
                                                            /> <
                                                            /button> <
                                                            /Col> <
                                                            /Row> <
                                                            Row style = {
                                                                    { marginTop: '20px' } } >
                                                                <
                                                                ReactDataGrid
                                                            onReady = { this.setDataGridRef }
                                                            i18n = { i18n }
                                                            idProperty = "id"
                                                            columns = { columns }
                                                            pagination
                                                            defaultLimit = { 10 }
                                                            defaultSkip = { 10 }
                                                            pageSizes = {
                                                                [10, 20, 30] }
                                                            dataSource = { this.state.dataSource }
                                                            defaultFilterValue = { filterValue }
                                                            showColumnMenuTool = { true }
                                                            editable = { this.state.editTable }
                                                            emptyText = "ไม่มีรายการ"
                                                            style = {
                                                                { minHeight: 300 } }
                                                            onEditComplete = { this.onEditComplete }
                                                            /> <
                                                            /Row> <
                                                            Row style = {
                                                                    { marginTop: '20px' } } > {
                                                                    /* <Col md = {9}>
                                                                                        </Col> */
                                                                } <
                                                                Col className = "text-center text-md-right" >
                                                                <
                                                                Label > ยอดรวม: { this.state.sum }
                                                            บาท < /Label> <
                                                                /Col> <
                                                                /Row> <
                                                                Row style = {
                                                                    { height: 25 } } >
                                                                <
                                                                Col >
                                                                <
                                                                /Col> <
                                                                Col >
                                                                <
                                                                /Col > <
                                                                Col style = {
                                                                    { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' } } > {
                                                                    this.props.profile.status == 'รอใบเสนอราคา' && < Button disabled = { this.state.disButtonSave }
                                                                    color = "info"
                                                                    onClick = {
                                                                        (e) => { e.preventDefault();
                                                                            this.onChangeStatus(1); } }
                                                                    style = {
                                                                        { width: 100, marginRight: 15 } } >
                                                                    บั นทึก <
                                                                    /Button>} {
                                                                        this.props.profile.status == 'รอชำระเงิน' && < Button color = "info"
                                                                        onClick = {
                                                                            (e) => { e.preventDefault();
                                                                                this.onChangeStatus(2); } }
                                                                        style = {
                                                                                { width: 100, marginRight: 15 } } >
                                                                            ชำระเงินแล้ ว <
                                                                            /Button>} {
                                                                                this.props.profile.status == 'รอรับสินค้า' && < Button color = "info"
                                                                                onClick = {
                                                                                    (e) => { e.preventDefault();
                                                                                        this.onChangeStatus(3); } }
                                                                                style = {
                                                                                        { width: 100, marginRight: 15 } } >
                                                                                    รั บสินค้ า <
                                                                                    /Button>} {
                                                                                        /* {this.props.profile.status=='รอขนเข้าคลัง' && <Button  color="info" onClick={this.toggleModalAss()} style={{ width: 100, marginRight: 15 }}>
                                                                                                                    มอบหมายงาน
                                                                                                                    </Button>} */
                                                                                    }

                                                                                { ' ' } { /* <Button color="danger" style={{ width: 100 }}>ยกเลิก</Button> */ } <
                                                                                /Col> <
                                                                                /Row> <
                                                                                /Container>


                                                                            );
                                                                    }
                                                                }

                                                            BuyDetail.propTypes = {
                                                                profile: PropTypes.object
                                                            };

                                                            export default BuyDetail;