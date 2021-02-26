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
    PaginationLink,
    Card
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import Chart from "react-apexcharts";




class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                  type: "line"
                },
                xaxis: {
                  categories: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
                },
                stroke: {
                    curve: 'smooth',
                },
                markers: {
                    size: 5,
                }
                
            },
            series: [
                {
                    name : "ซื้อเข้า",
                    data: [30, 40, 45, 50, 49, 60, 70]
                },
                {
                    name : "ขายออก",
                    data: [100, 80, 25, 10, 79, 120, 40]
                }
            ]
        }
    }
    render() {
        return (
            <div className="Container">
                <header className="Header">
                    <div className="Profile">
                        <div className="tab">
                            <b>ประยา จันโอชุท</b>
                            <b className="tabLeft">ID: M44114</b>
                        </div>
                        <b className="rank">Manager</b>
                    </div>
                    <Button color="danger" style={{borderRadius:0}}>ออกจากระบบ</Button>
                    
                </header>
                <div className="Content">
                    <div className="Sidebar">
                        <ProSidebar>
                            <Menu iconShape="square">
                                <MenuItem >Dashboard</MenuItem>
                                <MenuItem >จัดการสินค้า</MenuItem>
                                <MenuItem >ตรวจสอบสินค้า</MenuItem>
                                <MenuItem >ประวัติสินค้าเข้า/ออกคลัง</MenuItem>
                                <MenuItem >ผู้ติดต่อ</MenuItem>
                                <MenuItem >จัดการพนักงาน</MenuItem>
                                <MenuItem >เช็ค Stock สินค้า</MenuItem>
                                <MenuItem >จัดการพนักงาน</MenuItem>
                                <MenuItem >ตั้งเวลาเช็คStockสินค้าประจำวัน</MenuItem>
                                <MenuItem >ยอดขายสินค้า</MenuItem>
                                <MenuItem >คำนวนปริมาณการสั่งซื่อสินค้า</MenuItem>
                                {/* <SubMenu title="Components" >
                                    <MenuItem>Component 1</MenuItem>
                                    <MenuItem>Component 2</MenuItem>
                                </SubMenu> */}
                            </Menu>
                        </ProSidebar>
                    </div>
                    <body className="DBBody">
                        {/* <h1 style={{marginTop:20, 
                                    marginBottom:20, 
                                    width:'95%', 
                                    alignSelf:'center'}}>DashBoard</h1> */}
                        <div className="lineChart">
                            <h3 style={{justifySelf:'flex-start', 
                                        marginLeft:'2.5%', 
                                        marginTop: 20}}>จำนวนออร์เดอร์สินค้าเข้า/ออก</h3>
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="line"
                                width="500%"
                                height="300"
                                style={{alignSelf:'center',
                                        backgroundColor: "white"}}
                            />
                        </div>
                        <Card style={{borderColor:"transparent", 
                                      width:"47%", 
                                      marginLeft:"2.5%"}}>
                            <p/>
                            <h3 style={{marginLeft:15}}>สินค้าขายดี</h3>
                            <p/>
                            <Table striped style={{width:'95%', alignSelf:'center'}}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>รหัสสินค้า</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>ปริมาณ</th>
                                        <th>มูลค่า(บาท)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>110101</td>
                                        <td>ข้าวขาวดี</td>
                                        <td>1000</td>
                                        <td>1,000,000</td>
                                    </tr>
                                
                                </tbody>
                            </Table>
                        </Card>
                        
                    </body>
                </div>
            </div>
        );
    }
}


export default DashBoard;