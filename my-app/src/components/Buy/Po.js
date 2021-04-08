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

import AvatarEditor from 'react-avatar-editor';

import fire_base from '../../firebase/Firebase';

import LoadingOverlay from 'react-loading-overlay';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import { BsImage } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

const formPo = Yup.object().shape({
    companyID: Yup.string()
      .length(7, 'หมายเลขบริษัท')
    //   .matches(/^[0-9]{7}$/, 'หมายเลขสินค้าไม่ถูกต้าง')
      .required('ต้องกรอก'),
    
      productID: Yup.string()
      .length(7, 'หมายเลขสินค้า')
    //   .matches(/^[0-9]{7}$/, 'หมายเลขสินค้าไม่ถูกต้อง')
      .required('ต้องกรอก'),
      volume: Yup.string()
      .length(7, 'จำนวน')
      .matches(/^[0-9]{7}$/, 'จำนวนไม่ถูกต้อง')
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
            
        }
        this.product = []
        let log = []
        this.companyID = ""
    }

    async componentDidMount() {
        await fire_base.getAllCompany(this.getCompanySuccess, this.unSuccess)
        await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);
    

    }

    getCompanySuccess = (querySnapshot) => {
        let element = [];
        querySnapshot.forEach((doc) => {
            let e = <option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().companyName}</option>
            element.push(e);
        })
        this.setState({ elementPartnerCompany: element });
        console.log(element);
    }

    getAllProductSuccess = (querySnapshot) => {
        let element = [],data=[]
        querySnapshot.forEach((doc) => {
            let p;
            p = doc.data()
            p.id = doc.id
            p.companyID.get().then(doc=>{
                p.companyID = doc.id
                data.push(p)
            })
            let e = <option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().productName}</option>
            element.push(e);
        })
        console.log(data);
        this.product = data;
        this.setState({ elementProduct: element });
        console.log(element);
    }

    unSuccess = (error) => {
        // console.log(error)
    }

    render() {
        
        return (
            <div>
                <Formik
                    validationSchema={formPo}
                    onSubmit={async(values, { resetForm }) => {

                        console.log(values)
                        
                    }}
                    initialValues={{
                        image: '',
                        productName: '',
                        productID: '300000',
                        productPrice: '',
                        productWeight: 1,
                        productDetail: '',
                        companyID: '00',
                        detail:''
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

                            <Row form>
                                
                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="companyID">บริษัท</Label>
                                        <Input
                                            type="select"
                                            name="companyID"
                                            id="companyID"
                                            onChange={(e)=>{
                                                handleChange(e);
                                                let element = []
                                                let d = this.product.filter(doc=>{
                                                    if(doc.companyID == e.target.value){
                                                        return true;
                                                    }
                                                })
                                                // console.log(e.target.value)
                                                d.forEach(doc=>{
                                                    element.push(<option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.productName}</option>);
                                                })
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
                                {/* <Col>
                                    <FormGroup>
                                        <Label for="detail">รายละเอียด</Label>
                                        <Input
                                            type="textarea"
                                            name="detail"
                                            id="detail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.detail}
                                            invalid={errors.detail && touched.detail}
                                        />
                                        <FormFeedback >*{errors.detail}</FormFeedback>
                                    </FormGroup>
                                </Col> */}
                                <Col md={8} />
                                
                                <Col md={2} style={{ display: 'flex' }}>
                                    <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="submit" color="success" style={{ flex: 1 }}>บันทึก</Button>
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
                        defaultLimit={15}
                        defaultSkip={15}
                        pageSizes={[10, 15, 30]}
                        dataSource={this.state.dataSource}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                    />
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
        );
    }
}


export default Po;