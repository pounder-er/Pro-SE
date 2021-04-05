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

import * as data from './data.json';

import AvatarEditor from 'react-avatar-editor';



import LoadingOverlay from 'react-loading-overlay';

import axios from 'axios';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import {
  BsPersonSquare,
  BsPersonFill
} from "react-icons/bs";

import firestore from './firebase/Firestore'
import SideBar from './SideBar'
import './AddPartner.css'

var checkZip = false;
var subDistrictFilter = [];
var districtFilter = [];
const formPartnerSchema = Yup.object().shape({
  comName: Yup.string().required('กรุณาระบุข้อมูล'),
  agentName: Yup.string().required('กรุณาระบุข้อมูล'),
  phoneNumber: Yup.string()
    .length(10, 'หมายเลขโทรศัพท์ไม่ครบ 10 หลัก')
    .required('กรุณาระบุข้อมูล')
    .matches(/^[0-9]{10}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),

  address: Yup.string().required('กรุณาระบุข้อมูล'),
  subdistrict: Yup.string()
    .required('กรุณาเลือกข้อมูล')
    .matches(/^[ก-๏]+$/, 'กรุณาเลือกข้อมูล'),

  zipCode: Yup.string()
    .required('กรุณาระบุข้อมูล')
    .length(5, 'รหัสไปรษณีย์ไม่ครบ')
    .matches(/^[0-9]{5}$/, 'ต้องเป็นตัวเลข')
    .test('test', 'รหัสไปรษณีย์ไม่ถูกต้อง',
      (value) => {
        if (value != null && value.length == 5) {
          if (checkZip) {
            return true;
          } else {
            return false;
          }
        
        }
      }),

})


class AddPartnerCompany extends React.Component {
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

  toggleModalProfileImage = (e) => {
    e.preventDefault();
    this.setState({ ModalProfileImage: !this.state.ModalProfileImage });
  }

  setDefaultImageCrop = () => {
    this.setState({
      sourceImageFile: null,
      zoom: 1,
      disabledButtonSaveOrEdit: true,
      disabledButtonDefault: true,
      resizeImageUrl: ''
    });
  }


  setEditorRef = (editor) => (this.editor = editor)

  addPartnerSuccess = () => {
    this.setState({ loading: false });
    console.log("add partner success");
    this.sweetAlret("เสร็จสิ้น","เพิ่มบริษัทคู่ค้าแล้วแล้ว","success","ตกลง");
  }

  unSuccess = (error) => {
    console.log(error);
    this.sweetAlret("ไม่สำเร็จ","อีเมลซ้ำหรือการเชื่อมต่อมีปัญหา","error","ตกลง");
    this.setState({ loading: false });
  }

  sweetAlret(title,text,icon,button){
    swal({
      title: title,
      text: text,
      icon: icon,
      button: button,
    })
  }

  render() {
    // console.log(new Date().toLocaleDateString());
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
                    
                    <body className="APCBody">
                      <Card style={{width:'97%', alignSelf:'center', marginTop:20}}>
                        <h2 style={{marginTop:25, marginLeft:25}}>เพิ่มบริษัทคู่ค้า</h2>
                        <CardBody>
                          <Formik
                            validationSchema={formPartnerSchema}
                            // onSubmit={this.onSubmitForm(values)}
                            onSubmit={async (values,{resetForm}) => {
                              console.log("Hiiiiiiiiiiiiiiiiiiii")
                              this.setState({ loading: true });
                              this.account = values;
                              console.log(values)
                              firestore.addPartnerCompany(values, this.addPartnerSuccess, this.unSuccess);
                              resetForm(true);
                              
                            }}
                            //กำหนดค่า default from
                            initialValues={{
                              comName: '',
                              agentName: '',
                              phoneNumber: '',
                              address: '',
                              district: '',
                              subdistrict: '',
                              zipCode: '',
                              province: '',
                              email: '',

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
                                    
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="comName">ชื่อบริษัท</Label>
                                        <Input
                                          type="text"
                                          name="comName"
                                          id="comName"
                                          placeholder="ตย. สมชาย"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.comName}
                                          invalid={errors.comName && touched.comName}
                                        />
                                        <FormFeedback>*{errors.comName}</FormFeedback>
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="agentName">ชื่อตัวแทนบริษัท</Label>
                                        <Input
                                          type="text"
                                          name="agentName"
                                          id="agentName"
                                          placeholder="ตย. ใจหาญ"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.agentName}
                                          invalid={errors.agentName && touched.agentName}
                                        />
                                        <FormFeedback >*{errors.agentName}</FormFeedback>
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="phoneNumber">เบอร์โทรศัพท์มือถือ</Label>
                                        <Input
                                          maxLength={10}
                                          type="tel"
                                          name="phoneNumber"
                                          id="phoneNumber"
                                          placeholder="XXXXXXXXXX"
                                          onKeyPress={(e) => {
                                            setFieldValue('phoneNumber', values.phoneNumber.replace(/[^0-9]/, ''))
                                          }}
                                          onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                                          onBlur={handleBlur}
                                          value={values.phoneNumber}
                                          invalid={errors.phoneNumber && touched.phoneNumber}
                                        />
                                        <FormFeedback >*{errors.phoneNumber}</FormFeedback>
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="email">อีเมล</Label>
                                        <Input
                                          type="email"
                                          name="email"
                                          id="email"
                                          placeholder="name@example.com"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email}
                                          invalid={errors.email && touched.email}
                                        />
                                        <FormFeedback >*{errors.email}</FormFeedback>
                                      </FormGroup>
                                    </Col>
                                    <Col lg={12}>
                                      <FormGroup>
                                        <Label for="address">ที่อยู่</Label>
                                        <Input
                                          type="text"
                                          name="address"
                                          id="address"
                                          placeholder="ตย. 123/45 หมู่1 ถ.สุขุมวิท"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.address}
                                          invalid={errors.address && touched.address}
                                        />
                                        <FormFeedback >*{errors.address}</FormFeedback>
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="zip">รหัสไปรษณีย์</Label>
                                        <Input
                                          maxLength={5}
                                          type="text"
                                          name="zipCode"
                                          id="zip"
                                          placeholder="ตย. 20230"
                                          onKeyUp={() => {
                                            //console.log(values.zipCode.length);
                                            if (values.zipCode.length == 5) {
                                              let filter = data.address.filter((data) => {
                                                return data.zipcode == Number(values.zipCode)
                                              });
                                              subDistrictFilter = [];
                                              if (filter.length > 0) {
                                                let n = 0;
                                                filter.forEach(element => {
                                                  subDistrictFilter.push(<option key={n}>{element.district}</option>);
                                                  n++;
                                                });
                                                setFieldValue('subdistrict', filter[0].district);
                                                setFieldValue('district', filter[0].amphoe);
                                                setFieldValue('province', filter[0].province);
                                                checkZip = true
                                              } else {
                                                setFieldValue('subdistrict', '');
                                                setFieldValue('district', '');
                                                setFieldValue('province', '');
                                                checkZip = false
                                              }
                                            }
                                          }}
                                          onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                                          onBlur={handleBlur}
                                          value={values.zipCode}
                                          invalid={errors.zipCode && touched.zipCode}
                                        />
                                        <FormFeedback >*{errors.zipCode}</FormFeedback>
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="subdistrict">ตำบล/แขวง</Label>
                                        <Input
                                          type="select"
                                          name="subdistrict"
                                          id="subdistrict"
                                          placeholder="ทุ่งสุขลา"

                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.subdistrict}
                                        // invalid={errors.subdistrict && touched.subdistrict}
                                        >
                                          {subDistrictFilter}
                                        </Input>
                                        {/* <FormFeedback >*{errors.subdistrict}</FormFeedback> */}
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="district">อำเภอ/เขต</Label>
                                        <Input
                                          type="text"
                                          name="district"
                                          id="district"
                                          value={values.district}
                                        // invalid={errors.city && touched.city}
                                        />

                                        {/* <FormFeedback >*{errors.city}</FormFeedback> */}
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label for="province">จังหวัด</Label>
                                        <Input
                                          type="text"
                                          name="province"
                                          id="province"
                                          value={values.province}
                                        />
                                        {/* <FormFeedback >*{errors.state}</FormFeedback> */}
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row form>
                                    <Col md={8} />
                                    <Col md={2} style={{ display: 'flex' }}>
                                      <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="reset" color="secondary" style={{ flex: 1 }}>เคลียร์</Button>
                                      </FormGroup>
                                    </Col>
                                    <Col md={2} style={{ display: 'flex' }}>
                                      <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="submit" color="success" style={{ flex: 1 }}>บันทึก</Button>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </Form>
                              </LoadingOverlay>
                            )}

                          </Formik>
                          </CardBody>
                      </Card>                        
                       
                        
                    </body>
                </div>
            </div>

    );
  }
}


export default AddPartnerCompany;