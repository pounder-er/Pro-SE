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

// ------ Example object for collects of work form server ----- // 
import checkList from './checkList.json'
// ------------------------------------------------ // 

import firestore from './Firebase/Firestore'

import PaginationtTable from './PaginationtTable'

class Stock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "1/1/2564",
            time: "",
            input: "",
            checkList: []
        }
        firestore.getData(this.success, this.reject)
    }

    success = (doc) => {
        // console.log('success')
        doc.forEach(doc => {
            let array = doc.data()

            array.balance = 0
            array.damage = 0
            array.report = ''

            // console.log(array)

            this.setState({ checkList: this.state.checkList.concat(array) })
        })
        // console.log(this.state.checkList);
    }

    reject = (error) => {
        console.log(error)
    }

    //----------------------------- GetTextFunction from Input -----------------------------

    handleChangeText = (text, numOrder, type) => {
        this.setState({ input: text.target.value })

        // console.log(numOrder)

        if (type == "balance") {
            for (let i = 0; i < this.state.checkList.length; i++) {
                if (this.state.checkList[i].productID === numOrder) {

                    let num = parseInt(text.target.value, 10)
                    // console.log(typeof(num))
                    // console.log(isNaN(num))

                    if(isNaN(num)){
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

                    if(isNaN(num)){
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
                    <td>{data.productID}</td>
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
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>วันที่ : {this.state.date}  เวลา : {this.state.time} Test: {this.state.input}</h3>

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
                        <Button style={{ height: 40, width: 80, background: "#00B046" }}>บันทึก</Button>
                    </div>

                </body>
            </div>
        )
    }
}

export default Stock;