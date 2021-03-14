import React from 'react';


import './Company.css';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Switch, 
    Route, 
    Link, 
    NavLink, 
    withRouter } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Formik, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

const formEmployeeSchema = Yup.object().shape({
    id_company: Yup.string()
      .length(7, 'หมายเลขบริษัท')
      .matches(/^[0-9]{7}$/, 'หมายเลขสินค้าไม่ถูกต้าง')
      .required('ต้องกรอก'),
    
    id_item: Yup.string()
      .length(7, 'หมายเลขสินค้า')
      .matches(/^[0-9]{7}$/, 'หมายเลขสินค้าไม่ถูกต้อง')
      .required('ต้องกรอก'),
    
  
  })

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        console.log(new Date().toLocaleDateString());
        return (
            <div className="Container">


                <div className="Content">
                    <body className="Body">
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '95%',
                            alignSelf: 'center'
                        }}>ใบสั่งซื้อสินค้า</h1>


                       
                        <Input className="Search_Button" style={{ width: 500 }} placeholder="บริษัท" />
                        <div className="Search_Button">
                            
                            <InputGroup style={{ width: 700 }}>
                                <Input placeholder="หมายเลขสินค้า" />
                                <Input placeholder="จำนวน" />
                                <Button color="info" style={{ width: 150 }}>เพิ่มรายการ</Button>
                                <InputGroupAddon addonType="append">
                                </InputGroupAddon>
                            </InputGroup>
                            {/* <InputGroup style={{ width: 200 }}>
                                <Input placeholder="จำนวน" />
                                <InputGroupAddon addonType="append">
                                </InputGroupAddon>
                            </InputGroup> */}
                            

                        </div>

                        <Table striped style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>ลำดับที่</th>
                                    <th>หมายเลขสินค้า</th>
                                    <th>รายการสินค้า</th>
                                    <th>จำนวน</th>
                                    <th>ราคาต่อหน่วย</th>
                                    <th>รวม</th>
                                    <th>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>สส.จำกัด</td>
                                    <td>100012</td>
                                    <td>01/01/2564</td>
                                    <td>ประยา จันชุด</td>
                                    <td>รอใบเสนอขาย</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>สส.จำกัดค้าแป้ง</td>
                                    <td>100013</td>
                                    <td>01/01/2564</td>
                                    <td>ประยา จันชุด</td>
                                    <td>รอการยืนยัน</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                {/* <tr>
                                    <th scope="row">3</th>
                                    <td>100012</td>
                                    <td>01/01/2564</td>
                                    <td>ประยา จันชุด</td>
                                    <td>เข้า</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr> */}



                            </tbody>
                        </Table>
                        <Pagination aria-label="Page navigation example"
                            style={{
                                justifyContent: 'center',
                                marginTop: 10
                            }}>
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
                </div>
            </div>
        );
    }
}


export default Buy;