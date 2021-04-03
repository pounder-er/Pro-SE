import React from 'react';

import {
    Button,
    Label,
    Row,
    Col,
    Container,
    UncontrolledCollapse,
    CardBody,
    Card,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input
} from 'reactstrap';

import styled from 'styled-components';

import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";

import {i18n} from '../i18n';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter';

import fire_base from '../../firebase/Firebase';

import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';

import { AiFillFileText } from "react-icons/ai";

import EditEmployee from './EditEmployee';

const filterValue = [
    { name: 'firstName', operator: 'startsWith', type: 'string',  },
    { name: 'lastName', operator: 'startsWith', type: 'string', },
    { name: 'email', operator: 'startsWith', type: 'string',  },
    { name: 'phoneNumber', operator: 'startsWith', type: 'string',  },
    { name: 'jobTitle', operator: 'startsWith', type: 'select',operator: 'inlist',  },
    { name: 'status', operator: 'startsWith', type: 'select',operator: 'inlist',  },
    
];

class ListEmployee extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: [],
            modalEditEmployee: false,
        }
        this.profile = {};
        this.columns = [
            { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 50},
            { name: 'no', header: '', type: 'number' ,groupBy: false, defaultWidth: 50 },
            { name: 'firstName', groupBy: false,defaultFlex: 1, header: 'ชื่อ' },
            { name: 'lastName', groupBy: false,defaultFlex: 1, header: 'นามสกุล' },
            { name: 'email', groupBy: false, defaultFlex: 1, header: 'อีเมล' },
            { name: 'phoneNumber', groupBy: false, defaultFlex: 1, header: 'เบอร์ติดต่อ' },
            { name: 'jobTitle', defaultFlex: 1,  
            filterEditor: SelectFilter,
            filterEditorProps: {
                placeholder: 'ทั้งหมด',
                dataSource: [{id:'ผู้จัดการ',label:'ผู้จัดการ'},
                {id:'ผู้ดูแลระบบ',label:'ผู้ดูแลระบบ'},
                {id:'เจ้าหน้าที่',label:'เจ้าหน้าที่'},
                {id:'พนังงานคลัง',label:'พนังงานคลัง'}]
            },header: 'ตำแหน่ง' },
            { name: 'status', groupBy: false, defaultFlex: 1,  
            filterEditor: SelectFilter,
            filterEditorProps: {
                placeholder: 'ทั้งหมด',
                dataSource: [{id:'ปกติ',label:'ปกติ'},{id:'ลาพัก',label:'ลาพัก'},{id:'ออก',label:'ออก'}]
            }, header: 'สถานะ',render: ({value})=>{
                if(value == 'ปกติ'){
                    return(
                        <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{width:8,height:8,margin:5,borderRadius:100,backgroundColor:'#00B046'
                         }} /> 
                        {value}
                    </div>);
                }
                else if(value == 'ลาพัก'){
                    return(
                        <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{width:8,height:8,margin:5,borderRadius:100,backgroundColor:'gray'
                         }} /> 
                        {value}
                    </div>);
                }else{
                    return(
                        <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{width:8,height:8,margin:5,borderRadius:100,backgroundColor:'#FF0B0B'
                         }} /> 
                        {value}
                    </div>);
                }
                
            }
            }
            ,
            { name: 'detail', header: 
            <div style={{ display: 'inline-block' }}>
                {'รายละเอียด'}
          </div>,defaultWidth: 109, 
            render: ({data})=>
            <button onClick={(e)=>{this.toggleModalEditEmployee(e);this.profile=data;}} style={{display:'contents'}}>
                <AiFillFileText color='#00A3FF' size={30} />
            </button> ,
            textAlign: 'center'
            }
        ]
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    toggleModalEditEmployee = (e) => {
        e.preventDefault();
        this.setState({ modalEditEmployee: !this.state.modalEditEmployee });
      }

    async componentDidMount(){
        //await fire_base.getAllUserProfile(this.getAllUserProfileSuccess,this.unSuccess);
        await fire_base.listeningProfile(this.listeningProfileSuccess,this.unSuccess);
    }

    listeningProfileSuccess=(snapshot)=>{
        let data = this.state.dataSource;
        snapshot.docChanges().forEach(function (change) {
            let d = change.doc.data();
            d.id = change.doc.id
            if (change.type === "added") {
                d.no = data.length+1;
                data.push(d);
            }
            if (change.type === "modified") {
                d.no = data[data.findIndex((obj=>obj.id == d.id))].no
                data[data.findIndex((obj=>obj.id == d.id))] = d;
                console.log("Modified : ", d);
            }
            if (change.type === "removed") {
                data.splice(data.findIndex((obj=>obj.id == d.id)),1);
                console.log("Removed : ", change.doc.data());
            }
        })
        //console.log(data);
        this.setState({
            dataSource: [...data]
          });
    }

    getAllUserProfileSuccess=(querySnapshot)=>{
        let data = []
        querySnapshot.forEach(doc => {
            let d = doc.data();
            d.id = doc.id
      
                data.push(d);
                console.log(doc.id, " => ", doc.data());

        });
        this.setState({dataSource:data});
    }

    unSuccess(error){
        console.log(error);
    }

    render() {
        return (

            <div>
                <Modal isOpen={this.state.modalEditEmployee} toggle={this.toggleModalEditEmployee} backdrop='static' size='lg' >
                <ModalHeader toggle={this.toggleModalEditEmployee}>รายละเอียดพนักงาน</ModalHeader>
                <ModalBody>
                <EditEmployee profile={this.profile} />
                </ModalBody>
                </Modal>
                {/* <Row style={{ marginBottom: '1rem' }}>
                    <Col md="6">.col-3</Col>
                    <Col md="6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button color="primary" id="toggler"  >            
                            เพิ่มพนักงาน                   
                        </Button>           
                    </Col>
                </Row> */}
                <ReactDataGrid
                    onReady={this.setDataGridRef}
                    i18n={i18n}
                    idProperty="id"
                    columns={this.columns}
                    pagination
                    defaultLimit={15}
                    defaultSkip={15}
                    pageSizes={[10, 15, 30]}
                    dataSource={this.state.dataSource}
                    defaultFilterValue={filterValue}
                    showColumnMenuTool={false}
                    emptyText="ไม่มีรายการ"
                    style={{minHeight: 550}}
                />
                {/* <UncontrolledCollapse toggler="#toggler">
                <FormEmployee />
                </UncontrolledCollapse> */}

            </div>



        );
    }
}

// const Container = styled.div`
//       display: flex;
//       align-items: flex-start;
//       background-color: white; 
//       flex-direction:column;
//     `;

export default ListEmployee;