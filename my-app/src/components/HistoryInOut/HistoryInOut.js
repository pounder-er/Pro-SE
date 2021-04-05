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

const filterValue = [
    { name: 'ID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'cDate', operator: 'startsWith', type: 'string', value: '' },
    { name: 'responsibleP', operator: 'startsWith', type: 'string', value: '' },
    { name: 'InOut', operator: 'startsWith', type: 'string', value: '' },
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'ID', groupBy: false, defaultFlex: 1, header: 'ID' },
    { name: 'cDate', groupBy: false, defaultFlex: 1, header: 'วันที่' },
    { name: 'responsibleP', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
    { name: 'InOut', groupBy: false, defaultFlex: 1, header: <t>เข้า<MdCallReceived color="#00B09B" size={25} />/ออก<MdCallMade color="#FD3B47" size={25} /></t> },
    { name: 'detail', header: 'รายละเอียด', maxWidth: 109, render: ({data})=><button style={{display:'contents'}}><AiFillFileText color='#00A3FF' size={30} /></button> },

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

class HistoryInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: dataSource
        }
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllHistoryInOut(this.getAllHistoryInOutSuccess, this.unSuccess);
    }

    getAllHistoryInOutSuccess = (querySnapshot) => {
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
                    }}>ประวัติสินค้าเข้า/ออกคลัง</h1>
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


export default HistoryInOut;