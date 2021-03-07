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

// import FlatList from './FlatList'
import checkList from './checkList.json'


class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date:"1/1/2564",
            time:this.props.location.data,
            array:[1,2,3,4,5]
        }
    }

    // Render multi items
    render(){
        const listItems = checkList.map((data) =>
            <tr>
                <th scope="row">1</th>
                <td>{data.passcode}</td>
                <td>{data.name}</td>

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
        );

        return(
            <div className = "ContainerStocking">

                <body className = "ContentStocking">

                    <h1 style={{width:'80%', alignSelf:'center', marginTop:60, marginBottom:20}}>รายการที่ต้องเช็ค</h1>
                    <h3 style={{width:'80%', alignSelf:'center', marginTop:10, marginBottom:20}}>วันที่ : {this.state.date}  เวลา : {this.state.time}</h3>
                    
                    <Table hover style={{width:'80%', alignSelf:'center', marginTop:20, marginBottom:20 ,background:"#f1f1f1"}}>

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

                            <tbody>

                                {/* <FlatList checkList ={checkList}/> */}
                                {listItems}
                                
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