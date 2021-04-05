import React from 'react';

import {
    Button,
    Label,
    Row,
    Col,
    Container,
    UncontrolledCollapse,
    CardBody,
    Card,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input
} from 'reactstrap';

import styled from 'styled-components';

import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'

import firestore from './firebase/Firestore'

import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';

import { AiFillFileText } from "react-icons/ai";

// import EditEmployee from './EditEmployee';
import EditPartnerCompany from './EditPartnerCompany'

const filterValue = [
    { name: 'firstName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'lastName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'email', operator: 'startsWith', type: 'string', value: '' },
    { name: 'phoneNumber', operator: 'startsWith', type: 'string', value: '' },
    { name: 'jobTitle', operator: 'startsWith', type: 'select',operator: 'inlist', value: '' },
    { name: 'status', operator: 'startsWith', type: 'select',operator: 'inlist', value: '' },
    
];
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

class PartnerCompanyList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modalEditEmployee: false,
        }
        this.data = {};
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, maxWidth: 50 },
            { name: 'no', header: 'No', type: 'number' ,groupBy: false, maxWidth: 50 },
            { name: 'comName', groupBy: false,defaultFlex: 1, header: 'ชื่อบริษัท' },
            { name: 'agentName', groupBy: false,defaultFlex: 1, header: 'ชื่อตัวแทน' },
            { name: 'email', groupBy: false, defaultFlex: 1, header: 'อีเมล' },
            { name: 'phoneNumber', groupBy: false, defaultFlex: 1, header: 'เบอร์ติดต่อ' },
            { name: 'detail', header: 'รายละเอียด', maxWidth: 109, render: ({data})=><button onClick={(e)=>{this.toggleModalEditEmployee(e);this.data=data;}} style={{display:'contents'}}><AiFillFileText color='#00A3FF' size={30} /></button> },
        ]
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    toggleModalEditEmployee = (e) => {
        e.preventDefault();
        this.setState({ modalEditEmployee: !this.state.modalEditEmployee });
      }

    async componentDidMount(){
        //await fire_base.getAllUserProfile(this.getAllUserProfileSuccess,this.unSuccess);
        // await firestore.listeningProfile(this.listeningProfileSuccess,this.unSuccess);
        //await firestore.getAllPartnerCompany(this.getAllPartnerCompanySuccess,this.unSuccess);
        await firestore.listeningPartnerCompany(this.listeningPartnerCompanySuccess, this.unSuccess);

    }

    listeningPartnerCompanySuccess=(snapshot)=>{
        let data = this.state.dataSource;
        snapshot.docChanges().forEach(function (change) {
            let d = change.doc.data();
            d.id = change.doc.id
            if (change.type === "added") {
                d.no = data.length+1;
                data.push(d);
            }
            if (change.type === "modified") {
                d.no = data[data.findIndex((obj=>obj.id == d.id))].no
                data[data.findIndex((obj=>obj.id == d.id))] = d;
                console.log("Modified : ", d);
            }
            if (change.type === "removed") {
                data.splice(data.findIndex((obj=>obj.id == d.id)),1);
                console.log("Removed : ", change.doc.data());
            }
        })

        this.setState({
            dataSource: [...data]
        });
    }

    getAllPartnerCompanySuccess=(querySnapshot)=>{
        let data = []
        querySnapshot.forEach(doc => {
            let d = doc.data();
            d.id = doc.id
      
                data.push(d);
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
                <Modal isOpen={this.state.modalEditEmployee} toggle={this.toggleModalEditEmployee} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalEditEmployee}>รายละเอียดพนักงาน</ModalHeader>
                    <ModalBody>
                        {/* <EditEmployee profile={this.profile} /> */}
                        <EditPartnerCompany data={this.data}/>
                    </ModalBody>
                </Modal>
                {/* <Row style={{ marginBottom: '1rem' }}>
                    <Col md="6">.col-3</Col>
                    <Col md="6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button color="primary" id="toggler"  >            
                            เพิ่มพนักงาน                   
                        </Button>           
                    </Col>
                </Row> */}
                <ReactDataGrid
                    onReady={this.setDataGridRef}
                    i18n={i18n}
                    idProperty="id"
                    columns={this.columns}
                    pagination
                    defaultLimit={15}
                    defaultSkip={15}
                    pageSizes={[10, 15, 30]}
                    dataSource={this.state.dataSource}
                    // defaultFilterValue={filterValue}
                    showColumnMenuTool={false}
                    emptyText="ไม่มีรายการ"
                    style={{minHeight: 550}}
                />
                {/* <UncontrolledCollapse toggler="#toggler">
                <FormEmployee />
                </UncontrolledCollapse> */}

            </div>

        );
    }
}



export default PartnerCompanyList;