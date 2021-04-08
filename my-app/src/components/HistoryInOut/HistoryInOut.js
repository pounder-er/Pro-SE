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
import { i18n } from '../i18n';

const filterValue = [
    { name: 'ID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'cDate', operator: 'startsWith', type: 'string', value: '' },
    { name: 'responsibleP', operator: 'startsWith', type: 'string', value: '' },
    { name: 'InOut', operator: 'startsWith', type: 'string', value: '' },
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'inID', groupBy: false, defaultFlex: 1, header: 'ID' },
    { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่' },
    { name: 'res', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
    { name: 'InOut', groupBy: false, defaultFlex: 1, header: <t>เข้า<MdCallReceived color="#00B09B" size={25} />/ออก<MdCallMade color="#FD3B47" size={25} /></t> },
    { name: 'detail', header: 'รายละเอียด', maxWidth: 109, render: ({ data }) => <button style={{ display: 'contents' }}><AiFillFileText color='#00A3FF' size={30} /></button> },

]


class HistoryInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
        }
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllBuyReport(this.getAllHistoryInSuccess, this.unSuccess);
        // await fire_base.getAllHistoryOut(this.getAllHistoryOutSuccess, this.unSuccess);
    }

    getAllHistoryInSuccess = (querySnapshot) => {
        let data = []
        querySnapshot.forEach(doc => {
            let d = doc.data();
            d.inID = doc.id
            console.log(d)
            if (d.dateIn)
                d.dateIn = d.dateIn.toDate().getDate() + "/" + (d.dateIn.toDate().getMonth() + 1) + "/" + d.dateIn.toDate().getFullYear()
            else
                d.dateIn = "-"

            d.companyID.get()
                .then(doc => {
                    d.companyID = doc.id
                    this.setState({ dataSource: this.state.dataSource.concat(d) });
                })
        });

    }
    // getAllHistoryOutSuccess = (querySnapshot) => {
    //     let data = []
    //     querySnapshot.forEach(doc => {
    //         let d = doc.data();
    //         this.setState({ dataSource: this.state.dataSource.concat(d) });
    //     });
    // }
    unSuccess(error) {
        console.log(error);
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >

                {/* <Nav tabs>
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
                </TabContent> */}


            </Container>
        );
    }
}


export default HistoryInOut;