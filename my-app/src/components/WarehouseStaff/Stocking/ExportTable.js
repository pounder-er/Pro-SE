import React from 'react';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormControl
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

import './Style/ExportTable.css';

class ExportTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lot: this.props.location.lot,
            channel: this.props.location.channel,
            exportDetail: this.props.location.data
            // test: this.props.location.data 
        }
        // console.log(this.state.exportDetail)
    }

    onCheckChange =(event)=>{
        console.log(event.target.checked)
    }

    onSave =()=>{
        
    }

    render() {
        let i = 0
        const listItems = this.state.exportDetail.map((data) => {
            i++
            return (
                <tr>
                    <th scope="row">{i}</th>
                    <td>{data.productID}</td>
                    <td>{data.oldNew}</td>
                    <td>{data.comName}</td>
                    <td>{data.productName}</td>
                    <td>{data.productWeight}</td>
                    <td>{data.total}</td>
                    <td>
                        <InputGroup>
                            <Input addon type="checkbox" style={{ width: 20, height: 20 }} onClick = {this.onCheckChange}/>
                        </InputGroup>
                    </td>
                </tr>
            )
        }
        );

        return (
            <div className="ContainerTable">

                <body className="ContentTable" style={{ border: '2px solid gray' }}>

                    <h1 style={{ width: '95%', alignSelf: 'center', marginTop: 60, marginBottom: 20 }}>รายการนำสินค้าออกคลัง</h1>
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>หมายเลขล็อต : {this.state.lot} | ช่องขนส่ง : {this.state.channel}</h3>
                    {/* <h3 style={{width:'95%', alignSelf:'center', marginTop:10, marginBottom:20}}>ช่องขนส่ง : {this.state.channel}</h3> */}

                    <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                        {/* -------------------------- This is header for table  --------------------------*/}
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>ลำดับ</th>
                                <th>รหัสสินค้า</th>
                                <th>เก่า/ใหม่</th>
                                <th>ชื่อบริษัท</th>
                                <th>ชื่อสินค้า</th>
                                <th>น้ำหนัก</th>
                                <th>จำนวน</th>
                            </tr>
                        </thead>

                        {/* -------------------------- This is datafrom for table  --------------------------*/}
                        {/* Example */}
                        <tbody style={{ textAlign: 'center' }}>
                            {listItems}
                        </tbody>
                    </Table>

                    <body className="ButtonTable">
                        <Button style={{ height: 40, width: 80, background: "#FF0000" }} onClick={() => this.props.history.goBack()}>กลับ</Button>
                        <Button style={{ height: 40, width: 80, background: "#00B046", marginRight: 20 }}>บันทึก</Button>
                    </body>

                </body>
            </div>
        )
    }
}

export default ExportTable