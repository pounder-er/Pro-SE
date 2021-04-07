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

import fire_base from '../../firebase/Firebase';

import LoadingOverlay from 'react-loading-overlay';

import axios from 'axios';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import {
  BsPersonSquare,
  BsPersonFill
} from "react-icons/bs";

var checkZip = false;
var subDistrictFilter = [];
const formEmployeeSchema = Yup.object().shape({
  nameTitle: Yup.string()
    .required('กรุณาเลือกข้อมูล'),
  firstName: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('กรุณาระบุข้อมูล'),
  lastName: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('กรุณาระบุข้อมูล'),
  nationalID: Yup.string()
    .matches(/^[0-9]+$/, 'ต้องเป็นตัวเลขเท่านั้น')
    .required('กรุณาระบุข้อมูล')
    .length(13, 'ไม่ครบ 13 หลัก')
    .test('checkNationalID', 'เลขบัตรประชาชนไม่ถูกต้อง', (value) => {
      if (value != null && value.length == 13) {
        let sum = 0;
        for (let i = 0; i < 12; i++) {
          sum += parseInt(value[i]) * (13 - i)
        }
        let ans = sum % 11
        if (ans <= 1) {
          ans = 1 - ans;
        } else {
          ans = 11 - ans;
        }
        //console.log(ans);
        if (ans == parseInt(value[12])) {

          return true;
        } else {
          return false;
        }
      }
    }),
  phoneNumber: Yup.string()
    .length(10, 'หมายเลขโทรศัพท์ไม่ครบ 10 หลัก')
    .required('กรุณาระบุข้อมูล')
    .matches(/^[0-9]{10}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง')
  // .transform((value, originalvalue)=>{
  //   console.log(originalvalue.replace(/[^0-9]/,''));
  //     return originalvalue.replace(/^[^0-9]{10}$/,'');
  // })
  ,
  birthDate: Yup.date()
    .max((new Date().getFullYear() - 18) + "-12-01", 'ต้องกรอกก่อน 2003-12-01')
    .required('กรุณาระบุข้อมูล'),
  jobTitle: Yup.string()
    .required('กรุณาเลือกข้อมูล')
    .matches(/^[ก-๏]+$/, 'กรุณาเลือกข้อมูล'),
  address: Yup.string().required('กรุณาระบุข้อมูล'),
  subdistrict: Yup.string()
    .required('กรุณาเลือกข้อมูล')
    .matches(/^[ก-๏]+$/, 'กรุณาเลือกข้อมูล'),
  // city: Yup.string()
  //   .required('ต้องกรอก')
  //   .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง'),
  // state: Yup.string()
  //   .required('ต้องกรอก')
  //   .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง'),
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
          // let filter = data.address.filter((data) => {
          //   return data.zipCode == Number(value)
          // });

          // if (filter.length > 0) {
          // subDistrictFilter = [];
          // let n = 0;
          // filter.forEach(element => {
          //   subDistrictFilter.push(<option key={n}>{element.district}</option>);
          //   n++;
          // });
          // console.log(subDistrictFilter);
          // cityFilter = filter[0].amphoe;
          // stateFilter = filter[0].province;
          // console.log(cityFilter);
          // console.log(stateFilter);
          //   return true;
          // } else {
          //   return false;
          // }
        }
      }),
  imageProfile: Yup.string(),

  email: Yup.string()
    .email('อีเมลไม่ถูกต้อง')
    .required('กรุณาระบุอีเมล')
  ,
  password: Yup.string()
    .required('กรุณาระบุรหัสผ่าน'),

})

const resizeImageFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 250, 250, 'JPEG', 50, 0,
  uri => {
    resolve(uri);
  },
  'blob'
  );
});

class AddEmployee extends React.Component {
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

  uploadImageProfileSuccess = (url, uid) => {
    delete this.account.password;
    this.account.imageProfile = url;
    fire_base.addUserProfile(uid, this.account, this.addUserProfileSuccess, this.unSuccess);
    console.log(url);
  }

  addUserProfileSuccess = () => {
    this.setState({ loading: false });
    console.log("add profile success");
    this.sweetAlret("เสร็จสิ้น","เพิ่มพนักงานแล้ว","success","ตกลง");
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
          <Formik
            validationSchema={formEmployeeSchema}
            onSubmit={async (values,{resetForm}) => {
              this.setState({ loading: true });
              this.account = values;
              await axios.post('/appInventory/createUser',
                {
                  email: values.email,
                  password: values.password,
                })
                .then(async(res) => {
                  if(res.data.userRecord){
                    if(values.imageProfile){
                      await fire_base.uploadImageProfile(res.data.userRecord.uid, values.imageProfile, this.uploadImageProfileSuccess, this.unSuccess);
                    }else{
                      await this.uploadImageProfileSuccess('',res.data.userRecord.uid);
                    }
                  }else{
                    this.sweetAlret("ไม่สำเร็จ","อีเมลซ้ำหรือการเชื่อมต่อมีปัญหา","error","ตกลง");
                    this.setState({loading:false});
                  }
                  console.log(res.data);
                }).catch(error=>{
                  console.log(error);
                  this.sweetAlret("ไม่สำเร็จ","ไม่สามารถเชื่อมต่อปลายทางได้","error","ตกลง");
                  this.setState({loading:false});
                });
                resetForm();
                this.setDefaultImageCrop();
              console.log(values);
            }
          }
            //กำหนดค่า default from
            initialValues={{
            imageProfile: '',
            nameTitle: 'นาย',
            firstName: '',
            lastName: '',
            nationalID: '',
            phoneNumber: '',
            birthDate: '',
            jobTitle: 'ผู้จัดการ',
            address: '',
            subdistrict: '',
            zipCode: '',
            city: '',
            state: '',
            email: '',
            password: '',
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
                {/* <Button onClick={()=>this.sweetAlret("ไม่สำเร็จ","สัส!!! อีเมลซ้ำหรือเน็ตมึงเน่าวะ","error","ตกลง")}>hhhh</Button> */}
                {/* modal แสดงหน้าแก้ไขรูปโปร */}
                <Modal isOpen={this.state.ModalProfileImage} toggle={this.toggleModalProfileImage} backdrop='static' >
                  <ModalHeader >เลือก/แก้ไข รูปโปรไฟล์</ModalHeader>
                  <ModalBody>
                    <FormGroup row>
                      <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* แสดงตัวแก้ไขรูปโปร */}
                        {this.state.sourceImageFile && (
                          <AvatarEditor
                            image={this.state.sourceImageFile}
                            width={180}
                            height={180}
                            border={40}
                            onImageReady={() => this.setState({ disabledButtonSaveOrEdit: false, disabledButtonDefault: false })}
                            scale={this.state.zoom}
                            crossOrigin="anonymous"
                            ref={this.setEditorRef}
                          />
                        )}
                        {/* แสดงหน้าเลือกรูป */}
                        {!this.state.sourceImageFile && (
                          <Button
                            onClick={() => this.hiddenFileInputRef.current.click()}
                            color="secondary"
                            style={{ height: '260px', width: '260px' }} >
                            <input
                              type="file"
                              ref={this.hiddenFileInputRef}
                              onChange={(e) => {
                                console.log(e.target.files[0]);
                                this.setState({ sourceImageFile: e.target.files[0] });
                              }}
                              style={{ display: 'none' }}
                              accept="image/*"
                            />
                            <BsPersonSquare size={100} />
                            <h6 style={{ marginTop: 10 }}>อัปโหลดรูปภาพ</h6>
                          </Button>
                        )}
                      </Col>
                    </FormGroup>
                    {this.state.sourceImageFile && (
                      <FormGroup row>
                        <Col >
                          <Label >ซูม</Label>
                          <Input
                            type='range'
                            min="1"
                            max="2"
                            step="0.01"
                            value={this.state.zoom}
                            onChange={(e) => this.setState({ zoom: Number(e.target.value) })}
                          />
                        </Col>
                      </FormGroup>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => {
                      setFieldValue('imageProfile', '');
                      this.setDefaultImageCrop();
                    }}
                      disabled={this.state.disabledButtonDefault} >คืนค่าเริ่มต้น</Button>
                    {' '}
                    <Button
                      color="success"
                      disabled={this.state.disabledButtonSaveOrEdit}
                      onClick={(e) => {
                       this.editor.getImage().toBlob(async(blob) => {
                              const resizeBlob = await resizeImageFile(blob);
                              await console.log(resizeBlob);
                              await setFieldValue('imageProfile', resizeBlob);
                              const url =  await URL.createObjectURL(resizeBlob);
                              await this.setState({resizeImageUrl:url});
                              await console.log(url);
                              
                        },'image/jpeg', 1);
                        //setFieldValue('imageProfile', this.editor.getImage().toBlob( 'image/jpeg', 0.95));
                        this.toggleModalProfileImage(e);
                        this.setState({ disabledButtonDefault: false });
                      }}>
                      แก้ไข/บันทึก
                    </Button>
                    {' '}
                    <Button color="secondary" onClick={this.toggleModalProfileImage}>ยกเลิก</Button>
                  </ModalFooter>
                </Modal>
                <Row form>
                  <Col>

                    {/* <label className="custom-file-upload">
                      <input type="file" style={{ display: 'none' }} accept="image/*" />
                      <i className="fa fa-cloud-upload" /> Attach
                    </label> 
                  </Col>
                  <Col>  */}
                    <FormGroup style={{ display: 'flex', justifyContent: 'center' }} >
                      <Button
                        onClick={this.toggleModalProfileImage}
                        style={{ height: 180, width: 180, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {values.imageProfile && (
                          <img src={this.state.resizeImageUrl} style={{ height: 180, width: 180, borderRadius: 100 }} />
                        )}
                        {!values.imageProfile && (
                          <div>
                            <BsPersonFill size={80} />
                            <h6>คลิกเพื่อเพิ่มรูป</h6>
                          </div>
                        )

                        }
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={2} >
                    <FormGroup >
                      <Label for="nameTitle">คำนำหน้า</Label>
                      <Input
                        type="select"
                        name="nameTitle"
                        id="nameTitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nameTitle}
                        invalid={errors.nameTitle && touched.nameTitle}
                      >
                        <option>นาย</option>
                        <option>นาง</option>
                        <option>นางสาว</option>
                      </Input>
                      {/* <FormFeedback >*{errors.subdistrict}</FormFeedback> */}
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="firstName">ชื่อ</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="ตย. สมชาย"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        invalid={errors.firstName && touched.firstName}
                      />
                      <FormFeedback>*{errors.firstName}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">นามสกุล</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="ตย. ใจหาญ"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        invalid={errors.lastName && touched.lastName}
                      />
                      <FormFeedback >*{errors.lastName}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="nationalID">เลขบัตรประจำตัวประชาชน</Label>
                      <Input
                        maxLength={13}
                        type="text"
                        name="nationalID"
                        id="nationalID"
                        placeholder="XXXXXXXXXXXXX"
                        onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                        onBlur={handleBlur}
                        value={values.nationalID}
                        invalid={errors.nationalID && touched.nationalID}
                      />
                      <FormFeedback >*{errors.nationalID}</FormFeedback>
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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password">รหัสผ่าน</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        invalid={errors.password && touched.password}
                      />
                      <FormFeedback >*{errors.password}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="birthDate">วันเกิด</Label>
                      <Input
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        placeholder="Date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthDate}
                        invalid={errors.birthDate && touched.birthDate}
                      />
                      <FormFeedback>*{errors.birthDate}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="jobTitle">ตำแหน่ง</Label>
                      <Input
                        type="select"
                        name="jobTitle"
                        id="jobTitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.jobTitle}
                        invalid={errors.jobTitle && touched.jobTitle}
                      >
                        <option>ผู้จัดการ</option>
                        <option>เจ้าหน้าที่</option>
                        <option>พนักงานคลัง</option>
                      </Input>
                      <FormFeedback>*{errors.jobTitle}</FormFeedback>
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
                              setFieldValue('city', filter[0].amphoe);
                              setFieldValue('state', filter[0].province);
                              checkZip = true
                            } else {
                              setFieldValue('subdistrict', '');
                              setFieldValue('city', '');
                              setFieldValue('state', '');
                              checkZip = false
                            }
                          }
                          //  else {
                          //   setFieldValue('subdistrict', '');
                          //   setFieldValue('city', '');
                          //   setFieldValue('state', '');
                          //   subDistrictFilter = []
                          //   checkZip = false
                          // }
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
                      <Label for="city">อำเภอ/เขต</Label>
                      <Input
                        readOnly
                        type="text"
                        name="city"
                        id="city"
                        // placeholder="ศรีราชา"
                        // onChange={handleChange}
                        // onBlur={handleBlur}

                        value={values.city}
                      // invalid={errors.city && touched.city}
                      />

                      {/* <FormFeedback >*{errors.city}</FormFeedback> */}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="state">จังหวัด</Label>
                      <Input
                        readOnly
                        type="text"
                        name="state"
                        id="state"
                        // placeholder="ชลบุรี"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        value={values.state}
                      // invalid={errors.state && touched.state}
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
    );
  }
}


export default AddEmployee;