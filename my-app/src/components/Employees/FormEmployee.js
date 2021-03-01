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
  Col, Row,
} from 'reactstrap';

import { Formik, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import * as data from './data.json';



// var DatePicker = require("reactstrap-date-picker");
var checkZip = false;
var subDistrictFilter = [];
const formEmployeeSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('ต้องกรอก'),
  lastname: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('ต้องกรอก'),
  nationalid: Yup.string()
    .matches(/^[0-9]+$/, 'ต้องเป็นตัวเลขเท่านั้น')
    .required('ต้องกรอก')
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
        console.log(ans);
        if (ans == parseInt(value[12])) {

          return true;
        } else {
          return false;
        }
      }
    }),
  phonenumber: Yup.string()
    .length(10, 'หมายเลขโทรศัพท์ไม่ครบ 10 หลัก')
    .required('ต้องกรอก')
    .matches(/^[0-9]{10}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง')
  // .transform((value, originalvalue)=>{
  //   console.log(originalvalue.replace(/[^0-9]/,''));
  //     return originalvalue.replace(/^[^0-9]{10}$/,'');
  // })
  ,
  birthdate: Yup.date()
    .max((new Date().getFullYear() - 18) + "-12-01")
    .required('ต้องกรอก'),
  jobtitle: Yup.string()
    .required('ต้องเลือก')
    .matches(/^[ก-๏]+$/, 'ต้องเลือก'),
  address: Yup.string().required('ต้องกรอก'),
  subdistrict: Yup.string()
    .required('ต้องเลือก')
    .matches(/^[ก-๏]+$/, 'ต้องเลือก'),
  // city: Yup.string()
  //   .required('ต้องกรอก')
  //   .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง'),
  // state: Yup.string()
  //   .required('ต้องกรอก')
  //   .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทยและไม่มีช่องว่าง'),
  zipcode: Yup.string()
    .required('ต้องกรอก')
    .length(5, 'รหัสไปรษณีย์ไม่ครบ')
    .matches(/^[0-9]{5}$/, 'ต้องเป็นตัวเลข')
    .test('test', 'รหัสไปรษณีย์ไม่ถูกต้อง',
      (value) => {
        if (value != null && value.length == 5) {
          if(checkZip){
            return true;
          }else{
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

  // email: Yup.string()
  //   .email('Ivalid email')
  //   .required('This field is requred'),
  // password: Yup.string()
  //   .required('This field is requred'),

})



class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

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
              nametitle: '',
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
              // email: '',
              // password: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row form>
                  <Col md={6}>
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
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="nationalid">เลขบัตรประจำตัวประชาชน</Label>
                      <Input
                        maxLength={13}
                        type="text"
                        name="nationalid"
                        id="nationalid"
                        placeholder="0000000000000"
                        onKeyPress={(e) => {
                          setFieldValue('nationalid', values.nationalid.replace(/[^0-9]/, ''))
                        }}
                        onChange={handleChange}
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
                        placeholder="0000000000"
                        // onInput={(e)=>{
                        //   setFieldValue('phonenumber',values.phonenumber.replace(/[^0-9]/,''))
                        // }}
                        onKeyPress={(e) => {
                          setFieldValue('phonenumber', values.phonenumber.replace(/[^0-9]/, ''))
                        }}
                        // onKeyUp={(e)=>{
                        //     setFieldValue('phonenumber',values.phonenumber.replace(/[^0-9]/,''))
                        //   }}
                        // onKeyDown={(e)=>{
                        //   setFieldValue('phonenumber',values.phonenumber.replace(/[^0-9]/,''))
                        // }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phonenumber}
                        invalid={errors.phonenumber && touched.phonenumber}
                      />
                      <FormFeedback >*{errors.phonenumber}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
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
                </Row>
                <Row form>
                  <Col>
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
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="zip">รหัสไปรษณีย์</Label>
                      <Input
                        maxLength={5}
                        type="text"
                        name="zipcode"
                        id="zip"
                        placeholder="ตย. 20230"
                        onKeyUp={()=>{
                          console.log(values.zipcode.length)
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
                            }else{
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
                        onKeyPress={() => {
                          setFieldValue('zipcode', values.zipcode.replace(/[^0-9]/, ''))
                          
                        }}
                        onChange={handleChange}
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
                        invalid={errors.subdistrict && touched.subdistrict}
                      >
                        {subDistrictFilter}
                      </Input>
                      <FormFeedback >*{errors.subdistrict}</FormFeedback>
                    </FormGroup>

                  </Col>
                </Row>
                <Row form>
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
                <Button type="submit" color="primary">บันทึก</Button>
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