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

import { 
  BsPersonSquare,
  BsPersonFill
 } from "react-icons/bs";

var checkZip = false;
var subDistrictFilter = [];
const formEmployeeSchema = Yup.object().shape({
  nametitle: Yup.string()
    .required('กรุณาเลือกข้อมูล'),
  firstname: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('กรุณาระบุข้อมูล'),
  lastname: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('กรุณาระบุข้อมูล'),
  nationalid: Yup.string()
    .matches(/^[0-9]+$/, 'ต้องเป็นตัวเลขเท่านั้น')
    .required('กรุณาระบุข้อมูล')
    .length(13, 'ไม่ครบ 13 หลัก')
    .test('checkNationalId', 'เลขบัตรประชาชนไม่ถูกต้อง', (value) => {
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
  phonenumber: Yup.string()
    .length(10, 'หมายเลขโทรศัพท์ไม่ครบ 10 หลัก')
    .required('กรุณาระบุข้อมูล')
    .matches(/^[0-9]{10}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง')
  // .transform((value, originalvalue)=>{
  //   console.log(originalvalue.replace(/[^0-9]/,''));
  //     return originalvalue.replace(/^[^0-9]{10}$/,'');
  // })
  ,
  birthdate: Yup.date()
    .max((new Date().getFullYear() - 18) + "-12-01", 'ต้องกรอกก่อน 2003-12-01')
    .required('กรุณาระบุข้อมูล'),
  jobtitle: Yup.string()
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
  zipcode: Yup.string()
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
          //   return data.zipcode == Number(value)
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



class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceImageFile: null,
      zoom: 1,
      ModalProfileImage: false,
      disabledButtonSaveOrEdit: true,
      disabledButtonDefault: true
    }
    this.hiddenFileInputRef = React.createRef()
  }

  toggleModalProfileImage = (e) => {
    e.preventDefault();
    this.setState({ ModalProfileImage: !this.state.ModalProfileImage });
  }

  setDefaultImageCrop = () =>{
    this.setState({
      sourceImageFile: null,
      zoom: 1,
      disabledButtonSaveOrEdit: true,
      disabledButtonDefault: true
    });
  }


  setEditorRef = (editor) => (this.editor = editor)

  render() {
    // console.log(new Date().toLocaleDateString());
    return (
      <Card>
        <CardBody>
          <Formik
            validationSchema={formEmployeeSchema}
            onSubmit={values => {
              console.log(values)
            }
            }
            initialValues={{
              imageProfile: '',
              nametitle: 'นาย',
              firstname: '',
              lastname: '',
              nationalid: '',
              phonenumber: '',
              birthdate: '',
              jobtitle: 'ผู้จัดการ',
              address: '',
              subdistrict: '',
              zipcode: '',
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
              <Form onSubmit={handleSubmit} onReset={(e)=>{this.setDefaultImageCrop();handleReset(e);}}>
                {/* <Button color="danger" onClick={this.toggleModalProfileImage}>hello</Button> */}
                <Modal isOpen={this.state.ModalProfileImage} toggle={this.toggleModalProfileImage} backdrop='static' >
                  <ModalHeader >เลือก/แก้ไข รูปโปรไฟล์</ModalHeader>
                  <ModalBody>
                    <FormGroup row>
                      <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.state.sourceImageFile && (
                        <AvatarEditor
                          image={this.state.sourceImageFile}
                          width={180}
                          height={180}
                          border={40}
                          onImageReady={()=>this.setState({disabledButtonSaveOrEdit:false})}
                          scale={this.state.zoom}
                          crossOrigin="anonymous"
                          // onMouseUp={() => console.log(typeof this.editor.getImage().toDataURL())}
                          ref={this.setEditorRef}
                          
                          // onImageReady={()=>console.log("hellooooo")}
                        />
                        )}
                        {!this.state.sourceImageFile && (
                          <Button 
                          onClick={()=>this.hiddenFileInputRef.current.click()} 
                          color="secondary" 
                          style={{height:'260px',width:'260px'}} >
                          <input 
                          type="file" 
                          ref={this.hiddenFileInputRef} 
                          onChange={(e)=>{
                            console.log(e.target.files[0]);
                            this.setState({sourceImageFile:e.target.files[0]});
                          }} 
                          style={{ display: 'none' }} 
                          accept="image/*" 
                          />
                          <BsPersonSquare size={100} />
                          <h6 style={{marginTop:10}}>อัปโหลดรูปภาพ</h6>
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
                  <Button color="primary" onClick={()=>{
                    setFieldValue('imageProfile','');
                    this.setDefaultImageCrop();
                  }} 
                  disabled={this.state.disabledButtonDefault} >คืนค่าเริ่มต้น</Button>
                  {' '}
                    <Button 
                    color="success" 
                    disabled={this.state.disabledButtonSaveOrEdit}
                    onClick={(e)=>{
                      setFieldValue('imageProfile', this.editor.getImage().toDataURL());
                      this.toggleModalProfileImage(e);
                      this.setState({disabledButtonDefault:false});
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
                  <FormGroup style={{display:'flex',justifyContent:'center'}} >
                    <Button 
                    onClick={this.toggleModalProfileImage} 
                    style={{height:180,width:180,borderRadius:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    {values.imageProfile && (
                    <img src={values.imageProfile} style={{height:180,width:180,borderRadius:100}}  />
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
                      <Label for="nametitle">คำนำหน้า</Label>
                      <Input
                        type="select"
                        name="nametitle"
                        id="nametitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nametitle}
                        invalid={errors.nametitle && touched.nametitle}
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
                      <Label for="firstname">ชื่อ</Label>
                      <Input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="ตย. สมชาย"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstname}
                        invalid={errors.firstname && touched.firstname}
                      />
                      <FormFeedback>*{errors.firstname}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastname">นามสกุล</Label>
                      <Input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="ตย. ใจหาญ"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                        invalid={errors.lastname && touched.lastname}
                      />
                      <FormFeedback >*{errors.lastname}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="nationalid">เลขบัตรประจำตัวประชาชน</Label>
                      <Input
                        maxLength={13}
                        type="text"
                        name="nationalid"
                        id="nationalid"
                        placeholder="XXXXXXXXXXXXX"
                        onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                        onBlur={handleBlur}
                        value={values.nationalid}
                        invalid={errors.nationalid && touched.nationalid}
                      />
                      <FormFeedback >*{errors.nationalid}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phonenumber">เบอร์โทรศัพท์มือถือ</Label>
                      <Input
                        maxLength={10}
                        type="tel"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="XXXXXXXXXX"
                        onKeyPress={(e) => {
                          setFieldValue('phonenumber', values.phonenumber.replace(/[^0-9]/, ''))
                        }}
                        onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                        onBlur={handleBlur}
                        value={values.phonenumber}
                        invalid={errors.phonenumber && touched.phonenumber}
                      />
                      <FormFeedback >*{errors.phonenumber}</FormFeedback>
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
                      <Label for="birthdate">วันเกิด</Label>
                      <Input
                        type="date"
                        name="birthdate"
                        id="birthdate"
                        placeholder="Date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthdate}
                        invalid={errors.birthdate && touched.birthdate}
                      />
                      <FormFeedback>*{errors.birthdate}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="jobtitle">ตำแหน่ง</Label>
                      <Input
                        type="select"
                        name="jobtitle"
                        id="jobtitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.jobtitle}
                        invalid={errors.jobtitle && touched.jobtitle}
                      >
                        <option>ผู้จัดการ</option>
                        <option>เจ้าหน้าที่</option>
                        <option>พนักงานคลัง</option>
                      </Input>
                      <FormFeedback>*{errors.jobtitle}</FormFeedback>
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
                        name="zipcode"
                        id="zip"
                        placeholder="ตย. 20230"
                        onKeyUp={() => {
                          //console.log(values.zipcode.length);
                          if (values.zipcode.length == 5) {
                            let filter = data.address.filter((data) => {
                              return data.zipcode == Number(values.zipcode)
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
                        value={values.zipcode}
                        invalid={errors.zipcode && touched.zipcode}
                      />
                      <FormFeedback >*{errors.zipcode}</FormFeedback>
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
            )}

          </Formik>
        </CardBody>
      </Card>
    );
  }
}

FormEmployee.propTypes = {

};

export default FormEmployee;