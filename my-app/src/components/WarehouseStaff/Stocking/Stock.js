import React from 'react';
import './Style/Stocking.css'

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

import { connect } from 'react-redux';
import { addSession, addUserProfile } from '../../../redux/actions';

// ------ Example object for collects of work form server ----- // 
import checkList from './checkList.json'

// ------------------------------------------------------------ // 

import firestore from './Firebase/Firestore'
import swal from 'sweetalert';

class Stock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date,
            // input: "",
            checkList: [],
        }

        firestore.getTaskStock(this.task, this.reject, this.props.userProfile.email)

    }

    success = (doc) => {
        console.log("in herre")
        doc.forEach(doc => {
            if (doc.id != "state") {
                let array = doc.data()

                array.id = doc.id
                array.balance = 0
                array.damage = 0
                array.report = ''

                // console.log(array)

                this.setState({ checkList: this.state.checkList.concat(array) })
            }
        })
    }

    task = (doc) => {
        let array = []

        doc.forEach(doc => {
            let id = doc.id
            array.push(id)
        })

        firestore.getProduct(this.success, this.reject, array)

    }

    reject = (error) => {
        console.log(error)
    }

    confirmTask = () => {
        // console.log(this.state.checkList)
        // let day = new Date
        // console.log(day.getDate()+"/"+(day.getMonth()+1)+"/"+day.getFullYear())

        if (this.state.checkList.length > 0)
            firestore.sendTask(this.state.checkList, this.props.userProfile, this.taskEnd)
        // this.setState({ input: "3" })
    }

    taskEnd = (doc) => {

        this.setState({ checkList: [] })
        // console.log(this.state.checkList)
        swal("บันทึกเสร็จสิ้น", "กด OK เพื่อออก", "success");
        console.log("Document successfully deleted!");

    }

    //----------------------------- GetTextFunction from Input -----------------------------

    handleChangeText = (text, numOrder, type) => {

        

        if (type == "balance") {
            for (let i = 0; i < this.state.checkList.length; i++) {
                if (this.state.checkList[i].productID === numOrder) {

                    let num = parseInt(text.target.value, 10)
                    // console.log(typeof(num))
                    // console.log(isNaN(num))

                    if (isNaN(num)) {
                        this.state.checkList[i].balance = 0
                    }
                    else
                        this.state.checkList[i].balance = num

                    // console.log(this.state.checkList[i].balance)
                    // console.log(isNaN(text.target.value))
                    // console.log(typeof(checkList[i].balance))
                    break
                }
            }
        }
        else if (type == "damage") {
            for (let i = 0; i < this.state.checkList.length; i++) {
                if (this.state.checkList[i].productID === numOrder) {

                    let num = parseInt(text.target.value, 10)

                    if (isNaN(num)) {
                        this.state.checkList[i].damage = 0
                    }
                    else
                        this.state.checkList[i].damage = num

                    break
                }
            }
        }
        else if (type == "report") {
            for (let i = 0; i < this.state.checkList.length; i++) {
                if (this.state.checkList[i].productID === numOrder) {
                    this.state.checkList[i].report = text.target.value
                    break
                }
            }
        }
    }

    //----------------------------- Render multi items -----------------------------
    render() {
        let i = 0
        const listItems = this.state.checkList.map((data) => {
            i++
            return (
                <tr>
                    <th scope="row">{i}</th>
                    <td>{data.id}</td>
                    <td>{data.productName}</td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID, "balance")} />
                        </InputGroup>
                    </td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID, "damage")} />
                        </InputGroup>
                    </td>

                    <td>
                        <InputGroup>
                            <Input onChange={text => this.handleChangeText(text, data.productID, "report")} />
                        </InputGroup>
                    </td>
                </tr>
            )
        }
        );
        //----------------------------- Render multi items -----------------------------

        return (
            <div className="ContainerStocking">

                <body className="ContentStocking" style={{ border: '2px solid gray' }}>

                    <h1 style={{ width: '95%', alignSelf: 'center', marginTop: 60, marginBottom: 20 }}>รายการที่ต้องเช็ค</h1>
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>วันที่ : {this.state.date.toLocaleDateString()} </h3>

                    <div className="TableStocking">
                        <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>ลำดับ</th>
                                    <th style={{ width: 100 }}>รหัสสินค้า</th>
                                    <th>รายการสินค้า</th>
                                    <th>ยอด</th>
                                    <th>ชำรุด</th>
                                    <th>หมายเหตุ</th>
                                </tr>
                            </thead>

                            <tbody style={{ textAlign: 'center' }}>

                                {listItems}

                            </tbody>

                        </Table>

                        {/* <PaginationtTable></PaginationtTable> */}

                    </div>


                    <div className="ButtonStocking">
                        <Button style={{ height: 40, width: 80, background: "#00B046" }} onClick={this.confirmTask}>บันทึก</Button>
                    </div>

                </body>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.session,
        userProfile: state.userProfile
    }
}


export default connect(mapStateToProps)(Stock);