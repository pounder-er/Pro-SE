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


class AssignEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceEm: [],
            assignImport:[]
        }
        this.dataE = null;
        this.columnsEm = [
            // { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 50, type: 'string' },
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
            {
                name: 'assing', header:
                    <div style={{ display: 'inline-block' }}>
                        {'assing'}
                    </div>, defaultWidth: 143,
                render:({ data }) =>
                    <button onClick={(e) => { this.onAssign(e); this.dataE = data;}} style={{ display: 'contents' }} >
                        คลิก 2 ทีนะครับ
                    </button>,
                textAlign: 'center'
            }
        ]
       
    }
    setDataGridEmRef = (ref) => (this.dataGridEm = ref)

    componentDidMount() {
        fire_base.getUesrCheckStock(this.getUesrCheckStockSuccess, this.unSuccess);
    }
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
        this.setState({ dataSourceEm: [...data] });
        //console.log(this.state.dataSourceEm);
    }
    unSuccess = (error) => {
        // this.setState({ loading: false });
        //this.sweetAlert('ล้มเหลว', 'การเชื่อมต่อผิดพลาด', 'error', 'ตกลง');
        console.log(error)
    }

    onAssign = (e) => {
        // this.setState({ loading: true });
        console.log(this.props.invoice.InID,' +++ ',this.dataE);
        e.preventDefault();
        if(this.dataE != null)
            fire_base.addExportOrder(this.props.invoice.InID,this.dataE.email, this.addCheckStockSuccess, this.unSuccess);
    }

    render() {
        return (
            <div>
                
                <Alert color="secondary">
                    *หมายเหตุ: การเช็คสต๊อกควรเช็คก็ต่อเมื่อสินค้าไม่มีการเคลื่อนไหวหรือโยกย้ายระหว่างคลังสินค้าแล้วเท่านั้น
                </Alert>
                <br />
                        <h4>รายชื่อพนักงานที่สามารถมอบหมายได้</h4>
                        <LoadingOverlay
                            active={this.state.loading}
                            spinner
                            text='กำลังเพิ่มสินค้า...'
                        >
                <Row>
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
                         showColumnMenuTool={true}
                         emptyText="ไม่มีรายการ"
                         style={{ minHeight: 550 }}
                    />
                </Row>
               
                            </LoadingOverlay>
            </div>
        );
    }
}

AssignEx.propTypes = {

};
AssignEx.propTypes = {
    invoice: PropTypes.object,
    
};
export default AssignEx;