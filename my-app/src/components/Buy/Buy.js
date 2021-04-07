import React from 'react';

import fire_base from '../../firebase/Firebase';
import {
    Link,
} from 'react-router-dom';

import {
    Button,
    Row, Container,

} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import 'react-pro-sidebar/dist/css/styles.css';
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'

import {i18n} from '../i18n';


const filterValue = [
    { name: 'InID', operator: 'startsWith', type: 'string', },
    { name: 'companyID', operator: 'startsWith', type: 'string', },
    { name: 'dateCreate', operator: 'startsWith', type: 'string', },
    { name: 'dateIn', operator: 'startsWith', type: 'string', },
    { name: 'res', operator: 'startsWith', type: 'string', },
    { name: 'status', operator: 'startsWith', type: 'string', },

];

const columns = [
    { name: 'id', header: 'id', defaultVisible: false, },
    { name: 'InID', header: 'หมายเลขใบสั่งซื้อ', defaultVisible: true, groupBy: false },
    { name: 'companyID', groupBy: false, defaultFlex: 1, header: 'บริษัท' },
    { name: 'dateCreate', groupBy: false, defaultFlex: 1, header: 'วันที่สร้าง' },
    { name: 'dateIn', groupBy: false, defaultFlex: 1, header: 'วันที่สำเร็จการซื้อ' },
    { name: 'res', groupBy: false, defaultFlex: 1, header: 'ผู้รับผิดชอบ' },
    { name: 'status', groupBy: false, defaultFlex: 1, header: 'สถานะ' },

]

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
        }
    }
    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllBuy(this.getAllBuySuccess, this.unSuccess);
    }

    getAllBuySuccess = async(querySnapshot) => {
        
        let data = []
        await querySnapshot.forEach((doc) => { 
            if(doc.id != 'state')
            {
            let d = doc.data();
            let log = doc.data().log;
            d.InID = doc.id;
            d.dateCreate = d.dateCreate.toDate().getDate()+"/"+(d.dateCreate.toDate().getMonth()+1)+"/"+d.dateCreate.toDate().getFullYear()
            if(d.dateIn)
                d.dateIn = d.dateIn.toDate().getDate()+"/"+(d.dateIn.toDate().getMonth()+1)+"/"+d.dateIn.toDate().getFullYear()
            else
                d.dateIn = "-"
            if(d.datePay)
                d.datePay = d.datePay.toDate().getDate()+"/"+(d.datePay.toDate().getMonth()+1)+"/"+d.datePay.toDate().getFullYear()
            else
                d.datePay = "-"

            let a = d.companyID.get()
            .then(doc=>{
                d.companyID = doc.data().companyName
                return d;
            })
            a.then(doc=>{
                console.log(doc)
                this.setState({dataSource:this.state.dataSource.concat(doc)});
            })
            }
        });
         await this.setState({dataSource: data });
        
        
    }

    unSuccess(error) {
        console.log(error);
    }
    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'while' }} >

                <Link to={this.props.match.url + "/po"}>
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


export default Buy;