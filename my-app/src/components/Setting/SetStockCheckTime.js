import React, { Component, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

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
    Col,
    Alert
} from 'reactstrap';

import { Formik, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import { AiFillFileText } from "react-icons/ai";

import classnames from 'classnames';
import fire_base from '../../firebase/Firebase';

import { i18n } from '../i18n';

import LoadingOverlay from 'react-loading-overlay';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';

const filterValueEm = [
    { name: 'firstName', operator: 'startsWith', type: 'string', },
    { name: 'lastName', operator: 'startsWith', type: 'string', },
    { name: 'email', operator: 'startsWith', type: 'string', },
    { name: 'phoneNumber', operator: 'startsWith', type: 'string', },
    // { name: 'jobTitle', operator: 'startsWith', type: 'select',operator: 'inlist',  },
    // { name: 'status', operator: 'startsWith', type: 'select',operator: 'inlist',  },
];


class SetStockCheckTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            dataSourceEm: [],
            dataSourceProdCopy: [],
            modal: false,
            prodSelected: {},
            loading: false,
        }
        this.assignProduct = []
        this.employeeSelected = ''
        this.dataSourceProd = []
        this.responsibleProd = []
        this.columnsEm = [
            { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 50, type: 'string' },
            // { name: 'no', header: '', type: 'number' ,groupBy: false, defaultWidth: 50 },
            { name: 'firstName', groupBy: false, defaultFlex: 1, header: 'ชื่อ' },
            { name: 'lastName', groupBy: false, defaultFlex: 1, header: 'นามสกุล' },
            { name: 'email', groupBy: false, defaultFlex: 1, header: 'อีเมล' },
            { name: 'phoneNumber', groupBy: false, defaultFlex: 1, header: 'เบอร์ติดต่อ' },
            { name: 'jobTitle', defaultWidth: 100, groupBy: false, header: 'ตำแหน่ง' },
            {
                name: 'status', groupBy: false, defaultWidth: 80, header: 'สถานะ', render: ({ value }) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                width: 8, height: 8, margin: 5, borderRadius: 100, backgroundColor: '#00B046'
                            }} />
                            {value}
                        </div>);

                }
            },
            { name: 'amountAssignProd', defaultWidth: 185, groupBy: false, header: 'จำนวนสินค้าที่มอบหมาย' }
            ,
            {
                name: 'detail', header:
                    <div style={{ display: 'inline-block' }}>
                        {'มอบหมายสินค้า'}
                    </div>, defaultWidth: 143,
                render: ({ data }) =>
                    <button onClick={(e) => { this.toggleModal(e); this.employeeSelected = data.email }} style={{ display: 'contents' }} >
                        <AiFillFileText color='#00A3FF' size={30} />
                    </button>,
                textAlign: 'center'
            }
        ]
        this.columnsProd = [
            { name: 'id', defaultFlex: 1, header: 'รหัสสินค้า', type: 'number' },
            { name: 'productName', groupBy: false, defaultFlex: 2, header: 'รายการสินค้า' },
            { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
            { name: 'productWeight', groupBy: false, defaultFlex: 0.7, header: 'น้ำหนัก' },
            { name: 'productPrice', groupBy: false, defaultFlex: 1.2, header: 'ราคาต่อหน่วย' },
            { name: 'productStatus', groupBy: false, defaultFlex: 0.7, header: 'สถานะ' },
            { name: 'productTotal', groupBy: false, defaultFlex: 1, header: 'ยอดคงเหลือ' },
        ]
    }

    onSelectionChange = ({ selected }) => {
        if (selected === true) {
            selected = {};
            // this.state.dataSourceProd
            this.state.dataSourceProdCopy.forEach((doc) => {
                selected[doc.id] = doc
            })
        }

        this.setState({ prodSelected: selected });
        // this.setState({})
        // console.log(selected)
        console.log(selected)

    }

    allClear=(e)=>{
        e.preventDefault();
        this.assignProduct = [];
        this.employeeSelected = '';
        this.state.dataSourceEm.forEach(doc=>{
            doc.amountAssignProd = 0;
        })
        this.setState({
            prodSelected:{},
            dataSourceProdCopy:this.dataSourceProd,
            dataSourceEm:[...this.state.dataSourceEm]
        });
        console.log('eeee');

    }

    onAssignProduct = (e) => {
        
        e.preventDefault();
        let i, num = 0
        for (const property in this.state.prodSelected) {
            this.state.prodSelected[property].email = this.employeeSelected
            this.assignProduct.push(this.state.prodSelected[property])
            num++;
        }
        this.state.dataSourceEm.find((doc, index) => {
            if (doc.email == this.employeeSelected) {
                i = index
                return true
            }
        })
        this.state.dataSourceEm[i].amountAssignProd = num;
        this.setState({
            dataSourceProdCopy: this.state.dataSourceProdCopy.filter(doc => {
                let check = true;
                for (let i in this.assignProduct) {
                    if (doc.id == this.assignProduct[i].id) {
                        check = false;
                    }
                }
                return check;
            })
        })
        console.log(this.assignProduct);
        this.setState({ dataSourceEm: [...this.state.dataSourceEm] });
        this.setState({ prodSelected: {} });

    }



    toggleModal = (e) => {
        e.preventDefault();
        this.setState({ modal: !this.state.modal });
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }

    setDataGridEmRef = (ref) => (this.dataGridEm = ref)

    setDataGridProdRef = (ref) => (this.dataGridProd = ref)

    getUesrCheckStockSuccess = (querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => {
            let d = doc.data();
            d = {
                id: doc.id,
                firstName: d.firstName,
                lastName: d.lastName,
                email: d.email,
                phoneNumber: d.phoneNumber,
                jobTitle: d.jobTitle,
                status: d.status,
                amountAssignProd: 0
            }
            data.push(d);
        });
        this.setState({ dataSourceEm: data });
        console.log(data);
    }

    getProductCheckStockSuccess = (querySnapshot) => {

        let data = [];
        querySnapshot.forEach(async (doc) => {
            let d;
            d = doc.data();
            await d.companyID.get().then(doc => {
                d.companyID = doc.data().companyName
            })
            await d.productType.get().then(doc => {
                d.productType = doc.data().name
            })
            d.id = doc.id;
            console.log(d.id);
            data.push(d);
        });
        console.log(data);
        this.setState({ dataSourceProdCopy: data });
        this.dataSourceProd = data;
        // console.log(this.state.dataSourceProd);
    }

    onAssign=(e)=>{
        this.setState({loading:true});
        e.preventDefault();
        fire_base.addCheckStock(this.assignProduct,this.addCheckStockSuccess,this.unSuccess);
        this.allClear(e);
    }

    addCheckStockSuccess=()=>{
        console.log('add success');
        this.setState({loading:false});
        this.sweetAlert('เสร็จสิ้น','มอบหมายงานเช็คสต๊อกเรียบร้อยแล้ว','success','ตกลง');
    }

    unSuccess = (error) => {
        this.setState({loading:false});
        this.sweetAlert('ล้มเหลว','การเชื่อมต่อผิดพลาด','error','ตกลง');
        console.log(error)
    }

    sweetAlert(title, text, icon, button) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: button,
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModal} >เลือกรายการสินค้าที่จะมอบหมาย</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                            
                            </Col>
                        </Row>
                        <ReactDataGrid
                            onReady={this.setDataGridProdRef}
                            i18n={i18n}
                            idProperty="id"
                            columns={this.columnsProd}
                            checkboxColumn
                            selected={this.state.prodSelected}
                            pagination
                            defaultLimit={15}
                            defaultSkip={15}
                            pageSizes={[10, 15, 30]}
                            dataSource={this.state.dataSourceProdCopy}
                            // defaultFilterValue={filterValueProd}
                            onSelectionChange={this.onSelectionChange}
                            showColumnMenuTool={false}
                            emptyText="ไม่มีรายการ"
                            style={{ minHeight: 550 }}

                        />
                        <Row style={{ marginTop: 10 }}>
                            <Col md={8} />
                            <Col md={2} />
                            <Col md={2} style={{ display: 'flex' }} >

                                <Button color="success" onClick={this.onAssignProduct} style={{ flex: 1 }} >เพิ่มสินค้า</Button>

                            </Col>
                        </Row>
                        {/* <EditEmployee profile={this.profile} /> */}
                    </ModalBody>
                </Modal>
                <Alert color="secondary">
                    *หมายเหตุ: การเช็คสต๊อกควรเช็คก็ต่อเมื่อสินค้าไม่มีการเคลื่อนไหวหรือโยกย้ายระหว่างคลังสินค้าแล้วเท่านั้น
                </Alert>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggleTab('1'); }}
                        >
                            ตั้งเวลาอัตโนมัติ
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={async () => {
                                await this.toggleTab('2');
                                await fire_base.getUesrCheckStock(this.getUesrCheckStockSuccess, this.unSuccess);
                                await fire_base.getProductCheckStock(this.getProductCheckStockSuccess, this.unSuccess);
                            }}
                        >
                            กำหนดเอง
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 1 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                    <LoadingOverlay
                active={this.state.loading}
                spinner
                text='กำลังเพิ่มสินค้า...'
            >
                        <Row>
                            <Col >
                                <br />
                                <h4>รายชื่อพนักงานที่สามารถมอบหมายได้</h4>
                                <ReactDataGrid
                                    onReady={this.setDataGridEmRef}
                                    i18n={i18n}
                                    idProperty="id"
                                    columns={this.columnsEm}
                                    pagination
                                    defaultLimit={15}
                                    defaultSkip={15}
                                    pageSizes={[10, 15, 30]}
                                    dataSource={this.state.dataSourceEm}
                                    defaultFilterValue={filterValueEm}
                                    showColumnMenuTool={false}
                                    emptyText="ไม่มีรายการ"
                                    style={{ minHeight: 550 }}
                                />

                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }} form>
                            <Col md={8} />
                            <Col md={2} style={{ display: 'flex' }} >
                                <FormGroup style={{ display: 'flex', flex: 1 }}>
                                    <Button color="secondary" style={{ flex: 1 }} onClick={this.allClear} >เคลียร์</Button>
                                </FormGroup>
                            </Col>
                            <Col md={2} style={{ display: 'flex' }} >
                                <FormGroup style={{ display: 'flex', flex: 1 }}>
                                    <Button color="success" style={{ flex: 1 }} onClick={this.onAssign} >มอบหมาย</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        </LoadingOverlay>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

SetStockCheckTime.propTypes = {

};

export default SetStockCheckTime;