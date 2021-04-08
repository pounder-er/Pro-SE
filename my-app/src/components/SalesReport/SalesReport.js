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
    { name: 'volume', operator: 'startsWith', type: 'string', value: '' },
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'idp', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
    { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'total', groupBy: false, defaultFlex: 1, header: 'ปริมาณ' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'มูลค่าการขาย(บาท)' },
    { name: 'address', groupBy: false, defaultFlex: 1, header: '123(บาท)' },
]

class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],

        }
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        //await fire_base.getAllSaleReport(this.getAllSaleReportSuccess, this.unSuccess);
        await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);
    }
    // getAllSaleReportSuccess = (querySnapshot) => {
    //     let data = []
    //     querySnapshot.forEach(doc => {
    //         if (doc.id != 'state') {

    //             let d = doc.data();
    //             // d.productName = doc.data().log
                
    //             d.productID.get()
    //                 .then(async(doc) => {
    //                     d.productID = doc.id;
    //                     d.productN = doc.data().productName;    
    //                     await doc.data().productType.get().then(doc =>{
    //                         d.productT = doc.data().name
                           
    //                     })
    //                     console.log(d);
    //                     await this.setState({ dataSource: this.state.dataSource.concat(d) });
    //                 })
                
    //         }
           
    //     });
    // }
    getAllProductSuccess = async (querySnapshot) => {
        let data = []
        await querySnapshot.forEach(async(doc) => {
            if (doc.id != 'state') {

                let d = doc.data();

                d.idp = doc.id;
                
                await d.productType.get()
                    .then(doc => {
                        d.productType = doc.data().name
                        console.log(d);
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
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
               
                <Row >
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
                </Row >
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
                        style={{ minHeight: 550 }}
                    />
                </Row>

            </Container>
        );
    }
}


export default SalesReport;