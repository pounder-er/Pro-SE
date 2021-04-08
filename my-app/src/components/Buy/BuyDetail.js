import React from 'react';

import fire_base from '../../firebase/Firebase';
import {
    Link,
} from 'react-router-dom';
import { AiFillFileText } from "react-icons/ai";
import {
    Button,
    Row,
    Col,
    Label,
    Container,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import 'react-pro-sidebar/dist/css/styles.css';
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import PropTypes from 'prop-types';
import {i18n} from '../i18n';



const filterValue = [
    { name: 'productID', operator: 'startsWith', type: 'string', },
    { name: 'productName', operator: 'startsWith', type: 'string', },
    { name: 'productPrice', operator: 'startsWith', type: 'string', },
    { name: 'volume', operator: 'startsWith', type: 'string', },
    { name: 'disCount', operator: 'startsWith', type: 'string', },
    { name: 'summary', operator: 'startsWith', type: 'string', },

];

const columns = [
    { name: 'productID', header: 'หมายเลขสินค้า', defaultVisible: true, groupBy: false },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'productPrice', groupBy: false, defaultFlex: 1, header: 'ราคาสินค้าต่อหน่วย' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'จำนวน' },
    { name: 'disCount', groupBy: false, defaultFlex: 1, header: 'ส่วนลด' },
    { name: 'summary', groupBy: false, defaultFlex: 1, header: 'ยอดรวม' },

]

class BuyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],

        }
        this.sum = 0
    }
    
    componentDidMount() {
        //await fire_base.getAllSell(this.getAllSellSuccess, this.unSuccess);
        console.log(this.props.profile)
        for(let x of this.props.profile.log){
            x.productID.get()
            // this.props.profile.InID = "00"
            
            .then(doc=>{
                let d = doc.data();
                d.productID = doc.id;
                d.productPrice = x.productPrice
                d.disCount = x.disCount
                d.volume = x.volume
                if(d.disCount && d.volume && d.productPrice)
                    d.summary = d.volume*d.productPrice-d.disCount
                this.sum += d.summary
                this.setState({dataSource:this.state.dataSource.concat(d)});
                // console.log(this.state.dataSource)
            })
        }
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    render() {
        return (
            <Container fluid={false} style={{ backgroundColor: 'while'}} >
                <Row style={{ height: 50 }}>
                    <Col md = {4}>
                        <Label>หมายเลขใบแจ้งหนี้: {this.props.profile.InID}</Label>
                    </Col>
                    <Col md = {4}>
                        <Label>สถานะ: {this.props.profile.status}</Label>
                    </Col >
                    
                </Row>
                <Row style={{ height: 50 }}>
                    <Col>
                        <Label>วันที่สร้างใบแจ้งหนี้: {this.props.profile.dateCreate}</Label>
                    </Col>
                    <Col >
                        {this.props.profile.datePay && <Label>วันที่ชำระเงิน: {this.props.profile.datePay}</Label>}
                        {!this.props.profile.datePay && <Label>วันที่ชำระเงิน: -</Label>}
                    </Col >
                    <Col >
                        
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col  >
                        {this.props.profile.dateOut && <Label>วันที่สินค้าออกคลัง: {this.props.profile.dateOut}</Label> }
                        {!this.props.profile.dateOut && <Label>วันที่สินค้าออกคลัง: -</Label> }    
                    </Col>
                    <Col >
                        {this.props.profile.dateIn && <Label>วันที่สินค้าถึงสาขา: {this.props.profile.dateIn}</Label>}
                        {!this.props.profile.dateIn && <Label>วันที่สินค้าถึงสาขา: -</Label>}
                    </Col >
                    <Col >
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col md={2} >
                    <Label>ใบสั่งซื้อ: </Label>
                    <button onClick={(e)=>{window.open(this.props.profile.po, "_blank"); e.preventDefault();}} style={{display:'contents'}}>
                    <AiFillFileText color='#00A3FF' size={30} />
                    </button> 
                    </Col>
                    <Col md={3} >
                    <Label>ใบเสนอราคา: </Label>
                    <button onClick={(e)=>{window.open(this.props.profile.so, "_blank"); e.preventDefault();}} style={{display:'contents'}}>
                    <AiFillFileText color='#00A3FF' size={30} />
                    </button> 
                    </Col>
                    <Col md={2} >
                    <Label>ใบแจ้งหนี้: </Label>
                    <button onClick={(e)=>{window.open(this.props.profile.in, "_blank"); e.preventDefault();}} style={{display:'contents'}}>
                    <AiFillFileText color='#00A3FF' size={30} />
                    </button> 
                    </Col>
                    <Col md={2} >
                    <Label>ใบเสร็จ: </Label>
                    <button onClick={(e)=>{window.open(this.props.profile.receipt, "_blank"); e.preventDefault();}} style={{display:'contents'}}>
                    <AiFillFileText color='#00A3FF' size={30} />
                    </button> 
                    </Col>
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
                <Row style={{ marginTop: '20px' }}>
                    {/* <Col md = {9}>
                    </Col> */}
                    <Col className="text-center text-md-right">
                    <Label > ยอดรวม: {this.sum} บาท</Label>
                    </Col>
                </Row>
                <Row style={{ height: 25 }}>
                    <Col >
                    </Col>
                    <Col >
                    </Col >
                    <Col style={{display:'flex',flexDirection:'row',justifyContent: 'flex-end'}} >
                        <Button color="info" style={{ width: 100 ,marginRight: 15}}>บันทึก</Button>
                        {' '}
                        <Button color="danger" style={{ width: 100 }}>ยกเลิก</Button>
                    </Col>
                </Row>
            </Container>

            
        );
    }
}

BuyDetail.propTypes = {
    profile: PropTypes.object
  };

export default BuyDetail;