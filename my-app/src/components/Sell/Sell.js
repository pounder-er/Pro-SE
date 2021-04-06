import React from 'react';

import fire_base from '../../firebase/Firebase';
// import './Company.css';
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
    Row, Col,Container,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import 'react-pro-sidebar/dist/css/styles.css';
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'

import {i18n} from '../i18n';
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { getTypeParameterOwner } from 'typescript';

const filterValue = [
    { name: 'InID', operator: 'startsWith', type: 'string',  },
    { name: 'branchID', operator: 'startsWith', type: 'string',  },
    { name: 'dateCreate', operator: 'startsWith', type: 'string',  },
    { name: 'dateIn', operator: 'startsWith', type: 'string',  },
    { name: 'Res', operator: 'startsWith', type: 'string',  },
    { name: 'status', operator: 'startsWith', type: 'string',  },
    
];

const columns = [
    { name: 'id', header: 'id', defaultVisible: false , },
    { name: 'InID', header: 'หมายเลขใบแจ้งหนี้', defaultVisible: true ,groupBy:false },
    { name: 'branchID', groupBy: false, defaultFlex: 1, header: 'สาขา' },
    { name: 'dateCreate', groupBy: false, defaultFlex: 1, header: 'วันที่สร้าง' },
    { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่สำเร็จการขาย' },
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

    getAllSellSuccess = async(querySnapshot) => {
        let data = []
        await querySnapshot.forEach((doc) => {
           
           let d = doc.data();
            let log = doc.data().log;
            delete d.log;
            // delete d.branchID;
           
            d.branchID.get().then((z)=>{
                d.branchID = z.data().branchName;
                
            })
            d.id = doc.id;
            d.dateCreate = d.dateCreate.toDate().getDate()+"/"+(d.dateCreate.toDate().getMonth()+1)+"/"+d.dateCreate.toDate().getFullYear()
            d.dateIn = d.dateIn.toDate().getDate()+"/"+(d.dateIn.toDate().getMonth()+1)+"/"+d.dateIn.toDate().getFullYear()
            d.datePay = d.datePay.toDate().getDate()+"/"+(d.datePay.toDate().getMonth()+1)+"/"+d.datePay.toDate().getFullYear()
                
            data.push(d);
            // await delete d.branchID;
            
            
            // let tempData = {
            //     productID : '',
            //     dateCreate : date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
            // }
            // for(let x of log){
            //     console.log("from forloop" + x)
            //     tempData.productID = x.productID
            //     data.push(tempData);
            // }
            console.log(doc.id, " => ", data);
        });
        // await this.setState({dataSource: data });
        // await console.log(" => ", data);
        
    }

    unSuccess(error) {
        console.log(error);
    }
    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'while' }} >
                        
                    <Link to={this.props.match.url+"/so"}>
                            <Button color="info" style={{ width: 150 }}>เพิ่มรายการสั่งซื้อ</Button>
                    </Link>
                    <Row style={{marginTop:'20px'}}>
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