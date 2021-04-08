import React from 'react';
import PropTypes from 'prop-types';
import fire_base from '../../firebase/Firebase';
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
    PaginationLink, Row, Col, Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillFileText } from "react-icons/ai";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import { i18n } from '../i18n';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const filterValue = [
    { name: 'ID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'Inid', operator: 'startsWith', type: 'string', value: '' },
    { name: 'arriveDate', operator: 'startsWith', type: 'string', value: '' },
    { name: 'expireDate', operator: 'startsWith', type: 'string', value: '' },
    { name: 'volume', operator: "gte", type: 'number', },
    { name: 'newOld', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productID', operator: 'gte', type: 'number' },

];

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }

        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'Inid', groupBy: false, defaultFlex: 1, header: 'หมายเลขใบ INV.' },
            { name: 'arriveDate', groupBy: false, defaultFlex: 1, header: 'วันผลิด' },
            { name: 'expireDate', groupBy: false, defaultFlex: 1, header: 'วันหมดอายุ' },
            { name: 'volume', groupBy: false, defaultFlex: 0.7, header: 'ยอดที่รับเข้า' },
            { name: 'productID', groupBy: false, defaultFlex: 1, header: 'ที่เก็บสินค้า' },
            { name: 'กก', groupBy: false, defaultFlex: 1, header: 'รายละเอียด' },

        ]

    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        //await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);
        await fire_base.getAllSaleReport(this.getAllSaleReportSuccess, this.unSuccess);
    }

    getAllSaleReportSuccess = async (querySnapshot) => {
        let data = []
        await querySnapshot.forEach(async (doc) => {
            if (doc.id != 'state') {

                let d = doc.data();
                d.Inid = doc.id
                console.log(d.log)
                d.productID = this.props.product.idp;
                for (let x of d.log) {
                    x.productID.get()
                        .then(doc => {
                            x.productID = doc.id
                            if(x.productID == d.productID){
                                d.volume = x.volume
                                d.expireDate = x.expireDate
                                d.arriveDate = x.arriveDate
                                console.log(x.volume)
                                this.setState({ dataSource: this.state.dataSource.concat(d) });
                            }
                            
                        });
                }
                

                }
            });

    }

    unSuccess(error) {
        console.log(error);
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Row >
                    <Col >
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '100%',
                            alignSelf: 'center'
                        }}>รายละเอียดสินค้า</h1>
                    </Col>
                </Row>
                <Row style={{ height: 200 }}>
                    <Col style={{ backgroundColor: 'green', marginLeft: "20px" }} md={{ size: "2" }}>

                    </Col>
                    <Col >
                        <Row style={{ height: 80 }}>
                            <Col >รหัสสินค้า:{this.props.product.idp}</Col>
                            <Col >รายการสินค้า:{this.props.product.productName}</Col>

                        </Row>
                        <Row style={{ height: 80 }}>
                            <Col>ขนิด:{this.props.product.productType}</Col>
                            <Col >น้ำหนัก:{this.props.product.productWeight}</Col>
                        </Row>
                        <Row style={{ height: 80 }}>
                            <Col >ราคาต่อหน่วย:{this.props.product.productPrice}</Col>
                            <Col>บริษัท:{this.props.product.companyName}</Col>
                        </Row>
                        <Row style={{ height: 60 }}>

                            <Col >สถานะ:{this.props.product.productStatus}</Col>
                            <Col >เก่า/ใหม่:{this.props.product.newOld}</Col>
                        </Row>
                    </Col>
                </Row>
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

ProductDetail.propTypes = {
    product: PropTypes.object,

};

export default ProductDetail;