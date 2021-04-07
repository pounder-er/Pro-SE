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

import './Style/ImportTable.css';

class ImportTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lot: this.props.location.lot,
            channel: this.props.location.channel,
            importDetail: this.props.location.data,
            checkCount: this.props.location.data.length
        }
        // console.log(this.state.importDetail)
    }

    onCheckChange =(event)=>{
        if(event.target.checked == true){
            this.setState({checkCount:(this.state.checkCount-=1)})
            console.log(event.target.checked)
            // console.log(this.state.checkCount)
        }
        else{
            this.setState({checkCount:(this.state.checkCount+=1)})
            console.log(event.target.checked)
            // console.log(this.state.checkCount)
        }
    }

    onSaveOrder =()=>{
        if(this.state.checkCount == 0){
            console.log("Success")
        }
        else if(this.state.checkCount != 0){
            console.log("Unsuadadw ccess")
        }
    }
    
    handleChangeText = (text, numOrder, type) => {

        if (type == "createDate") {
            for (let i = 0; i < this.state.importDetail.length; i++) {
                if (this.state.importDetail[i].productID === numOrder) {
                    this.state.importDetail[i].createDate = text.target.value
                    console.log(this.state.importDetail[i].createDate)
                    break
                }

            }
        }
        else if (type == "expireDate") {
            for (let i = 0; i < this.state.importDetail.length; i++) {
                if (this.state.importDetail[i].productID === numOrder) {
                    this.state.importDetail[i].expireDate = text.target.value
                    console.log(this.state.importDetail[i].expireDate)
                    break
                }
            }
        }
    }

    render() {

        let i = 0
        const listItems = this.state.importDetail.map((data) => {
            i++
            return (

                <tr style={{ textAlign: 'center' }}>
                    <th scope="row">{i}</th>
                    <td>{data.productID}</td>
                    <td>{data.comName}</td>
                    <td>{data.productName}</td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID, "createDate")}/>
                        </InputGroup>
                    </td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID, "expireDate")}/>
                        </InputGroup>
                    </td>

                    <td>{data.productWeigth}</td>
                    <td>{data.total}</td>
                    <td>
                        <InputGroup>
                            <Input addon type="checkbox" style={{ width: 20, height: 20 }} onChange = {this.onCheckChange}/>
                        </InputGroup>
                    </td>

                </tr>
            )
        }
        );

        return (
            <div className="ContainerTable">

                <body className="ContentTable" style={{ border: '2px solid gray' }}>

                    <h1 style={{ width: '95%', alignSelf: 'center', marginTop: 60, marginBottom: 20 }}>รายการนำสินค้าเข้าคลัง</h1>
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>หมายเลขล็อต : {this.state.lot} | ช่องขนส่ง : {this.state.channel}</h3>
                    {/* <h3 style={{width:'95%', alignSelf:'center', marginTop:10, marginBottom:20}}>ช่องขนส่ง : {this.state.channel}</h3> */}

                    <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                        {/* -------------------------- This is header for table  --------------------------*/}
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>ลำดับ</th>
                                <th style={{ width: 100 }}>รหัสสินค้า</th>
                                <th>ชื่อบริษัท</th>
                                <th>ชื่อสินค้า</th>
                                <th>วันผลิต</th>
                                <th>วันหมดอายุ</th>
                                <th style={{ width: 100 }}>น้ำหนัก</th>
                                <th>จำนวน</th>
                            </tr>
                        </thead>

                        {/* -------------------------- This is datafrom for table  --------------------------*/}
                        {/* Example */}
                        <tbody>
                            {listItems}
                        </tbody>
                    </Table>

                    <body className="ButtonTable">
                        <Button style={{ height: 40, width: 80, background: "#FF0000" }} onClick={() => this.props.history.goBack()}>กลับ</Button>
                        <Button style={{ height: 40, width: 80, background: "#00B046", marginRight: 20 }} onClick={this.onSaveOrder}>บันทึก</Button>
                    </body>

                </body>
            </div>
        )
    }
}

export default ImportTable