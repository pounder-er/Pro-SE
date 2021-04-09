import React from 'react';

import fire_base from '../../firebase/Firebase';
// import './Company.css';
import {
    Link,
} from 'react-router-dom';

import { AiFillFileText } from "react-icons/ai";
import {
    Button,
    Row,
    Col,
    Container,
    Modal, 
    ModalHeader, 
    ModalBody, 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import 'react-pro-sidebar/dist/css/styles.css';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'

import moment from 'moment'

import {i18n} from '../i18n';
import SellDetail from './SellDetail';



const filterValue = [
    { name: 'InID', operator: 'startsWith', type: 'string',  },
    { name: 'branchID', operator: 'startsWith', type: 'string',  },
    { name: 'dateCreate', operator: 'startsWith', type: 'string',  },
    { name: 'dateIn', operator: 'startsWith', type: 'string',  },
    { name: 'Res', operator: 'startsWith', type: 'string',  },
    { name: 'status', operator: 'startsWith', type: 'string',  },
    
];



class Sell extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modalSellDetail: false,
        }
        this.profile = {};
        this.columns = [
            { name: 'id', header: 'id', defaultVisible: false, },
            { name: 'InID', header: 'หมายเลขใบแจ้งหนี้', defaultVisible: true, groupBy: false },
            { name: 'branchID', groupBy: false, defaultFlex: 1, header: 'สาขา' },
            // {
            //     name: 'dateCreate', 
            //     defaultFlex: 1, 
            //     dateFormat: 'DD/MM/YYYY',
            //     filterEditor: DateFilter,
            //     filterEditorProps: (props, { index }) => {
            //         // for range and notinrange operators, the index is 1 for the after field
            //         return {
            //             dateFormat: 'MM-DD-YYYY',
            //             placeholder: index == 1 ? 'Created date is before...' : 'Created date is after...'
            //         }
            //     },
            //  },
            { name: 'dateCreate', groupBy: false, defaultFlex: 1, header: 'วันที่สร้าง' },
            { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่สำเร็จการขาย' },
            { name: 'res', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
            { name: 'status', groupBy: false, defaultFlex: 1, header: 'สถานะ' },
            { name: 'detail', groupBy: false, defaultFlex: 1, header: 'รายละเอียด' ,
            render: ({data})=>
            <button onClick={(e)=>{this.toggleModalSellDetail(e);this.profile=data;}} style={{display:'contents'}}>
                <AiFillFileText color='#00A3FF' size={30} />
            </button> ,
            textAlign: 'center'},
        
        ]
    }

    toggleModalSellDetail = (e) => {
        e.preventDefault();
        this.setState({ modalSellDetail: !this.state.modalSellDetail });
      }
    
      
    

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllSell(this.getAllSellSuccess, this.unSuccess);
    }

    getAllSellSuccess = async(querySnapshot) => {
        
        await querySnapshot.forEach((doc) => { 
            let d = doc.data(); 
            d.InLog = d.log;
            d.InID = doc.id;
            if( d.dateCreate)
            d.dateCreate = d.dateCreate.toDate().getDate()+"/"+(d.dateCreate.toDate().getMonth()+1)+"/"+d.dateCreate.toDate().getFullYear()
            if( d.dateIn)
                d.dateIn = d.dateIn.toDate().getDate()+"/"+(d.dateIn.toDate().getMonth()+1)+"/"+d.dateIn.toDate().getFullYear()
            else
                d.dateIn = "-"
            if(d.dateOut)
                d.dateOut = d.dateOut.toDate().getDate()+"/"+(d.dateOut.toDate().getMonth()+1)+"/"+d.dateOut.toDate().getFullYear()
            else
                d.dateOut = "-"
            if(d.datePay)
                d.datePay = d.datePay.toDate().getDate()+"/"+(d.datePay.toDate().getMonth()+1)+"/"+d.datePay.toDate().getFullYear()
            else
                d.datePay = "-"

            let a = d.branchID.get()
            .then(doc=>{
                d.branchID = doc.data().branchName
                return d;
            })
            a.then(doc=>{
                // console.log(doc)
                this.setState({dataSource:this.state.dataSource.concat(doc)});
            })
            
        });
        
        
    }

    unSuccess(error) {
        // console.log(error);
    }
    render() {
        return (
            
            <Container fluid={true} style={{ backgroundColor: 'while' }} >
                <Modal  isOpen={this.state.modalSellDetail} toggle={this.toggleModalSellDetail} backdrop='static' size='lg' >
                <ModalHeader toggle={this.toggleModalSellDetail}>รายละเอียดการขาย</ModalHeader>
                <ModalBody>
                <SellDetail profile={this.profile} />
                </ModalBody>
                </Modal>
                <Link to={this.props.match.url + "/so"}>
                    <Button color="info" style={{ width: 150 }}>เพิ่มรายการขาย</Button>
                </Link>
                <Row style={{ marginTop: '20px' }}>
                    <ReactDataGrid
                        onReady={this.setDataGridRef}
                        i18n={i18n}
                        idProperty="id"
                        columns={this.columns}
                        pagination
                        defaultLimit={10}
                        defaultSkip={10}
                        pageSizes={[10, 20, 30]}
                        dataSource={this.state.dataSource}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                        style={{ minHeight: 400 }}
                    />
                    </Row>
               
                </Container>
        );
    }
}


export default Sell;