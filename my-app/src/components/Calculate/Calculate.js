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

import { i18n } from '../i18n';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import * as Yup from 'yup';

const filterValue = [
    { name: 'date', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'total', operator: 'startsWith', type: 'string', value: '' },
    { name: 'calculate', operator: 'startsWith', type: 'string', value: '' },
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'productID', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
    { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'calculate', groupBy: false, defaultFlex: 1, header: 'EOQ(ถุง)' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'แก้ไขสูตร' },
    
]
const dataSource = [{ id: '1150', firstName: 'chainan', lastName: 'punsri', email: 'chain@hhh.com' }, { id: '1151', firstName: 'ahainun', lastName: 'vansri', email: 'cain@hhh.com' }]

class Calculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],

        }
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllHistoryInOut(this.getAllSaleReportSuccess, this.unSuccess);
    }
    getAllSaleReportSuccess = (querySnapshot) => {
        let data = []
        querySnapshot.forEach(doc => {
            let data = []
            querySnapshot.forEach(doc => {
                data.push(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
            this.setState({ dataSource: data });
           
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
                    }}>คำนวณจุดสั่งซื้อ</h1>
                </Row>
                <Row style={{ marginTop: '20px' }}>
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
                </Row>

            </Container>
        );
    }
}


export default Calculate;