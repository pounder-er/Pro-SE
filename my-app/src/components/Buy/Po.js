import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import {i18n} from '../i18n';
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
    CardBody,
    Card,
    Button,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CustomInput
} from 'reactstrap';

import { Formik, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import { connect } from 'react-redux';

import AvatarEditor from 'react-avatar-editor';

import fire_base from '../../firebase/Firebase';

import LoadingOverlay from 'react-loading-overlay';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import { BsImage } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

const formPo = Yup.object().shape({
    companyID: Yup.string()
      .required('ต้องกรอก'),
    
      productID: Yup.string()
      .required('ต้องกรอก'),

      volume: Yup.number()
      .required('ต้องกรอก'),
    
  
  })

  const filterValue = [
    { name: 'productID', operator: 'startsWith', type: 'string', },
    { name: 'productName', operator: 'startsWith', type: 'string', },
    { name: 'productPrice', operator: 'startsWith', type: 'string', },
    { name: 'volume', operator: 'startsWith', type: 'string', },
    { name: 'disCount', operator: 'startsWith', type: 'string', },


];

const columns = [
    { name: 'productID', header: 'หมายเลขสินค้า', defaultVisible: true, groupBy: false },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'productPrice', groupBy: false, defaultFlex: 1, header: 'ราคาสินค้าต่อหน่วย' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'จำนวน' },
    { name: 'disCount', groupBy: false, defaultFlex: 1, header: 'ส่วนลด' },
    { name: 'summary', groupBy: false, defaultFlex: 1, header: 'ลบ' },

]

class Po extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementPartnerCompany: [],
            elementProduct: [],
            dataSource: [],
            log : [],
            companyCheck : false,
            
            loading:false
        }
        this.product = []
        
        

        this.companyID = ""
    }

    componentDidMount() {
        fire_base.getAllCompany(this.getCompanySuccess, this.unSuccess)
        
    

    }

    getCompanySuccess = (querySnapshot) => {
        let element = [];
        querySnapshot.forEach((doc) => {
            let e = <option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().companyName}</option>
            element.push(e);
        })
        this.setState({ elementPartnerCompany: element });

        fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);

        // console.log(this.state.elementPartnerCompany[0].props.value);
    }

    filterElement=()=>{
        let element=[],e = this.product.filter((doc)=>{
                if(doc.companyID == this.state.elementPartnerCompany[0].props.value){
                    return true;
                }
        });

        e.forEach(doc=>{
            element.push(<option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.productName}</option>);
        })
        this.setState({elementProduct:element});
        
    }

    getAllProductSuccess = async(querySnapshot) => {
        let element = [],data=[]
       querySnapshot.forEach(async(doc) => {
            let p=[];
            p = doc.data()
            p.id = doc.id
            p.companyID.get().then(a=>{
                p.companyID = a.id
                
            })
            data.push(p);
            // element.push(<option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().productName}</option>);
        })
        this.product = data;
        setTimeout(
            ()=>this.filterElement()
            ,
            200
        )
       

        // let e = this.product.filter((doc)=>{
        //     console.log('111');
        //     if(doc.companyID == this.state.elementPartnerCompany[0].props.value){
                
        //         return true;
        //     }
        // });
        // console.log(e);
        // e.forEach(doc=>{
        //     element.push(<option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().productName}</option>)
        // })
        // this.setState({ elementProduct: element });
        
    }

    unSuccess = (error) => {
        this.setState({loading:false});
        console.log(error)
        this.sweetAlret('ล้มเหลว', 'การเชื่อมต่อผิดพลาด', 'error', 'ตกลง');
    }

    addPOSuccess=()=>{
        this.setState({loading:false});
        this.sweetAlret('สำเร็จ', 'เพิ่มรายการซื้อเรียบร้อย', 'success', 'ตกลง');
        this.setState({companyCheck:false});
        this.setState({log:[]});

    }

    sweetAlret(title, text, icon, button) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: button,
        })
    }

    uploadTodb =()=>{
        let data = {
            log : this.state.log,
            status : 'รอใบเสนอราคา',
            companyID : this.state.elementPartnerCompany[0].props.value,
            res : this.props.userProfile.firstName + " " +  this.props.userProfile.lastName
        }
        // let llog = []
        
        // for(let x of this.state.log){           
        //     let b = this.product.find((doc,index)=>{
        //         if(doc.id == x.productID){
        //             return true;
        //         }
        //     });
            
        //     llog.push(b)
        // }
        console.log(data)
        this.setState({loading:true});
        fire_base.addPO(data,this.addPOSuccess, this.unSuccess)
    }
    
    checkCom=(setFieldValue,values)=>{
        if(values.companyID == '' && this.state.elementPartnerCompany.length>0){
            setFieldValue('companyID',this.state.elementPartnerCompany[0].props.value);
        }
        console.log(values.companyID);
        if(values.productID == '' && this.state.elementProduct.length>0){
            setFieldValue('productID',this.state.elementProduct[0].props.value);
        }
    }
    render() {
        
        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='กำลังเพิ่มรายการซื้อ...'
            >
            <div>
                <Formik
                    validationSchema={formPo}
                    onSubmit={async(values, { resetForm }) => {
                        this.state.companyCheck = true
                        let g = true
                        if(this.state.log)
                        {
                            for(let x of this.state.log)
                            {
                                if(x.productID == values.productID)
                                {
                                    x.volume += values.volume
                                    g = !g
                                    this.setState({log : this.state.log.concat([])})
                                }
                            }
                        }
                        if(g)
                        {
                               
                            let a ={},
                            b = this.product.find((doc,index)=>{
                                if(doc.id == values.productID){
                                    return true;
                                }
                            });
                            // console.log('kkk',b)
                            a.productName = b.productName
                            a.volume = values.volume
                            a.productID = values.productID
                            a.productPrice = null
                            a.disCount = null
                            console.log(a)
                            this.setState({log : this.state.log.concat(a)})
                        }

                        
                    }}
                    initialValues={{
                        productName: '',
                        productID: '',
                        companyID: '00',
                        volume: 1
                    }}
                >
                    {({
                        checked,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        handleReset,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); handleReset(e); }} >
                            {this.checkCom(setFieldValue,values)}
                            <Row form>
                                
                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="companyID">บริษัท</Label>
                                        <Input
                                        disabled={this.state.companyCheck}
                                            readOnly = {this.state.companyCheck}
                                            type="select"
                                            name="companyID"
                                            id="companyID"
                                            onChange={(e)=>{
                                                handleChange(e);
                                                let element = []
                                                let d = this.product.filter(doc=>{
                                                    if(doc.companyID == e.target.value){
                                                        // this.companyID = e.target.value;
                                                        return true;
                                                    }
                                                })
                                                // console.log(e.target.value)
                                                d.forEach(doc=>{
                                                    element.push(<option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.productName}</option>);
                                                })
                                                setFieldValue('productName',d[0].id);
                                                this.setState({elementProduct:element});
                                                // console.log(values.companyID)
                                            
                                            }}
                                            onBlur={handleBlur}
                                            value={values.companyID}
                                            invalid={errors.companyID && touched.companyID}
                                        >
                                            {this.state.elementPartnerCompany}
                                        </Input>
                                        <FormFeedback >*{errors.companyID}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}/>
                                <Col md={4} >
                                    <FormGroup>
                                        <Label for="productID">สินค้า</Label>
                                        <Input
                                            type="select"
                                            name="productID"
                                            id="productID"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productID}
                                            invalid={errors.productID && touched.productID}
                                        >
                                            {this.state.elementProduct}
                                        </Input>
                                        <FormFeedback >*{errors.productID}</FormFeedback>
                                    </FormGroup>
                                </Col>

                                <Col md={4} >
                                    <FormGroup>
                                        <Label for="volume">จำนวน</Label>
                                        <Input
                                            type="number"
                                            name="volume"
                                            id="volume"
                                            min={1}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.volume}
                                            onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                                            invalid={errors.volume && touched.volume}
                                        >
                                        </Input>
                                        <FormFeedback >*{errors.volume}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                
                                
                                <Col md={2} style={{ display: 'flex' }}>
                                    <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="submit" color="success" style={{ flex: 1,height :40, marginTop: '30px'  }}>บันทึก</Button>
                                    </FormGroup>
                                </Col>
                            </Row>   
                        </Form>
                        

                    )}
                </Formik>
                <Row style={{ marginTop: '20px' }}>
                    <ReactDataGrid
                        onReady={this.setDataGridRef}
                        i18n={i18n}
                        idProperty="id"
                        columns={columns}
                        pagination
                        defaultLimit={10}
                        defaultSkip={10}
                        pageSizes={[10, 15, 30]}
                        dataSource={this.state.log}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                        style={{ minHeight: 400 }}
                    />
                </Row>
                <Row form style={{ marginTop:'30px' }}>
                                <Col md={8} />
                                <Col md={2} style={{ display: 'flex' }}>
                                    <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="reset" color="secondary" style={{ flex: 1 }}>เคลียร์</Button>
                                    </FormGroup>
                                </Col>
                                <Col md={2} style={{ display: 'flex' }}>
                                    <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button onClick={this.uploadTodb} type="submit" color="success" style={{ flex: 1 }}>บันทึก</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                {/* <Row>
                    <Col md={6} >
                        <FormGroup>
                            <Label>บริษัท</Label>
                                <Input type="select">
                                    {this.state.elementPartnerCompany}
                                </Input>
                            
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} >
                        <FormGroup>
                            <Label>สินค้า</Label>
                            <Input type="select">
                                {this.state.elementPartnerCompany}
                            </Input>
                            
                        </FormGroup>
                    </Col>
                </Row> */}
                
            </div>
            </LoadingOverlay>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      session: state.session,
      userProfile: state.userProfile
    }
}
export default connect(mapStateToProps)(Po);