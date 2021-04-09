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

import firestore from './Firebase/Firestore'

import swal from 'sweetalert';

class ExportTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lot: this.props.location.lot,
            channel: this.props.location.channel,
            exportDetail: this.props.location.data,
            checkCount: this.props.location.data.length,
            branch: this.props.location.branch,
            branchName: "" 
        }

        firestore.getBranchNameByRef(this.state.branch, this.getBranchName)
    }

    getBranchName =(name)=> {
        this.setState({branchName: name.data().branchName})
    }

    onCheckChange = (event) => {
        if (event.target.checked == true) {
            this.setState({ checkCount: (this.state.checkCount -= 1) })
            console.log(event.target.checked)
            // console.log(this.state.checkCount)
        }
        else {
            this.setState({ checkCount: (this.state.checkCount += 1) })
            console.log(event.target.checked)
            // console.log(this.state.checkCount)
        }
    }

    onSaveOrder = () => {
        if (this.state.checkCount == 0) {
            firestore.onSaveSO(this.state.lot, this.taskEnd)
            swal("บันทึกเสร็จสิ้น", "กด OK เพื่อออก", "success");
            this.props.history.goBack()
            console.log("Success")
        }
        else if (this.state.checkCount != 0) {
            swal("ผิดพลาด", "กรุณาติ้กช่องยืนยันให้ครบ", "error");
            console.log("Unsuadadw ccess")
        }
    }

    taskEnd = (doc) => {
        console.log("Document successfully deleted!");
    }

    render() {
        let i = 0
        const listItems = this.state.exportDetail.map((data) => {
            i++
            return (
                <tr>
                    <th scope="row">{i}</th>
                    <td>{data.productID.id}</td>
                    {/* <td>{data.oldNew}</td> */}
                    {/* <td>{data.comName}</td> */}
                    <td>{data.productName}</td>
                    {/* <td>{data.productWeight}</td> */}
                    <td>{data.volume}</td>
                    <td>
                        <InputGroup>
                            <Input addon type="checkbox" style={{ width: 20, height: 20 }} onChange={this.onCheckChange} />
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
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>สาขา : {this.state.branchName} | หมายเลขล็อต : {this.state.lot} | ช่องขนส่ง : {this.state.channel}</h3>
                    {/* <h3 style={{width:'95%', alignSelf:'center', marginTop:10, marginBottom:20}}>ช่องขนส่ง : {this.state.channel}</h3> */}

                    <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                        {/* -------------------------- This is header for table  --------------------------*/}
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>ลำดับ</th>
                                <th>รหัสสินค้า</th>
                                {/* <th>เก่า/ใหม่</th> */}
                                {/* <th>ชื่อบริษัท</th> */}
                                <th>ชื่อสินค้า</th>
                                {/* <th>น้ำหนัก</th> */}
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
                        <Button style={{ height: 40, width: 80, background: "#00B046", marginRight: 20 }} onClick={this.onSaveOrder}>บันทึก</Button>
                    </body>

                </body>
            </div>
        )
    }
}

export default ExportTable