import React from 'react';

import fire_base from '../../firebase/Firebase';
import {
    Link,
} from 'react-router-dom';

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
    { name: 'discount', operator: 'startsWith', type: 'string', },
    { name: 'summary', operator: 'startsWith', type: 'string', },

];

const columns = [
    { name: 'productID', header: 'หมายเลขสินค้า', defaultVisible: true, groupBy: false },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'productPrice', groupBy: false, defaultFlex: 1, header: 'ราคาสินค้าต่อหน่วย' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'จำนวน' },
    { name: 'discount', groupBy: false, defaultFlex: 1, header: 'ส่วนลด' },
    { name: 'summary', groupBy: false, defaultFlex: 1, header: 'ยอดรวม' },

]

class SellDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
        }
    }
    
    componentDidMount() {
        //await fire_base.getAllSell(this.getAllSellSuccess, this.unSuccess);
        // console.log(this.props.profile.log)
        for(let x in this.props.profile.log){
           console.log(x)
        }
    }

    getAllSellSuccess = async(querySnapshot) => {   
        let data = []
        await querySnapshot.forEach((doc) => { 

        });
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    render() {
        return (
            <Container fluid={false} style={{ backgroundColor: 'while'}} >
                <Row style={{ height: 50 }}>
                    <Col >
                    </Col>
                    <Col >
                    </Col >
                    <Col style={{display:'flex',flexDirection:'row',justifyContent: 'flex-end'}} >
                        <Button color="info" style={{ width: 150 ,marginRight: 15}}>บันทึก</Button>
                        {' '}
                        <Button color="info" style={{ width: 150 }}>ยกเลิก</Button>
                    </Col>
                </Row>
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

SellDetail.propTypes = {
    profile: PropTypes.object
  };

export default SellDetail;