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

import firestore from './Firebase/Firestore'
import swal from 'sweetalert';

class ImportTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lot: this.props.location.id,
            channel: this.props.location.channel,
            importDetail: this.props.location.data,
            checkCount: this.props.location.data.length,
            company: this.props.location.company,
            companyName: ""
        }
        // console.log(this.state.company.id)
        firestore.getCompanyNameByRef(this.state.company,this.getCompanyName)
    }

    getCompanyName =(name)=> {
        this.setState({companyName: name.data().companyName})
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
            firestore.onSavePO(this.state.lot, this.state.importDetail, this.taskEnd)
            swal("บันทึกเสร็จสิ้น", "กด OK เพื่อออก", "success");
            this.props.history.goBack()
            console.log("Success")
            
        }
        else if(this.state.checkCount != 0){
            swal("ผิดพลาด", "กรุณาติ้กช่องยืนยันให้ครบ", "error");
            console.log("Unsuadadw ccess")
        }
    }

    taskEnd =(doc)=> {
        console.log("Document successfully deleted!");
    }
    
    handleChangeText = (text, numOrder, type) => {

        if (type == "arriveDate") {
            console.log(typeof(text.target.value))
            for (let i = 0; i < this.state.importDetail.length; i++) {
                if (this.state.importDetail[i].productID.id === numOrder) {
                    if(text.target.value == "f"){

                        // ----- this line if in array isn't have arriveDate/expireDate
                        // ----- it will create automatic 
                        this.state.importDetail[i].arriveDate = this.state.importDetail[i].expireDate
                        console.log(this.state.importDetail[i].arriveDate)
                        break
                    }
                    else{
                        this.state.importDetail[i].arriveDate = text.target.value
                        console.log(this.state.importDetail[i].arriveDate)
                        break
                    }
                }

            }
        }
        else if (type == "expireDate") {
            for (let i = 0; i < this.state.importDetail.length; i++) {
                if (this.state.importDetail[i].productID.id === numOrder) {
                    if(text.target.value == "f"){
                        this.state.importDetail[i].expireDate = this.state.importDetail[i].expireDate
                        console.log(this.state.importDetail[i].expireDate)
                        break
                    }
                    else{
                        this.state.importDetail[i].expireDate = text.target.value
                        console.log(this.state.importDetail[i].expireDate)
                        break
                    }
                }
            }
        }
        // console.log(this.state.importDetail)
    }

    render() {

        let i = 0
        const listItems = this.state.importDetail.map((data) => {
            i++

            return (

                <tr style={{ textAlign: 'center' }}>
                    <th scope="row">{i}</th>
                    <td>{data.productID.id}</td>
                    <td>{data.productName}</td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID.id, "arriveDate")}/>
                        </InputGroup>
                    </td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID.id, "expireDate")}/>
                        </InputGroup>
                    </td>

                    <td>{data.productPrice}</td>
                    <td>{data.volume}</td>
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
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>บริษัท : {this.state.companyName} | หมายเลขล็อต : {this.state.lot} | ช่องขนส่ง : {this.state.channel}</h3>
                    {/* <h3 style={{width:'95%', alignSelf:'center', marginTop:10, marginBottom:20}}>ช่องขนส่ง : {this.state.channel}</h3> */}

                    <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                        {/* -------------------------- This is header for table  --------------------------*/}
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>ลำดับ</th>
                                <th style={{ width: 100 }}>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>วันผลิต</th>
                                <th>วันหมดอายุ</th>
                                <th style={{ width: 100 }}>ราคา</th>
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