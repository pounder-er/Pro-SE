import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Label,
    FormFeedback,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink, Row, Col, Container, Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

import { Formik, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

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

class EditCalculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (

            <Formik
                validationSchema={formEmployeeSchema}
                onSubmit={async (values, { resetForm }) => {
                    this.setState({ loading: true });
                    this.account = values;
                    await axios.post('/appInventory/createUser',
                        {
                            email: values.email,
                            password: values.password,
                        })
                        .then(async (res) => {
                            if (res.data.userRecord) {
                                if (values.imageProfile) {
                                    await fire_base.uploadImageProfile(res.data.userRecord.uid, values.imageProfile, this.uploadImageProfileSuccess, this.unSuccess);
                                } else {
                                    await this.uploadImageProfileSuccess('', res.data.userRecord.uid);
                                }
                            } else {
                                this.sweetAlret("ไม่สำเร็จ", "อีเมลซ้ำหรือการเชื่อมต่อมีปัญหา", "error", "ตกลง");
                                this.setState({ loading: false });
                            }
                            console.log(res.data);
                        }).catch(error => {
                            console.log(error);
                            this.sweetAlret("ไม่สำเร็จ", "ไม่สามารถเชื่อมต่อปลายทางได้", "error", "ตกลง");
                            this.setState({ loading: false });
                        });
                    resetForm();
                    this.setDefaultImageCrop();
                    console.log(values);
                }
                }
                //กำหนดค่า default from
                initialValues={{
                    D: '',
                    O: '',
                    U: '',
                    C: '',
                    L: '',
                    d: '',
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
                    <Container fluid={true} style={{ backgroundColor: '#B3D864' }} >
                        <Row>
                            <Col >
                                รหัสสินค้า: {this.props.product.productID}
                            </Col>
                            <Col >
                                รายการสินค้า: {this.props.product.productName}
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                EOQ   =   SQR(2DO / UC)
                    </Col>
                        </Row>
                        <Row>
                            <Col >
                                D ความต้องการสินค้าในเวลา 1 ปี
                    </Col>
                        </Row>
                        <Row>
                            <Col >
                                O ค่าใช้จ่ายในการสั่งซื้อต่อครั้ง
                    </Col>
                        </Row>
                        <Row>
                            <Col >
                                U ต้นทุนของสินค้าต่อหน่วย
                    </Col>
                        </Row>
                        <Row>
                            <Col >
                                C ค่าใช้จ่ายในการเก็บรักษาสินค้าคิดเป็น % ของมูลค่าสินค้าทั้งปี
                    </Col>
                        </Row>
                        <Row>
                            <Col style={{ backgroundColor: 'wheat' }}>
                                <FormGroup>
                                    <Label for="D">D</Label>
                                    <Input
                                        maxLength={10}
                                        type="tel"
                                        name="D"
                                        id="D"
                                        placeholder="D"
                                        onKeyPress={(e) => {
                                            setFieldValue('D', values.phoneNumber.replace(/[^0-9]/, ''))
                                        }}
                                        onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik>

        );
    }
}

EditCalculate.propTypes = {
    product: PropTypes.object
};

export default EditCalculate;