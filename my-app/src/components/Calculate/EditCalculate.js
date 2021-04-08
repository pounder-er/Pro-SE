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
    ModalFooter, Container
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


})



class EditCalculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

        }
        this.loading = false;
        this.cal = null;
    
    }
    
    updateCalSuccess = () => {
        this.setState({ loading: false });
        console.log("update success");
        this.sweetAlret("เสร็จสิ้น", "แก้ไขข้อมูลเรียบรอยแล้ว", "success", "ตกลง");
        this.props.closeTogle();
    }

    unSuccess = (error) => {
        console.log(error);
        this.sweetAlret("ไม่สำเร็จ", "อีเมลซ้ำหรือการเชื่อมต่อมีปัญหา", "error", "ตกลง");
        this.setState({ loading: false });
        this.props.closeTogle();
    }

    sweetAlret(title, text, icon, button) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: button,
        })
    }
    render() {
        return (

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
                    <Col >EOQ   =   SQR(2DO / UC)</Col>
                </Row>
                <Row>
                    <Col >D ความต้องการสินค้าในเวลา 1 ปี</Col>
                </Row>
                <Row>
                    <Col >O ค่าใช้จ่ายในการสั่งซื้อต่อครั้ง</Col>
                </Row>
                <Row>
                    <Col >U ต้นทุนของสินค้าต่อหน่วย</Col>
                </Row>
                <Row>
                    <Col >C ค่าใช้จ่ายในการเก็บรักษาสินค้าคิดเป็น % ของมูลค่าสินค้าทั้งปี</Col>
                </Row>
                <Formik
                    validationSchema={formEmployeeSchema}
                    onSubmit={async (values) => {
                        this.setState({ loading: true });
                        this.cal = values
                        console.log(this.cal);
                        await fire_base.updateCal(this.props.product.productID,{cal:this.cal}, this.updateCalSuccess, this.unSuccess);

                        
                    }
                    }


                    initialValues={{
                        D: this.props.product.cal.D,
                        O: this.props.product.cal.O,
                        U: this.props.product.cal.U,
                        C: this.props.product.cal.C,
                        L: this.props.product.cal.L,
                        d: this.props.product.cal.d
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
                        <LoadingOverlay
                            active={this.state.loading}
                            spinner
                            text='กำลังเพิ่มพนักงาน...'
                        >
                            <Form onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); handleReset(e); }}>
                                <Row form style={{ marginTop: '30px' }}>
                                    <Col style={{ backgroundColor: 'wheat' }}>
                                        <FormGroup>
                                            <Label for="D">D :</Label>
                                            <Input
                                                type="number"
                                                name="D"
                                                id="D"
                                                placeholder="D"

                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9,.]/); handleChange(e); }}
                                                value={values.D}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ backgroundColor: 'wheat' }}>
                                        <FormGroup>
                                            <Label for="O">O :</Label>
                                            <Input

                                                type="number"
                                                name="O"
                                                id="O"
                                                placeholder="O"

                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9,.]/); handleChange(e); }}
                                                value={values.O}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col style={{ backgroundColor: 'wheat' }}>
                                        <FormGroup>
                                            <Label for="U">U :</Label>
                                            <Input

                                                type="number"
                                                name="U"
                                                id="U"
                                                placeholder="U"

                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9,.]/); handleChange(e); }}
                                                value={values.U}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ backgroundColor: 'wheat' }}>
                                        <FormGroup>
                                            <Label for="C">C :</Label>
                                            <Input

                                                type="number"
                                                name="C"
                                                id="C"
                                                placeholder="C"

                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9,.]/); handleChange(e); }}
                                                value = {values.C}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col style={{ backgroundColor: 'wheat' }}>
                                        <FormGroup>
                                            <Label for="L">L :</Label>
                                            <Input

                                                type="number"
                                                name="L"
                                                id="L"
                                                placeholder="L"

                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9,.]/); handleChange(e); }}
                                                value={values.L}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ backgroundColor: 'wheat' }}>
                                        <FormGroup>
                                            <Label for="d">d :</Label>
                                            <Input

                                                type="number"
                                                name="d"
                                                id="d"
                                                placeholder="d"

                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9,.]/); handleChange(e); }}
                                                value = {values.d}
                                            />
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
            </Container>
        );
    }
}

EditCalculate.propTypes = {
    product: PropTypes.object,
    closeTogle:PropTypes.func
};

export default EditCalculate;