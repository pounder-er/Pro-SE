import React from 'react';
import fire_base from '../../firebase/Firebase';

import {
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col, Container,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { AiFillFileText } from "react-icons/ai";
import LoadingOverlay from 'react-loading-overlay';
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import classnames from 'classnames';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { i18n } from '../i18n';
import BuyDetail from '../Buy/BuyDetail';
import SellDetail from '../Sell/SellDetail';

const filterValueEm = [
    { name: 'firstName', operator: 'startsWith', type: 'string', },
    { name: 'lastName', operator: 'startsWith', type: 'string', },
    { name: 'email', operator: 'startsWith', type: 'string', },
    { name: 'phoneNumber', operator: 'startsWith', type: 'string', },
    // { name: 'jobTitle', operator: 'startsWith', type: 'select',operator: 'inlist',  },
    // { name: 'status', operator: 'startsWith', type: 'select',operator: 'inlist',  },
];


class HistoryInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSourceIN: [],
            dataSourceOUT: [],
            activeTab: '1',
            modalIN: false,
            modalOUT: false,
        }
        this.product1= {}
        this.product2= {}
        this.columnsIN = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'InID', groupBy: false, defaultFlex: 1, header: 'ID' },
            { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่' },
            { name: 'res', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
            // { name: 'InOut', groupBy: false, defaultFlex: 1, header: <t>เข้า<MdCallReceived color="#00B09B" size={25} />/ออก<MdCallMade color="#FD3B47" size={25} /></t> },
            {
                name: 'detail1', header:
                    <div style={{ display: 'inline-block' }}>
                        {'รายละเอียด'}
                    </div>, defaultWidth: 109,
                render: ({ data }) =>
                    <button onClick={(e) => { this.toggleModalmodalIN(e); this.product1 = data; }} style={{ display: 'contents' }}>
                        <AiFillFileText color='#00A3FF' size={30} />
                    </button>,
                textAlign: 'center'
            },

        ]
        this.columnsOUT = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'InID', groupBy: false, defaultFlex: 1, header: 'ID' },
            { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่' },
            { name: 'res', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
            // { name: 'InOut', groupBy: false, defaultFlex: 1, header: <t>เข้า<MdCallReceived color="#00B09B" size={25} />/ออก<MdCallMade color="#FD3B47" size={25} /></t> },
            {
                name: 'detail1', header:
                    <div style={{ display: 'inline-block' }}>
                        {'รายละเอียด'}
                    </div>, defaultWidth: 109,
                render: ({ data }) =>
                    <button onClick={(e) => { this.toggleModalmodalOUT(e); this.product2 = data; }} style={{ display: 'contents' }}>
                        <AiFillFileText color='#00A3FF' size={30} />
                    </button>,
                textAlign: 'center'
            },

        ]
    }
    setDataGridRefIN = (ref) => (this.dataGridIN = ref)
    setDataGridRefOUT = (ref) => (this.dataGridOUT = ref)

    async componentDidMount() {
        await fire_base.getAllBuyReport(this.getAllHistoryInSuccess, this.unSuccess);
        await fire_base.getAllSellReport(this.getAllHistoryOutSuccess, this.unSuccess);
    }

    getAllHistoryInSuccess = (querySnapshot) => {

        querySnapshot.forEach(doc => {
            let d = doc.data();
            d.InID = doc.id
            
            d.dateCreate = d.dateCreate.toDate().getDate() + "/" + (d.dateCreate.toDate().getMonth() + 1) + "/" + d.dateCreate.toDate().getFullYear()
            if (d.dateIn != undefined)
                d.dateIn = d.dateIn.toDate().getDate() + "/" + (d.dateIn.toDate().getMonth() + 1) + "/" + d.dateIn.toDate().getFullYear()
            else
                d.dateIn = "-"
            if (d.datePay != undefined)
                d.datePay = d.datePay.toDate().getDate() + "/" + (d.datePay.toDate().getMonth() + 1) + "/" + d.datePay.toDate().getFullYear()
            else
                d.datePay = "-"
            d.companyID.get()
                .then(doc => {
                    d.companyName = doc.data().companyName
                    // console.log('==>>>',d)
                    this.setState({ dataSourceIN: this.state.dataSourceIN.concat(d) });
                    
                })
          
        });

    }
    getAllHistoryOutSuccess = (querySnapshot) => {

        querySnapshot.forEach(doc => {
            let d = doc.data();
            
            d.InLog = d.log;
            d.InID = doc.id;
            d.dateCreate = d.dateCreate.toDate().getDate()+"/"+(d.dateCreate.toDate().getMonth()+1)+"/"+d.dateCreate.toDate().getFullYear()
            if( d.dateIn)
                d.dateIn = d.dateIn.toDate().getDate()+"/"+(d.dateIn.toDate().getMonth()+1)+"/"+d.dateIn.toDate().getFullYear()
            else
                d.dateIn = "-"
            if(d.dateOut)
                d.dateOut = d.dateOut.toDate().getDate()+"/"+(d.dateOut.toDate().getMonth()+1)+"/"+d.dateOut.toDate().getFullYear()
            else
                d.dateOut = "-"
            if(d.datePay)
                d.datePay = d.datePay.toDate().getDate()+"/"+(d.datePay.toDate().getMonth()+1)+"/"+d.datePay.toDate().getFullYear()
            else
                d.datePay = "-"

            let a = d.branchID.get()
            .then(doc=>{
                d.branchID = doc.data().branchName
                return d;
            })
            a.then(doc=>{
                console.log(doc)
                this.setState({dataSourceOUT:this.state.dataSourceOUT.concat(doc)});
            })
        });

    }
    unSuccess(error) {
        console.log(error);
    }
    toggleTab = tab => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }
    sweetAlert(title, text, icon, button) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: button,
        })
    }
    toggleModalmodalIN = (e) => {
      
        this.setState({ modalIN: !this.state.modalIN });
    }
    toggleModalmodalOUT = (e) => {
       
        this.setState({ modalOUT: !this.state.modalOUT });
    }
    render() {
        // console.log(this.props.userProfile.firstName)
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Modal isOpen={this.state.modalIN} toggle={this.toggleModalmodalIN} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalmodalIN}>เข้า</ModalHeader>
                    <ModalBody>
                        <BuyDetail profile={this.product1} />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalOUT} toggle={this.toggleModalmodalOUT} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalmodalOUT}>ออก</ModalHeader>
                    <ModalBody>
                        <SellDetail profile={this.product2} />
                    </ModalBody>
                </Modal>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggleTab('1'); }}
                        >
                            สินค้าเข้า
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={async () => {
                                await this.toggleTab('2');
                                // await fire_base.getUesrCheckStock(this.getUesrCheckStockSuccess, this.unSuccess);
                                // await fire_base.getProductCheckStock(this.getProductCheckStockSuccess, this.unSuccess);
                            }}
                        >
                            สินค้าออก
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col >
                                <br />
                                <h4>สินค้าเข้า</h4>
                                <ReactDataGrid
                                    onReady={this.setDataGridRefIN}
                                    i18n={i18n}
                                    idProperty="id"
                                    columns={this.columnsIN}
                                    pagination
                                    defaultLimit={15}
                                    defaultSkip={15}
                                    pageSizes={[10, 15, 30]}
                                    dataSource={this.state.dataSourceIN}
                                    defaultFilterValue={filterValueEm}
                                    showColumnMenuTool={false}
                                    emptyText="ไม่มีรายการ"
                                    style={{ minHeight: 550 }}
                                />

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        {/* <LoadingOverlay
                            active={this.state.loading}
                            spinner
                            text='กำลังเพิ่มสินค้า...'
                        > */}
                        <Row>
                            <Col >
                                <br />
                                <h4>สินค้าออก</h4>
                                <ReactDataGrid
                                    onReady={this.setDataGridRefOUT}
                                    i18n={i18n}
                                    idProperty="id"
                                    columns={this.columnsOUT}
                                    pagination
                                    defaultLimit={15}
                                    defaultSkip={15}
                                    pageSizes={[10, 15, 30]}
                                    dataSource={this.state.dataSourceOUT}
                                    defaultFilterValue={filterValueEm}
                                    showColumnMenuTool={false}
                                    emptyText="ไม่มีรายการ"
                                    style={{ minHeight: 550 }}
                                />

                            </Col>
                        </Row>
                        
                        {/* </LoadingOverlay> */}
                    </TabPane>
                </TabContent>


            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      session: state.session,
      userProfile: state.userProfile
    }
  }
  
export default connect(mapStateToProps)(HistoryInOut);
