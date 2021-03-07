import React from 'react';
import './Style/Export.css'

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

class Export extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div className = 'ContainerImport'>

                <div className = 'ContentImport'>
                    <h1 style = {{width:'100%', marginTop:60}}>ตารางงานขนสินค้าออกคลัง</h1>

                    <Table hover style={{width:'80%', alignSelf:'center', marginTop:30, marginBottom:20 ,background:"#f1f1f1"}}>

                            {/* -------------------------- This is header for table  --------------------------*/}
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>หมายเลขล็อต</th>
                                    <th>ช่องขนส่ง</th>
                                    <th>รายละเอียด</th>
                                </tr>
                            </thead>

                            {/* -------------------------- This is dataFrom for table that should render --------------------------*/}
                            {/* Example */}
                            <tbody style = {{justifyContent:'center'}}>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>100100</td>
                                    <td>A1</td>
                                    <td>ICON</td>
                                </tr>

                                <tr>
                                    <th scope="row">1</th>
                                    <td>100100</td>
                                    <td>A1</td>
                                    <td>ICON</td>
                                </tr>

                                <tr>
                                    <th scope="row">1</th>
                                    <td>100100</td>
                                    <td>A1</td>
                                    <td>ICON</td>
                                </tr>
                            </tbody>
                    </Table>

                    <body className = 'PaginationImport'>
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

                    <body className = 'ButtonImport'>
                        <Button style = {{height:40, width:100, background:"#FF0000"}}>ย้อนกลับ</Button>
                    </body>

                </div>
            </div>
        )
    }
}

export default Export