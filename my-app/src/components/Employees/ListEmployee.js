import React from 'react';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Label,
    Row,
    Col,
    Container,
    UncontrolledCollapse,
    CardBody,
    Card,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import styled from 'styled-components';

import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'

import fire_base from '../../firebase/Firebase';

import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';
const filterValue = [
    { name: 'firstname', operator: 'startsWith', type: 'string', value: '' },
    { name: 'lastname', operator: 'startsWith', type: 'string', value: '' },
    { name: 'email', operator: 'startsWith', type: 'string', value: '' },
    
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'firstname', groupBy: false,defaultFlex: 1, header: 'ชื่อ' },
    { name: 'lastname', groupBy: false,defaultFlex: 1, header: 'นามสกุล' },
    { name: 'email', groupBy: false, defaultFlex: 1, header: 'อีเมล' },
    { name: 'phonenumber', groupBy: false, defaultFlex: 1, header: 'เบอร์ติดต่อ' },
    { name: 'jobtitle', groupBy: false, defaultFlex: 1, header: 'ตำแหน่ง' },
    { name: 'status', groupBy: false, defaultFlex: 1, header: 'สถานะ' },
    { name: 'detail', header: '', maxWidth: 50 },
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
    disable:'ปิดตัวกรอง',
enable:'เปิดตัวกรอง',
pageText:'หน้า ',
ofText:' จาก ',
perPageText:'แสดงรายการทีละ',
showingText:'กำลังแสดงรายการ '
})
class ListEmployee extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: dataSource
        }
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount(){
        await fire_base.getAllUserProfile(this.getAllUserProfileSuccess,this.unSuccess);
    }

    getAllUserProfileSuccess=(querySnapshot)=>{
        let data = []
        querySnapshot.forEach(doc => {
            data.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        this.setState({dataSource:data});
    }

    unSuccess(error){
        console.log(error);
    }

    render() {
        return (

            <div>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col md="6">.col-3</Col>
                    <Col md="6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {/* <Button color="primary" id="toggler"  >            
                            เพิ่มพนักงาน                   
                        </Button>            */}
                    </Col>
                </Row>
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
                {/* <UncontrolledCollapse toggler="#toggler">
                <FormEmployee />
                </UncontrolledCollapse> */}

            </div>



        );
    }
}

// const Container = styled.div`
//       display: flex;
//       align-items: flex-start;
//       background-color: white; 
//       flex-direction:column;
//     `;

export default ListEmployee;