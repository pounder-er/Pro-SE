import React from 'react';

import fire_base from '../../firebase/Firebase';
import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    Row, Col, Container,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import 'react-pro-sidebar/dist/css/styles.css';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'

import moment from 'moment'

import { i18n } from '../i18n';
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const filterValue = [
    { name: 'InID', operator: 'startsWith', type: 'string', },
    { name: 'branchID', operator: 'startsWith', type: 'string', },
    {
        name: 'dateCreate',
        operator: 'before',
        type: 'date',
        value: ''
      },
    //   {
    //     name: 'dateIn',
    //     operator: 'before',
    //     type: 'date',

    //   },
    { name: 'Res', operator: 'startsWith', type: 'string', },
    { name: 'status', operator: 'startsWith', type: 'string', },

];

const columns = [
    { name: 'id', header: 'id', defaultVisible: false, },
    { name: 'InID', header: 'หมายเลขใบแจ้งหนี้', defaultVisible: true, groupBy: false },
    { name: 'branchID', groupBy: false, defaultFlex: 1, header: 'สาขา' },
    {
        name: 'dateCreate', 
        defaultFlex: 1, 
        dateFormat: 'DD/MM/YYYY',
        filterEditor: DateFilter,
        filterEditorProps: (props, { index }) => {
            // for range and notinrange operators, the index is 1 for the after field
            return {
                dateFormat: 'MM-DD-YYYY',
                placeholder: index == 1 ? 'Created date is before...' : 'Created date is after...'
            }
        },
     },
    // { name: 'dateCreate', groupBy: false, defaultFlex: 1, header: 'วันที่สร้าง' },
    // { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่สำเร็จการขาย' },
    { name: 'Res', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
    { name: 'status', groupBy: false, defaultFlex: 1, header: 'สถานะ' },

]

class Sell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
        }
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllSell(this.getAllSellSuccess, this.unSuccess);
    }

    getAllSellSuccess = async (querySnapshot) => {
        let data = []
        await querySnapshot.forEach((doc) => {
            if (doc.id != 'state') {

                let d = doc.data();
                d.InID = doc.id;
                console.log(d)
                d.dateCreate =   moment(d.dateCreate.toDate()).format('DD/MM/YYYY')
                console.log(d.dateCreate);
                // d.dateIn = d.dateIn.toDate().getDate() + "/" + (d.dateIn.toDate().getMonth() + 1) + "/" + d.dateIn.toDate().getFullYear()
                // d.datePay = d.datePay.toDate().getDate() + "/" + (d.datePay.toDate().getMonth() + 1) + "/" + d.datePay.toDate().getFullYear()

                let a = d.branchID.get()
                    .then(doc => {
                        d.branchID = doc.data().branchName
                        this.setState({ dataSource: this.state.dataSource.concat(d) });
                    })
            }
        });

    }

    unSuccess(error) {
        console.log(error);
    }
    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'while' }} >

                <Link to={this.props.match.url + "/so"}>
                    <Button color="info" style={{ width: 150 }}>เพิ่มรายการสั่งซื้อ</Button>
                </Link>
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


export default Sell;