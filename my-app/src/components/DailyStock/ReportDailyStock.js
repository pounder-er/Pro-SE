import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  ModalFooter
} from 'reactstrap';

import { Formik, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';



import AvatarEditor from 'react-avatar-editor';



import LoadingOverlay from 'react-loading-overlay';

import axios from 'axios';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import {
  BsPersonSquare,
  BsPersonFill
} from "react-icons/bs";

import firestore from '../../firebase/Firestore'

// import './AddPartner.css'




class ReportDailyStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceImageFile: null,
      zoom: 1,
      ModalProfileImage: false,
      disabledButtonSaveOrEdit: true,
      disabledButtonDefault: true,
      loading: false,
      resizeImageUrl: ''
    }
    this.loading = false;
    this.account = null;
    this.hiddenFileInputRef = React.createRef();

  }




  setEditorRef = (editor) => (this.editor = editor)



  render() {
    // console.log(new Date().toLocaleDateString());
    return (
    <Card style={{width:'100%'}}>
                        
        <CardBody>
          <Formik
           
            
            //กำหนดค่า default from
            initialValues={{
              productID : this.props.data.productID,
              productName: this.props.data.productName,
              respName: this.props.data.respName,
              damage: this.props.data.damage,
              productTotal: this.props.data.productTotal,
              report: this.props.data.report,
              date : this.props.data.date,
              time : this.props.data.date.toDate().getHours()+" : "+this.props.data.date.toDate().getMinutes(),
              balance : this.props.data.balance

            }}
          >
            {({
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
              //loading ขณะที่กำลังเพิ่มข้อมูล
              <LoadingOverlay
                active={this.state.loading}
                spinner
                text='กำลังเพิ่มพนักงาน...'
              >
                {/* from กรอกข้อมูล */}
                <Form onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); this.setDefaultImageCrop(); handleReset(e); }}>
                  <Row form>
                    <Col>
                      <FormGroup style={{ display: 'flex', justifyContent: 'center' }} >
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="producID">รหัสสินค้า</Label>
                        <Input
                          type="text"
                          name="productID"
                          id="productID"
                          
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.productID}
                          invalid={errors.productID && touched.productID}
                        />
                        <FormFeedback>*{errors.productID}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={8}>
                      <FormGroup>
                        <Label for="productName">ชื่อสินค้า</Label>
                        <Input
                          type="text"
                          name="productName"
                          id="productName"
                          placeholder="ตย. สมชาย"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.productName}
                          invalid={errors.productName && touched.productName}
                        />
                        <FormFeedback>*{errors.productName}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="respName">ผู้รับผิดชอบ</Label>
                        <Input
                          type="text"
                          name="respName"
                          id="respName"
                          placeholder="ตย. ใจหาญ"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.respName}
                          invalid={errors.respName && touched.respName}
                        />
                        <FormFeedback >*{errors.respName}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="damage">เสียหาย</Label>
                        <Input
                          maxLength={10}
                          type="tel"
                          name="damage"
                          id="damage"
                          placeholder="XXXXXXXXXX"
                          
                          onBlur={handleBlur}
                          value={values.damage}
                          invalid={errors.damage && touched.damage}
                        />
                        <FormFeedback >*{errors.damage}</FormFeedback>
                      </FormGroup>
                    </Col>
                    
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="productTotal">จำนวนที่เหลือ</Label>
                        <Input
                          type="text"
                          name="productTotal"
                          id="productTotal"
                          placeholder="ตย. 123/45 หมู่1 ถ.สุขุมวิท"
                          onBlur={handleBlur}
                          value={values.productTotal}
                          invalid={errors.productTotal && touched.productTotal}
                        />
                        <FormFeedback >*{errors.productTotal}</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col lg={6}>
                      <FormGroup>
                        <Label for="productTotal">จำนวนที่เช็ค</Label>
                        <Input
                          type="text"
                          name="productTotal"
                          id="productTotal"
                       
                          onBlur={handleBlur}
                          value={values.balance}
                          invalid={errors.balance && touched.balance}
                        />
                        <FormFeedback >*{errors.balance}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <FormGroup>
                        <Label for="productTotal">หมายเหตุ</Label>
                        <Input
                          type="text"
                          name="balance"
                          id="balance"
                       
                          onBlur={handleBlur}
                          value={values.balance}
                          invalid={errors.balance && touched.balance}
                        />
                        <FormFeedback >*{errors.balance}</FormFeedback>
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  
                </Form>
              </LoadingOverlay>
            )}

          </Formik>
        </CardBody>
    </Card>        

    );
  }
}

ReportDailyStock.propTypes = {
    data: PropTypes.object
}

export default ReportDailyStock;