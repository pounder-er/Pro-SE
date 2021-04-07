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

import firestore from '../../firebase/Firestore'

import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';

import { AiFillFileText } from "react-icons/ai";

// import EditEmployee from './EditEmployee';
import EditBranch from './EditBranch'
import AddBranch from './AddBranch'

const filterValue = [
    { name: 'id', operator: 'startsWith', type: 'string', value: '' },
    { name: 'branchName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'ownerName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'agentName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'email', operator: 'startsWith', type: 'string', value: '' },
    { name: 'phoneNumber', operator: 'startsWith', type: 'string', value: '' }
    
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

class BranchList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modalEditPartner: false,
            modalAddBranch : false
        }
        this.data = {};
        this.columns = [
            { name: 'no', header: 'No', type: 'number' , groupBy: false, maxWidth: 50 },
            { name: 'id', groupBy: false,defaultFlex: 0.5, header: 'รหัสสาขา'},
            { name: 'branchName', groupBy: false,defaultFlex: 1, header: 'ชื่อบริษัท' },
            { name: 'ownerName', groupBy: false,defaultFlex: 1, header: 'ชื่อเจ้าของ' },
            { name: 'agentName', groupBy: false,defaultFlex: 1, header: 'ชื่อตัวแทน' },
            { name: 'email', groupBy: false, defaultFlex: 1, header: 'อีเมล' },
            { name: 'phoneNumber', groupBy: false, defaultFlex: 1, header: 'เบอร์ติดต่อ' },
            { name: 'detail', header: 'รายละเอียด', maxWidth: 109, render: ({data})=><button onClick={(e)=>{this.toggleModalEditPartner(e);this.data=data;}} style={{display:'contents'}}><AiFillFileText color='#00A3FF' size={30} /></button> },
        ]
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    toggleModalEditPartner = (e) => {
        e.preventDefault();
        this.setState({ modalEditPartner: !this.state.modalEditPartner });
    }

    toggleModalAddBranch = (e) => {
        e.preventDefault();
        this.setState({ modalAddBranch: !this.state.modalAddBranch });
    }

    async componentDidMount(){
        
        //await fire_base.getAllUserProfile(this.getAllUserProfileSuccess,this.unSuccess);
        // await firestore.listeningProfile(this.listeningProfileSuccess,this.unSuccess);
        //await firestore.getAllPartnerCompany(this.getAllPartnerCompanySuccess,this.unSuccess);
        await firestore.listeningBranch(this.listeningBranchSuccess, this.unSuccess);

    }

    listeningBranchSuccess=(snapshot)=>{
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
        console.log(data)
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
                <Modal isOpen={this.state.modalEditPartner} toggle={this.toggleModalEditPartner} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalEditPartner}>รายละเอียดสาขา</ModalHeader>
                    <ModalBody>
                        {/* <EditEmployee profile={this.profile} /> */}
                        <EditBranch data={this.data}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalAddBranch} toggle={this.toggleModalAddBranch} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalAddBranch}>เพิ่มสาขา</ModalHeader>
                    <ModalBody>
                        {/* <EditEmployee profile={this.profile} /> */}
                        <AddBranch/>
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
                <div style={{display:'flex', width:'100%', justifyContent:'flex-end'}}>
                    <Button color="success" 
                            onClick={()=>{this.setState({modalAddBranch : !this.state.modalAddBranch})}}
                            style={{width:150, 
                                    height:45, 
                                    marginBottom:10}}>เพิ่มสาขา</Button>
                </div>
                
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
                    defaultFilterValue={filterValue}
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



export default BranchList;