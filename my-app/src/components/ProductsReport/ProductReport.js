import React from 'react';
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
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { AiFillFileText } from "react-icons/ai";

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

const filterValue = [
    { name: 'ID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'cDate', operator: 'startsWith', type: 'string', value: '' },
    { name: 'responsibleP', operator: 'startsWith', type: 'string', value: '' },
    { name: 'InOut', operator: 'startsWith', type: 'string', value: '' },
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'productID', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
    { name: 'productName', groupBy: false, defaultFlex: 2, header: 'รายการสินค้า' },
    { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
    { name: 'productWeight', groupBy: false, defaultFlex: 0.7, header: 'น้ำหนัก' },
    { name: 'newOld', groupBy: false, defaultFlex: 1, header: 'เก่า/ใหม่' },
    { name: 'productPrice', groupBy: false, defaultFlex: 1.2, header: 'ราคาต่อหน่วย' },
    { name: 'productTotal', groupBy: false, defaultFlex: 0.7, header: 'สถานะ' },
    { name: 'InOut', groupBy: false, defaultFlex: 1, header: 'ยอดคงเหลือ' },
    { name: 'detail', header: 'รายละเอียด', maxWidth: 109, render: ({ data }) => <button style={{ display: 'contents' }}><AiFillFileText color='#00A3FF' size={30} /></button> },

]

const dataSource = [{ id: '1150', firstName: 'chainan', lastName: 'punsri', email: 'chain@hhh.com' }, { id: '1151', firstName: 'ahainun', lastName: 'vansri', email: 'cain@hhh.com' }]
const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
    sortAsc: 'เรียงน้อยไปมาก',
    sortDesc: 'เรียงมากไปน้อย',
    clear: 'ลบ',
    clearAll: 'ลบทั้งหมด',
    contains: 'ประกอบด้วย',
    startsWith: 'เริ่มด้วย',
    endsWith: 'จบด้วย',
    neq: 'ไม่เท่ากับ',
    eq: 'เท่ากับ',
    notEmpty: 'ไม่ว่าง',
    empty: 'ว่าง',
    notContains: 'ไม่ได้ประกอบด้วย',
    disable: 'ปิดตัวกรอง',
    enable: 'เปิดตัวกรอง',
    pageText: 'หน้า ',
    ofText: ' จาก ',
    perPageText: 'แสดงรายการทีละ',
    showingText: 'กำลังแสดงรายการ '
})


class ProductReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: dataSource
        }
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);
    }

    getAllProductSuccess = (querySnapshot) => {
        let data = []
        querySnapshot.forEach(doc => {
            data.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        this.setState({ dataSource: data });
    }

    unSuccess(error) {
        console.log(error);
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Row >

                    <h1 style={{
                        marginTop: 20,
                        marginBottom: 20,
                        width: '100%',
                        alignSelf: 'center'
                    }}>ตรวจสอบสินค้า</h1>

                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <ReactDataGrid alignSelf='center'
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
                        style={{minHeight: 550}}
                    />
                </Row>

            </Container>
        );
    }
}


export default ProductReport;