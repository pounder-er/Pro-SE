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

import fire_base from '../../firebase/Firebase';

import LoadingOverlay from 'react-loading-overlay';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

const fromProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    type: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    isNew: Yup.number()
        .required('กรุณาระบุข้อมูล'),
    price: Yup.number()
        .required('กรุณาระบุข้อมูล'),
    weight: Yup.number()
        .required('กรุณาระบุข้อมูล'),
    image: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    vender: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    detail: Yup.string(),
})

const resizeImageFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 250, 250, 'JPEG', 50, 0,
        uri => {
            resolve(uri);
        },
        'blob'
    );
});


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceImageFile: null,
            zoom: 1,
            ModalImage: false,
            disabledButtonSaveOrEdit: true,
            disabledButtonDefault: true,
            loading: false,
            resizeImageUrl: '',

            elementProductType: []
        }
        this.loading = false;
        this.product = null;
        this.hiddenFileInputRef = React.createRef();


    }

    async componentDidMount() {
        await fire_base.getAllProductType(this.getProductTypeSuccess, this.unSuccess);
        await fire_base.getAllPartnerCompany(this.getPartnerCompanySuccess, this.unSuccess)
    }

    getPartnerCompanySuccess = (querySnapshot) =>{
        
    }

    getProductTypeSuccess = (querySnapshot) => {
        let element = [], key = 0;
        querySnapshot.forEach((doc) => {
            let d = <option key={key.toString()} value={doc.id}>{doc.data().name}</option>
            element.push(d);
            key++;
        })
        this.setState({ elementProductType: element });
        console.log(element);
    }

    unSuccess = (error) => {
        console.log(error)
    }

    toggleModalImage = (e) => {
        e.preventDefault();
        this.setState({ ModalImage: !this.state.ModalImage });
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
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='กำลังเพิ่มพนักงาน...'
            >
                <Card>
                    <CardBody>
                        <Formik
                            validationSchema={fromProductSchema}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values)
                            }}
                            initialValues={{
                                image: '',
                                name: '',
                                type: '1',
                                isNew: 1,
                                price: '',
                                weight: '',
                                detail: '',
                                vender: ''
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
                                <Form onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); this.setDefaultImageCrop(); handleReset(e); }} >
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">ชื่อสินค้า</Label>
                                                <Input
                                                    maxLength={40}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="ข้าวหอมมะลิ"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    invalid={errors.name && touched.name}
                                                />
                                                <FormFeedback >*{errors.name}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="type">ชนิด</Label>
                                                <Input
                                                    maxLength={10}
                                                    type="select"
                                                    name="type"
                                                    id="type"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.type}
                                                    invalid={errors.type && touched.type}
                                                >
                                                    {this.state.elementProductType}
                                                </Input>
                                                <FormFeedback >*{errors.type}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="weight">น้ำหนัก(กิโลกรัม)</Label>
                                                <Input
                                                    min={1}
                                                    type="number"
                                                    name="weight"
                                                    id="weight"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.weight}
                                                    invalid={errors.weight && touched.weight}
                                                />
                                                <FormFeedback >*{errors.weight}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="price">ราคาต่อหน่วย</Label>
                                                <Input
                                                    min={1}
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.price}
                                                    invalid={errors.price && touched.price}
                                                />
                                                <FormFeedback >*{errors.price}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} >
                                            <FormGroup tag="fieldset">
                                                <Label for="type">ใหม่/เก่า</Label>
                                                <Input
                                                    type="select"
                                                    name="isNew"
                                                    id="isNew"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.isNew}
                                                    invalid={errors.isNew && touched.isNew}
                                                >
                                                    <option value={1}>ใหม่</option>
                                                    <option value={0}>เก่า</option>
                                                </Input>
                                                <FormFeedback >*{errors.isNew}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} >
                                            <FormGroup>
                                                <Label for="vender">บริษัท</Label>
                                                <Input
                                                    type="select"
                                                    name="vender"
                                                    id="vender"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.vender}
                                                    invalid={errors.vender && touched.vender}
                                                >
                                                    <option>ใหม่</option>
                                                    <option>เก่า</option>
                                                </Input>
                                                <FormFeedback >*{errors.vender}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col>
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
            </LoadingOverlay>
        );
    }
}

AddProduct.propTypes = {

};

export default AddProduct;
