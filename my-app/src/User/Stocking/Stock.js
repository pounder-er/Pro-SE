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


class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date:"1/1/2564",
            time:"12:00"
        }
    }

    render(){
        return(
            <div className = "ContainerStocking">

                <body className = "ContentStocking">

                    <h1 style={{width:'80%', alignSelf:'center', marginTop:60, marginBottom:20}}>รายการที่ต้องเช็ค</h1>
                    <h3 style={{width:'80%', alignSelf:'center', marginTop:10, marginBottom:20}}>วันที่ : {this.state.date}  เวลา : {this.state.time}</h3>
                    
                    <Table hover style={{width:'80%', alignSelf:'center', marginTop:20, marginBottom:20 ,background:"#f1f1f1"}}>

                            {/* -------------------------- This is header for table  --------------------------*/}
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รหัสสินค้า</th>
                                    <th>รายการสินค้า</th>
                                    <th>ยอด</th>
                                    <th>ชำรุด</th>
                                    <th>หมายเหตุ</th>
                                </tr>
                            </thead>

                            {/* -------------------------- This is datafrom for table  --------------------------*/}
                            {/* Example */}
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>11323</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>11323</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>11323</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>

                                    <td>
                                        <InputGroup>
                                            <Input/>
                                        </InputGroup>
                                    </td>
                                </tr>
                            </tbody>
                    </Table>

                    <body className = 'PaginationStocking'>
                        <Pagination aria-label="Page navigation example" style={{justifyContent:'center', marginTop:10}}>
                            <PaginationItem>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                 <PaginationLink previous href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" />
                            </PaginationItem>
                        </Pagination>
                    </body>

                    <div className = "ButtonStocking">
                        <Button style = {{height:40, width:80, background:"#FF0000"}}>ยกเลิก</Button>
                        <Button style = {{height:40, width:80, background:"#00B046", marginRight: 20}}>ตกลง</Button>
                    </div>

                </body>
            </div>
        )
    }
}

export default Stock;