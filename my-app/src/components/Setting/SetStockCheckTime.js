import React, { Component } from 'react';
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

import {i18n} from '../i18n';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';

const filterValue = [
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
            dataSource: [],
            dataSourceProduct: []
        }
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 50 },
            // { name: 'no', header: '', type: 'number' ,groupBy: false, defaultWidth: 50 },
            { name: 'firstName', groupBy: false, defaultFlex: 1, header: 'ชื่อ' },
            { name: 'lastName', groupBy: false, defaultFlex: 1, header: 'นามสกุล' },
            { name: 'email', groupBy: false, defaultFlex: 1, header: 'อีเมล' },
            { name: 'phoneNumber', groupBy: false, defaultFlex: 1, header: 'เบอร์ติดต่อ' },
            { name: 'jobTitle', defaultFlex: 1, groupBy: false, header: 'ตำแหน่ง' },
            {
                name: 'status', groupBy: false, defaultFlex: 1, header: 'สถานะ', render: ({ value }) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                width: 8, height: 8, margin: 5, borderRadius: 100, backgroundColor: '#00B046'
                            }} />
                            {value}
                        </div>);

                }
            }
            ,
            {
                name: 'detail', header:
                    <div style={{ display: 'inline-block' }}>
                        {'สินค้าที่มอบหมาย'}
                    </div>, defaultWidth: 143,
                render: ({ data }) =>
                    <button onClick={(e) => { e.preventDefault() }} style={{ display: 'contents' }}>
                        <AiFillFileText color='#00A3FF' size={30} />
                    </button>,
                textAlign: 'center'
            }
        ]
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    getUesrCheckStockSuccess=(querySnapshot)=>{
        let data = [];
        querySnapshot.forEach(doc=>{
            let d = doc.data();
            d.id = doc.id;
            data.push(d);
        });
        this.setState({dataSource:data});
        console.log(data);
    }

    getProductCheckStockSuccess=(querySnapshot)=>{
        let data = [];
        querySnapshot.forEach(doc=>{
            let d = doc.data();
            d.id = doc.id;
            data.push(d);
        });
        this.setState({dataSourceProduct:data});
        console.log(data);
    }

    unSuccess=(error)=>{
        console.log(error)
    }

    render() {
        return (
            <div>
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
                            onClick={async() => { 
                                await this.toggleTab('2'); 
                                await fire_base.getUesrCheckStock(this.getUesrCheckStockSuccess,this.unSuccess);
                                await fire_base.getProductCheckStock(this.getProductCheckStockSuccess,this.unSuccess);
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
                        <Row>
                            <Col >
                                <br />
                                <h4>รายชื่อพนักงานที่สามารถมอบหมายได้</h4>
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

                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

SetStockCheckTime.propTypes = {

};

export default SetStockCheckTime;