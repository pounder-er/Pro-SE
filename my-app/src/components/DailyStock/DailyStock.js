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

import ReportDailyStock from './ReportDailyStock'

// import EditEmployee from './EditEmployee';
// import EditPartnerCompany from './EditPartner'
// import AddPartner from './AddPartner'


const filterValue = [
    { name: 'productID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'respName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productTotal', operator: 'startsWith', type: 'string', value: '' },
    { name: 'balance', operator: 'startsWith', type: 'string', value: '' }
    
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

class DailyStock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modalHistoryStock: false,
            modalAddPartner : false,
            modalTest : false
        }
        this.data = {};
        this.columns = [
            
            { name: 'productID', groupBy: false,defaultFlex: 0.5, header: 'รหัสสินค้า'},
            { name: 'productName', groupBy: false,defaultFlex: 1, header: 'ชื่อสินค้า' },
            { name: 'respName', groupBy: false,defaultFlex: 1, header: 'ชื่อผู้รับผิดชอบ' },
            { name: 'productTotal', groupBy: false, defaultFlex: 1, header: 'จำนวนที่เหลือ' },
            { name: 'balance', groupBy: false, defaultFlex: 1, header: 'จำนวนที่เช็ค' },
            { name: 'report', groupBy: false, defaultFlex: 1, header: 'หมายเหตุ' },
            { name: 'detail', header: 'รายละเอียด', maxWidth: 109, render: ({data})=><button onClick={(e)=>{this.togglemodalHistoryStock(e);this.data=data;}} style={{display:'contents'}}><AiFillFileText color='#00A3FF' size={30} /></button> },
        ]
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    togglemodalHistoryStock = (e) => {
        e.preventDefault();
        this.setState({ modalHistoryStock: !this.state.modalHistoryStock });
    }


    

    async componentDidMount(){
        //await fire_base.getAllUserProfile(this.getAllUserProfileSuccess,this.unSuccess);
        // await firestore.listeningProfile(this.listeningProfileSuccess,this.unSuccess);
        //await firestore.getAllPartnerCompany(this.getAllPartnerCompanySuccess,this.unSuccess);
        // await firestore.listeningPartnerCompany(this.listeningPartnerCompanySuccess, this.unSuccess);
        await firestore.getAllHistoryStock(this.getAllHistorySuccess, this.unSuccess)

    }

    

    getAllHistorySuccess=(querySnapshot)=>{
        let data = []
        querySnapshot.forEach(doc => {
            let d = doc.data();
        
            d.id = doc.id
            d.respName = d.profile.firstName+" "+d.profile.lastName
            d.date = d.profile.date
            console.log(doc.id, " => ", doc.data());
            for(let x of d.task){
                d.balance = x.balance
                d.report = x.report
                d.damage = x.damage
                d.productID = x.id
                d.productName = x.productName
                d.productTotal = x.productTotal
            }
            data.push(d)

        });
        this.setState({dataSource:data});
    }

    unSuccess(error){
        console.log(error);
    }

    render() {
        return (

            <div>
                <Modal isOpen={this.state.modalHistoryStock} toggle={this.togglemodalHistoryStock} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.togglemodalHistoryStock}>รายละเอียด</ModalHeader>
                    <ModalBody>
                        {/* <EditEmployee profile={this.profile} /> */}
                        <ReportDailyStock data={this.data}/>
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



export default DailyStock;