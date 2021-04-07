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
    PaginationLink, Row, Col, Container,Modal,
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

const filterValue = [
    { name: 'date', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'total', operator: 'startsWith', type: 'string', value: '' },
    { name: 'calculate', operator: 'startsWith', type: 'string', value: '' },
];

const dataSource = [{ id: '1150', firstName: 'chainan', lastName: 'punsri', email: 'chain@hhh.com' }, { id: '1151', firstName: 'ahainun', lastName: 'vansri', email: 'cain@hhh.com' }]

class Calculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            dataSourceProduct: [],
            modalCalculate:false,
        }
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
            { name: 'productID', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
            { name: 'productType', groupBy: false, defaultFlex: 1, header: 'ชนิด' },
            { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
            { name: 'sum', groupBy: false, defaultFlex: 1, header: 'EOQ(ถุง)' },
            { name: 'volume', groupBy: false, defaultFlex: 1, header: 'แก้ไขสูตร' },
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
        await fire_base.getAllProduct(this.getAllCalculateSuccess, this.unSuccess);
    }
    getAllCalculateSuccess = (querySnapshot) => {
        let data = []
        querySnapshot.forEach(async(doc) => {
            if (doc.id != 'state') {

                let d = doc.data();
                
                d.productID = doc.id
                d.sum =  Math.round(Math.sqrt((2*d.O*d.D)/(d.U*d.C)));
                console.log(d.sum)
                await d.productType.get()
                    .then(async(doc) => {
                        d.productType = doc.data().name
                        this.setState({ dataSource: this.state.dataSource.concat(d) });
                    })
                    console.log( "=>>",d)
            }
            
        });
    }
  
    unSuccess(error) {
        console.log(error);
    }

    toggleModalmodalCalculate = (e) => {
        e.preventDefault();
        this.setState({ modalCalculate: !this.state.modalCalculate });
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
               <Modal isOpen={this.state.modalCalculate} toggle={this.toggleModalmodalCalculate} backdrop='static' size='lg' >
                    <ModalHeader toggle={this.toggleModalmodalCalculate}>รายละเอียดสินค้า</ModalHeader>
                    <ModalBody>
                        <EditCalculate product={this.product} />
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


export default Calculate;