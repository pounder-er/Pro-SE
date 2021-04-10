import React from 'react';

import fire_base from '../../firebase/Firebase';
import {
    Link,
} from 'react-router-dom';

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
import {i18n} from '../i18n';
import AssignEx from './AssignEx';

import { FaFilePdf } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";


const filterValue = [
    { name: 'productID', operator: 'startsWith', type: 'string', },
    { name: 'productName', operator: 'startsWith', type: 'string', },
    { name: 'productPrice', operator: 'startsWith', type: 'string', },
    { name: 'volume', operator: 'startsWith', type: 'string', },
    { name: 'disCount', operator: 'startsWith', type: 'string', },
    { name: 'summary', operator: 'startsWith', type: 'string', },

];

const columns = [
    { name: 'productID', header: 'หมายเลขสินค้า', defaultVisible: true, groupBy: false },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'productPrice', groupBy: false, defaultFlex: 1, header: 'ราคาสินค้าต่อหน่วย' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'จำนวน' },
    { name: 'disCount', groupBy: false, defaultFlex: 1, header: 'ส่วนลด' },
    { name: 'summary', groupBy: false, defaultFlex: 1, header: 'ยอดรวม' },

]

class SellDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceImageFile:null
            ,
            imageUrl: null,

            ModalImage: false,
            disabledButtonSaveOrEdit: true,
            disabledButtonDefault: true,
            loading: false,


            modalAssing:false,
            searchText: '',
            dataSource: [],
        }
        this.sum = 0
        this.hiddenFileInputRef = React.createRef();
    }
    
    componentDidMount() {
        //await fire_base.getAllSell(this.getAllSellSuccess, this.unSuccess);
        //console.log(this.props.profile.log[0].productPrice)
        
        for(let x of this.props.profile.log){
            x.productID.get()
            .then(doc=>{
                let d = doc.data();
                d.productID = doc.id;
                d.productPrice = x.productPrice
                d.disCount = x.disCount
                d.volume = x.volume
                console.log(d.volume,'*',d.productPrice,'-',d.disCount)
                d.summary = d.volume*d.productPrice-d.disCount
                this.sum += d.summary
                this.setState({dataSource:this.state.dataSource.concat(d)});
                console.log(this.state.dataSource)
            })
        }
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    

    onChangeStatus = (num) =>{
        fire_base.updateChangeStatusSo(this.props.profile.InID, 1,this.ChangeStatusSuccess,this.unSuccess);
    }

    ChangeStatusSuccess = () =>{
        console.log('update success');
    }

    unSuccess=(error)=>{
        console.log(error);
    }

    toggleModalImage = (e) => {
        e.preventDefault();
        // this.selectModal = select;
        this.setState({ ModalImage: !this.state.ModalImage });
    }

    setDefaultImageCrop = () => {
        
        this.setState({ sourceImageFile: null })
        // this.setState({
        //     sourceImageFile: null,

        //     disabledButtonSaveOrEdit: true,
        //     disabledButtonDefault: true,
        //     resizeImageUrl: ''
        // });
    }

    uploadImageSuccess = (url) => {
        console.log('upload image success');
        let i = {}
        i.receipt = url;
        // console.log(this.selectModal);
        fire_base.updateImageSellBuy(this.props.profile.InID,'Sell', i, this.updateImageSellBuySuccess, this.unSuccess)
    }

    updateImageSellBuySuccess = () => {
        console.log('update url success');
    }
    toggleModalAss = () => {
        
        this.setState({ modalAssing: !this.state.modalAssing });
    }
    render() {
        return (
            <Container fluid={false} style={{ backgroundColor: 'while'}} >
                <Button color="danger" onClick={this.toggleModalAss} style={{ width: 100 }}>zz</Button>
                <Modal isOpen={this.state.modalAssing} toggle={this.toggleModalAss} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalAss}>มอบหมายงาน</ModalHeader>
                    <ModalBody>
                        <AssignEx invoice={this.props.profile} closeTogle={this.toggleModalAss}/>
                    </ModalBody>
                </Modal>
                 <Modal isOpen={this.state.ModalImage} toggle={this.toggleModalImage} backdrop='static' >
                    <ModalHeader >เลือก/แก้ไข รูปสินค้า</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>

                                {this.state.sourceImageFile && (
                                    <img src={URL.createObjectURL(this.state.sourceImageFile)} />
                                )}

                                {!this.state.sourceImageFile && (
                                    <Button
                                        onClick={() => this.hiddenFileInputRef.current.click()}
                                        color="secondary"
                                        style={{ height: '260px', width: '260px' }} >
                                        <input
                                            type="file"
                                            ref={this.hiddenFileInputRef}
                                            onChange={(e) => {
                                                console.log(e.target.files[0]);
                                                this.state.sourceImageFile = e.target.files[0];
                                                this.setState({
                                                    sourceImageFile: this.state.sourceImageFile,
                                                    disabledButtonSaveOrEdit: false, disabledButtonDefault: false
                                                });


                                            }}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                        <BiImageAdd size={100} />
                                        <h6 style={{ marginTop: 10 }}>อัปโหลดรูปภาพ</h6>


                                    </Button>
                                )}
                            </Col>
                        </FormGroup>
                        {/* {this.state.sourceImageFile && (
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
                                    )} */}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.profile.receipt &&
                            <Button color="primary" onClick={() => {
                                // setFieldValue('image', '');
                                //this.setDefaultImageCrop();
                                window.open(this.props.profile.receipt, "_blank")
                            }}
                            >ดูรูปที่มีอยู่</Button>}

                        {' '}
                        <Button color="primary" onClick={() => {
                            // setFieldValue('image', '');
                            this.setDefaultImageCrop();
                        }}
                            disabled={this.state.disabledButtonDefault} >คืนค่าเริ่มต้น</Button>
                        {' '}
                        <Button
                            color="success"
                            disabled={!this.state.sourceImageFile}
                            onClick={async (e) => {
                                // this.editor.getImage().toBlob(async (blob) => {
                                //     // const resizeBlob = await resizeImageFile(blob);
                                //     // await console.log(resizeBlob);
                                //     // await setFieldValue('image', resizeBlob);
                                //     const url = await URL.createObjectURL(resizeBlob);
                                //     await this.setState({ resizeImageUrl: url });
                                //     await console.log(url);

                                // }, 'image/jpeg', 1);
                                fire_base.uploadImage( 'receipt/' + this.props.profile.InID, this.state.sourceImageFile, this.uploadImageSuccess, this.unSuccess)

                            }}>
                            แก้ไข/บันทึก
                                    </Button>
                        {' '}
                        <Button color="secondary" onClick={this.toggleModalImage}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>
                <Row style={{ height: 25 }}>
                    <Col >
                    </Col>
                    <Col >
                    </Col >
                    <Col style={{display:'flex',flexDirection:'row',justifyContent: 'flex-end'}} >
                        {this.props.profile.status == 'รอชำระเงิน'&&<Button color="info" onClick={(e)=>{e.preventDefault(); this.onChangeStatus(1);}} style={{ width: 100 ,marginRight: 15}}>ชำระเงินแล้ว</Button>}
                        {this.props.profile.status == 'รอจัดส่ง' && <Button color="info" onClick={(e)=>{e.preventDefault();}} style={{ width: 100 ,marginRight: 15}}>มอบหมายงาน</Button>}
                        {' '}
                        <Button color="danger" style={{ width: 100 }}>ยกเลิก</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col md = {4}>
                        <Label>หมายเลขใบแจ้งหนี้: {this.props.profile.InID}</Label>
                    </Col>
                    <Col md = {4}>
                        <Label>สถานะ: {this.props.profile.status}</Label>
                    </Col >
                    
                </Row>
                <Row style={{ height: 50 }}>
                    <Col>
                        <Label>วันที่สร้างใบแจ้งหนี้: {this.props.profile.dateCreate}</Label>
                    </Col>
                    <Col >
                        {this.props.profile.datePay && <Label>วันที่ชำระเงิน: {this.props.profile.datePay}</Label>}
                        {!this.props.profile.datePay && <Label>วันที่ชำระเงิน: -</Label>}
                    </Col >
                    <Col >
                        
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col  >
                        {this.props.profile.dateOut && <Label>วันที่สินค้าออกคลัง: {this.props.profile.dateOut}</Label> }
                        {!this.props.profile.dateOut && <Label>วันที่สินค้าออกคลัง: -</Label> }    
                    </Col>
                    <Col >
                        {this.props.profile.dateIn && <Label>วันที่สินค้าถึงสาขา: {this.props.profile.dateIn}</Label>}
                        {!this.props.profile.dateIn && <Label>วันที่สินค้าถึงสาขา: -</Label>}
                    </Col >
                    <Col >
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                <Col md={2} >
                        <Label>ใบแจ้งหนี้: </Label>
                        <button  style={{ display: 'contents' }}>
                            <FaFilePdf color='red' size={25} />
                        </button>
                    </Col>
                    <Col md={4} >
                        <Label>ใบเสร็จ </Label>
                        <button style={{ display: 'contents' }} onClick={(e) => { this.toggleModalImage(e); e.preventDefault(); }} >
                            <AiFillFileText color='#00A3FF' size={30} />
                        </button>
                        <button style={{ display: 'contents' }}>
                            <FaFilePdf size={25} color='red' />
                        </button>
                    </Col>
                    
                    
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <ReactDataGrid
                        onReady={this.setDataGridRef}
                        i18n={i18n}
                        idProperty="id"
                        columns={columns}
                        pagination
                        defaultLimit={15}
                        defaultSkip={15}
                        pageSizes={[10, 15, 30]}
                        dataSource={this.state.dataSource}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                    />
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    {/* <Col md = {9}>
                    </Col> */}
                    <Col className="text-center text-md-right">
                    <Label > ยอดรวม: {this.sum} บาท</Label>
                    </Col>
                </Row>   
            </Container>

            
        );
    }
}

SellDetail.propTypes = {
    profile: PropTypes.object
  };

export default SellDetail;