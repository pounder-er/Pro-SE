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

import {
    MdMenu,
    MdArchive
} from "react-icons/md";
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

import {
    AiOutlineLineChart,
    AiFillCalculator
} from "react-icons/ai";

import Chart from "react-apexcharts";
import { Line, Pie } from '@reactchartjs/react-chart.js'




class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineChartData: {
                labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
                datasets: [
                    {
                        label: 'สินค้าเข้า',
                        data: [10, 20, 30, 30, 50, 30, 20],
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.6)',
                    },
                    {
                        label: 'สินค้าออก',
                        data: [40, 70, 60, 20, 40, 50, 60],
                        fill: false,
                        backgroundColor: 'rgb(44, 232, 143)',
                        borderColor: 'rgba(44, 232, 143, 0.6)',
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },

            pineChartData: {
                labels: ['ข้าว1', 'ข้าว2', 'ข้าว3', 'ข้าว4', 'ข้าว5', 'ว่าง'],
                datasets: [
                    {
                        label: 'สัดส่วนโกดัง',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },

            pineChartOption: {
                series: [40, 20, 10, 30],
                labels: ['ข้าว1', 'ข้าว2', 'ข้าว3', 'ว่าง'],

            }
        }
    }



    render() {
        return (
            <body className="DBBody">

                <div className="lineChart">
                    <h3 style={{
                        justifySelf: 'flex-start',
  
                    }}>จำนวนออร์เดอร์สินค้าเข้า/ออก</h3>
                    {/* <Chart
                                options={this.state.options}
                                series={this.state.series}
                                // type="line"
                                // width={this.state.chartWidth}
                                // height="300"
                                style={{alignSelf:'center',
                                        backgroundColor: "white"}}
                            /> */}
                    <Line data={this.state.lineChartData}
                        options={this.state.options}

                        height={70} />
                </div>
                <div style={{display: 'flex', 
                             marginTop: '1.5%', 
                             justifyContent: 'center', 
                             flexDirection: 'row'}}>
                    <div className="donutChartContainer">
                        <div className="pineChart">
                            <h3 style={{
                                justifySelf: 'flex-start',
                                marginBottom: '2%',
                                alignSelf:'flex-start'
                            }}>สัดส่วนเนื้อที่โกดัง</h3>
                            {/* <Chart
                                        options={this.state.pineChartOption}
                                        series={this.state.pineChartOption.series}
                                        type="donut"
                                        width="150%"
                                        // height="450"
                                        style={{alignSelf:'center',
                                                backgroundColor: "white",
                                                marginBottom:20,
                                                marginTop:10}}
                                    /> */}
                            <Pie data={this.state.pineChartData}
                                 height='240'/>
                            <div style={{display:'flex'}}></div>
                        </div>
                    </div>
                    <div className="cardContainer">
                        <Card style={{
                            borderColor: "transparent",
                            width: "98.5%",
                        
                        }}>
                            <p />
                            <h3 style={{ marginLeft: '2.5%' }}>สินค้าขายดี</h3>
                            <p />
                            <Table striped style={{ width: '95%', alignSelf: 'center' }}>
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

        );
    }
}


export default DashBoard;