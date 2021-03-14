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

const formEmployeeSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทย')
    .max(40, 'กรอกได้ไม่เกิน 40 ตัวอักษร')
    .required('ต้องกรอก'),
  lastname: Yup.string()
    .matches(/^[ก-๏]+$/, 'กรอกด้วยตัวอักษรภาษาไทย')
    .max(40)
    .required('ต้องกรอก'),
  idcard: Yup.string()
    .length(13, 'เลขบัตรประชาชนไม่ครบหรือเกิน 13 หลัก')
    .matches(/^[0-9]{13}$/, 'เลขบัตรประชาชนไม่ถูกต้อง')
    .required('ต้องกรอก'),
  phonenumber: Yup.string()
    .length(10, 'หมายเลขโทรศัพท์ไม่ครบหรือเกิน 10 หลัก')
    .required('ต้องกรอก')
    .matches(/^[0-9]{10}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
  birthdate: Yup.date()
    .max((new Date().getFullYear() - 18) + "-12-01")
    .required('ต้องกรอก'),
  jobtitle: Yup.string()
    .required('ต้องกรอก')
    .matches(/[^ ]/, 'ต้องกรอก'),
  address: Yup.string().required('ต้องกรอก'),
  subdistrict: Yup.string().required('ต้องกรอก'),
  district: Yup.string().required('ต้องกรอก'),
  province: Yup.string().required('ต้องกรอก'),
  zipcode: Yup.string()
    .required('ต้องกรอก')
    .length(5, 'รหัสไปรษณีย์ไม่ครบ')
    .matches(/^[0-9]{5}$/, 'รหัสไปรษณีย์ไม่ถูกต้อง'),

  // email: Yup.string()
  //   .email('Ivalid email')
  //   .required('This field is requred'),
  // password: Yup.string()
  //   .required('This field is requred'),

})

// var DatePicker = require("reactstrap-date-picker");

class FormEmployee extends Component {
  render() {
    console.log(new Date().toLocaleDateString());
    return (
      <Card>
        <CardBody>
          <Formik
            validationSchema={formEmployeeSchema}
            onSubmit={values => console.log(values)}
            initialValues={{
              firstname: '',
              lastname: '',
              idcard: '',
              phonenumber: '',
              birthdate: '',
              jobtitle: '',
              address: '',
              subdistrict: 'hbjhbh',
              district: 'jkjkj',
              province: 'lkkok',
              zipcode: '22120',
              // email: '',
              // password: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
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
                        placeholder="สมชาย"
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
                        placeholder="ใจหาญ"
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
                      <Label for="idcard">เลขบัตรประจำตัวประชาชน</Label>
                      <Input
                        type="text"
                        name="idcard"
                        id="idcard"
                        placeholder="0000000000000"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.idcard}
                        invalid={errors.idcard && touched.idcard}
                      />
                      <FormFeedback >*{errors.idcard}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phonenumber">เบอร์โทรศัพท์มือถือ</Label>
                      <Input
                        type="tel"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="0000000000"
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
                        <option>{" "}</option>
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
                      placeholder="123/45 หมู่1 ถ.สุขุมวิท"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      invalid={errors.address && touched.address}
                    />
                    <FormFeedback >*{errors.address}</FormFeedback>
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