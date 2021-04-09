import React from 'react';
import fire_base from '../../firebase/Firebase';
import PropTypes from 'prop-types';
import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Label,
    FormFeedback,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink, Row, Col, Container, Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { AiFillFileText } from "react-icons/ai";

import { i18n } from '../i18n';
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const filterValue = [
    { name: 'ID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'idp', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productType', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productWeight', operator: "gte", type: 'number', },
    { name: 'newOld', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productPrice', operator: 'gte', type: 'number' },
    { name: 'productStatus', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productTotal', operator: "gte", type: 'number', },
];


class ProductReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modal:false,
            product: {},
        }
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'idp', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
            { name: 'productName', groupBy: false, defaultFlex: 2, header: 'รายการสินค้า' },
            { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
            { name: 'productWeight', groupBy: false, defaultFlex: 0.7, header: 'น้ำหนัก' },
            { name: 'newOld', groupBy: false, defaultFlex: 1, header: 'เก่า/ใหม่' },
            { name: 'productPrice', groupBy: false, defaultFlex: 1.2, header: 'ราคาต่อหน่วย' },
            { name: 'productStatus', groupBy: false, defaultFlex: 0.7, header: 'สถานะ' },
            { name: 'productTotal', groupBy: false, defaultFlex: 1, header: 'ยอดคงเหลือ' },
            {
                name: 'detail1', header:
                    <div style={{ display: 'inline-block' }}>
                        {'รายละเอียด'}
                    </div>, defaultWidth: 109,
                render: ({ data }) =>
                    <button onClick={(e) => { this.toggleModalmodal(e); this.product = data; }} style={{ display: 'contents' }}>
                        <AiFillFileText color='#00A3FF' size={30} />
                    </button>,
                textAlign: 'center'
            },

        ]
    }
    toggleModalmodal = () => {
        
        this.setState({ modal: !this.state.modal });
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);
    }

    getAllProductSuccess = async (querySnapshot) => {
        let data = []
        await querySnapshot.forEach(async (doc) => {
            if (doc.id != 'state') {

                let d = doc.data();

                d.idp = doc.id;
                if(d.idp[1]=='1'){
                    d.newOld = 'ใหม่'
                }else{
                    d.newOld = 'เก่า'
                }
                d.companyID.get()
                    .then(doc => {
                        d.companyName = doc.data().companyName
                    })
                let a = await d.productType.get()
                    .then(doc => {
                        d.productType = doc.data().name

                        this.setState({ dataSource: this.state.dataSource.concat(d) });
                    })
            }
        });

    }

    unSuccess(error) {
        console.log(error);
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Modal isOpen={this.state.modal} toggle={this.toggleModalmodal} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalmodal}>รายละเอียดสินค้า</ModalHeader>
                    <ModalBody>
                        <ProductDetail product={this.product}/>
                    </ModalBody>
                </Modal>
                <Row style={{ marginTop: '20px' }}>
                    <ReactDataGrid alignSelf='center'
                        onReady={this.setDataGridRef}
                        i18n={i18n}
                        idProperty="id"
                        columns={this.columns}
                        pagination
                        defaultLimit={15}
                        defaultSkip={15}
                        pageSizes={[10, 15, 30]}
                        dataSource={this.state.dataSource}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                        style={{ minHeight: 550 }}
                    />
                </Row>

            </Container>
        );
    }
}


export default ProductReport;