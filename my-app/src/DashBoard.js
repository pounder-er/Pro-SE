import React from 'react';


import './DashBoard.css';

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

// import 'react-pro-sidebar/dist/css/styles.css';
// import './CustomSideBar.scss';

import { MdMenu,
         MdArchive } from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";

import {
    BsFillLockFill,
    BsFillGrid1X2Fill,
    BsFillArchiveFill,
    BsBriefcaseFill,
    BsFillPeopleFill,
    BsSearch,
    BsCheckAll
  } from "react-icons/bs";

import { AiOutlineLineChart,
         AiFillCalculator } from "react-icons/ai";

import Chart from "react-apexcharts";

import SideBar from './SideBar'


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
            ],

            collapsed: false,
            isOpen: false,
            chartWidth : "500%",

            pineChartOption : {
                series: [40, 20, 10, 30],
                labels: ['ข้าว1', 'ข้าว2', 'ข้าว3', 'ว่าง']
            }
        }
    }

    // toggleSideBar=()=>{
    //     this.setState({collapsed: !this.state.collapsed});
    //     if(this.state.chartWidth == "500%"){
    //         this.setState({chartWidth:"550%"});
    //     }
    //     else{
    //         this.setState({chartWidth:"500%"});
    //     }
    // }

    render() {
        return (
            <div className="Container">
                <SideBar/>
                <div className="Content">
                    <header className="Header">
                        {/* <div className="Profile">
                            <div className="tab">
                                <b>ประยา จันโอชุท</b>
                                <b className="tabLeft">ID: M44114</b>
                            </div>
                            <b className="rank">Manager</b>
                        </div>
                        <Button color="danger" style={{borderRadius:0}}>ออกจากระบบ</Button> */}
                        
                    </header>
                    
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
                                width={this.state.chartWidth}
                                height="300"
                                style={{alignSelf:'center',
                                        backgroundColor: "white"}}
                            />
                        </div>
                        <div className="rowContainer">
                            <div className="donutChartContainer">
                                <div className="pineChart">
                                    <h3 style={{justifySelf:'flex-start', 
                                                marginLeft:'5%', 
                                                marginTop: 20}}>สัดส่วนเนื้อที่โกดัง</h3>
                                    <Chart
                                        options={this.state.pineChartOption}
                                        series={this.state.pineChartOption.series}
                                        type="donut"
                                        width="150%"
                                        height="150%"
                                        style={{alignSelf:'center',
                                                backgroundColor: "white",
                                                marginBottom:20,
                                                marginTop:10}}
                                    />
                                </div>
                            </div>
                            <div className="cardContainer">
                                <Card style={{borderColor:"transparent", 
                                            width:"97%"}}>
                                    <p/>
                                    <h3 style={{marginLeft:'2.5%'}}>สินค้าขายดี</h3>
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
                            </div>
                        </div>
                       
                        
                    </body>
                </div>
            </div>
        );
    }
}


export default DashBoard;