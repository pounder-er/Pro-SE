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

import checkList from './checkList.json'
import PaginationtTable from './PaginationtTable'

class Stock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "1/1/2564",
            time: this.props.location.data,
            input: "",
            item: 0
        }
    }

    //----------------------------- GetTextFunction from Input -----------------------------

    handleChangeText = (text, numOrder, type) => {
        this.setState({ input: text.target.value })

        // console.log(numOrder)
        // console.log(checkList[numOrder].no)
        // console.log(checkList[numOrder].name)

        if (type == "balance") {
            for (let i = 0; i < checkList.length; i++) {
                if (checkList[i].no === numOrder + 1  && !isNaN(text)) {
                    checkList[i].balance = parseInt(text.target.value, 10)
                    console.log(checkList[i].balance)
                    console.log(typeof(checkList[i].balance))
                    break
                }
            }
        }
        else if (type == "damage") {
            for (let i = 0; i < checkList.length; i++) {
                if (checkList[i].no === numOrder + 1) {
                    checkList[i].damage = text.target.value
                    break
                }
            }
        }
        else if (type == "report") {
            for (let i = 0; i < checkList.length; i++) {
                if (checkList[i].no === numOrder + 1) {
                    checkList[i].report = text.target.value
                    break
                }
            }
        }
    }

    //----------------------------- Render multi items -----------------------------
    render() {
        const listItems = checkList.map((data) =>
            <tr>
                <th scope="row">{data.no}</th>
                <td>{data.passcode}</td>
                <td>{data.name}</td>

                <td>
                    <InputGroup>
                        <Input onChange={text => this.handleChangeText(text, data.no - 1, "balance")} />
                    </InputGroup>
                </td>

                <td>
                    <InputGroup>
                        <Input onChange={text => this.handleChangeText(text, data.no - 1, "damage")} />
                    </InputGroup>
                </td>

                <td>
                    <InputGroup>
                        <Input onChange={text => this.handleChangeText(text, data.no - 1, "report")} />
                    </InputGroup>
                </td>
            </tr>
        );
        //----------------------------- Render multi items -----------------------------

        return (
            <div className="ContainerStocking">

                <body className="ContentStocking">

                    <h1 style={{ width: '80%', alignSelf: 'center', marginTop: 60, marginBottom: 20 }}>รายการที่ต้องเช็ค</h1>
                    <h3 style={{ width: '80%', alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>วันที่ : {this.state.date}  เวลา : {this.state.time} Test: {this.state.input}</h3>

                    <div className="TableStocking">
                        <Table hover style={{ width: '80%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>ลำดับ</th>
                                    <th>รหัสสินค้า</th>
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
                        <PaginationtTable></PaginationtTable>

                    </div>


                    <div className="ButtonStocking">
                        <Button style={{ height: 40, width: 80, background: "#FF0000" }}>ยกเลิก</Button>
                        <Button style={{ height: 40, width: 80, background: "#00B046", marginRight: 20 }}>ตกลง</Button>
                    </div>

                </body>
            </div>
        )
    }
}

export default Stock;