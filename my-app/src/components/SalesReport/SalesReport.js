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
    { name: 'idp', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productType', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productName', operator: 'startsWith', type: 'string', value: '' },
    { name: 'avolume', operator: 'gte', type: 'number', value: '' },
    { name: 'totalPrice', operator: 'gte', type: 'number', value: '' },
];


class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            key:'',
        }
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'idp', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
            { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
            { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
            { name: 'avolume', groupBy: false, defaultFlex: 1, header: 'ปริมาณ' },
            { name: 'totalPrice', groupBy: false, defaultFlex: 1, header: 'มูลค่าการขาย(บาท)' },
        ]
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);
    }
    getAllSellSuccess = async (querySnapshot) => {

        await querySnapshot.forEach((doc) => {
            let z =[]
            if (doc.id != 'state') {
                let d = doc.data();
                d.InID = doc.id
                // console.log('Sell', d)
                d.avolume = 0;
                d.dateCreate = d.dateCreate.toDate().getDate() + "/" + (d.dateCreate.toDate().getMonth() + 1) + "/" + d.dateCreate.toDate().getFullYear()
                if (d.dateIn != undefined)
                    d.dateIn = d.dateIn.toDate().getDate() + "/" + (d.dateIn.toDate().getMonth() + 1) + "/" + d.dateIn.toDate().getFullYear()
                else
                    d.dateIn = "-"
                if (d.datePay != undefined)
                    d.datePay = d.datePay.toDate().getDate() + "/" + (d.datePay.toDate().getMonth() + 1) + "/" + d.datePay.toDate().getFullYear()
                else
                    d.datePay = "-"
                d.branchID.get()
                    .then(doc => {
                        d.branchName = doc.data().branchName
                        return d;
                    })
                // console.log(' datas', this.state.dataSource)
                for (let a of this.state.dataSource) {
                    a.avolume = Number(0)
                    a.totalPrice = 0
                    for (let x of d.log) {
                        // console.log('sell LOG', x)
                        x.productID.get()
                            .then(doc => {
                                x.aproductID = doc.id
                                if (x.aproductID == a.idp) {
                                    a.avolume += x.volume
                                    a.totalPrice += (x.productPrice * x.volume) - x.disCount
                                     
                                    this.setState({ dataSource: this.state.dataSource.concat(z) });
                                }

                            });
                    }
                }

            }
        });
        // console.log('a>>', this.state.dataSource)


    }
    getAllProductSuccess = async (querySnapshot) => {
        let data = []
        
        await querySnapshot.forEach(async (doc) => {
            if (doc.id != 'state') {

                let d = doc.data();

                d.idp = doc.id;

                await d.productType.get()
                    .then(doc => {
                        d.productType = doc.data().name
                        // console.log('product', d);
                        
                        this.setState({ dataSource: this.state.dataSource.concat(d) });

                    })
            }
        });
        fire_base.getAllSellReport(this.getAllSellSuccess, this.unSuccess);

    }

    unSuccess(error) {
        console.log(error);
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'black' }} >

                {/* <Row >
                    <Col sm="1">
                        Date
                                </Col>
                    <Col >
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                    </Col>


                    <Col sm="1">
                        To Date
                                </Col>
                    <Col >
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                    </Col>
                </Row > */}
                <Row style={{ marginTop: '20px' }}>
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
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                        style={{ minHeight: 550 }}
                    />
                </Row >

            </Container>
        );
    }
}


export default SalesReport;