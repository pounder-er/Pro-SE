import React from 'react';
import fire_base from '../../firebase/Firebase';
import PropTypes from 'prop-types';
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
    PaginationLink, Row, Col, Container, Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { AiFillFileText } from "react-icons/ai";
import { i18n } from '../i18n';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import * as Yup from 'yup';
import EditCalculate from './EditCalculate';

import ProductsReport from '../ProductsReport/ProductReport';


const filterValue = [
    { name: 'date', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'total', operator: 'startsWith', type: 'string', value: '' },
    { name: 'calculate', operator: 'startsWith', type: 'string', value: '' },
];

//const dataSource = [{ id: '1150', firstName: 'chainan', lastName: 'punsri', email: 'chain@hhh.com' }, { id: '1151', firstName: 'ahainun', lastName: 'vansri', email: 'cain@hhh.com' }]

class Calculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modalCalculate: false,
            product: {},
        }
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'productID', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
            { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
            { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
            { name: 'sum', groupBy: false, defaultFlex: 1, header: 'EOQ(ถุง)' },
            {
                name: 'volume', header:
                    <div style={{ display: 'inline-block' }}>
                        {'แก้ไขสูตร'}
                    </div>, defaultWidth: 109,
                render: ({ data }) =>
                    <button onClick={(e) => { this.toggleModalmodalCalculate(e); this.product = data; }} style={{ display: 'contents' }}>
                        <AiFillFileText color='#00A3FF' size={30} />
                    </button>,
                textAlign: 'center'
            },

        ]
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        fire_base.listeningCal(this.listeningProfileSuccess, this.unSuccess);
    }
    // getAllCalculateSuccess = (querySnapshot) => {
    //     let data = []
    //     querySnapshot.forEach(async (doc) => {
    //         if (doc.id != 'state') {

    //             let d = doc.data();

    //             d.productID = doc.id
    //             d.sum = Math.round(Math.sqrt((2 * d.cal.O * d.cal.D) / (d.cal.U * d.cal.C)));
    //             console.log(d.sum)
    //             await d.productType.get()
    //                 .then(async (doc) => {
    //                     d.productType = doc.data().name
    //                     this.setState({ dataSource: this.state.dataSource.concat(d) });
    //                 })
    //             console.log("=>>", d.cal, "==>sum:", d.sum)
    //         }

    //     });
    // }
    listeningProfileSuccess = async (snapshot) => {
        let data = this.state.dataSource;
        // let data1=[]
        console.log('0')
        await snapshot.docChanges().forEach(async (change) => {
            let d = change.doc.data();
            d.productID = change.doc.id
            d.sum = Math.round(Math.sqrt((2 * d.cal.O * d.cal.D) / (d.cal.U * d.cal.C)));
           
            await d.productType.get()
                .then(async (doc) => {
                    d.productType = doc.data().name
                    await d.companyID.get()
                        .then(async (doc) => {
                            d.companyID = doc.data().companyName

                        })
                })
            console.log('1')
            if (change.type === "added") {
                //d.no = data.length+1;
                data.push(d);
                console.log('2')

            }
            if (change.type === "modified") {
                data[data.findIndex((obj => obj.productID == d.productID))] = d;
                console.log('3')
            }
            setTimeout(
                ()=>this.setState({ dataSource: [...data] })
                ,500
              );
            
            
        })
       

    }
    unSuccess(error) {
        console.log(error);
    }

    toggleModalmodalCalculate = () => {
        
        this.setState({ modalCalculate: !this.state.modalCalculate });
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Modal isOpen={this.state.modalCalculate} toggle={this.toggleModalmodalCalculate} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalmodalCalculate}>รายละเอียดการคำนวน</ModalHeader>
                    <ModalBody>
                        <EditCalculate product={this.product} closeTogle={this.toggleModalmodalCalculate}/>
                    </ModalBody>
                </Modal>
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
                </Row>

            </Container>
        );
    }
}
Calculate.propTypes = {
    product: PropTypes.object,
};

export default Calculate;