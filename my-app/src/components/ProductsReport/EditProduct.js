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


const fromProductSchema = Yup.object().shape({
    productName: Yup.string()
        .required('กรุณาระบุข้อมูล'),

    productPrice: Yup.number()
        .required('กรุณาระบุข้อมูล'),
    //productWeight: Yup.number(),
    // of(Yup.string().required()),
    productDetail: Yup.string(),
    productTotal: Yup.number().required('กรุณาระบุข้อมูล'),
    productStatus: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    image: Yup.string(),


})

const resizeImageFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 250, 250, 'JPEG', 50, 0,
        uri => {
            resolve(uri);
        },
        'blob'
    );
});


class EditProduct extends Component {
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

        }
        this.product = null;
        this.hiddenFileInputRef = React.createRef();

    }


    unSuccess = (error) => {
        console.log(error);
        this.sweetAlret('ไม่สำเร็จ', 'การเชื่อมต่อมีปัญหากรุณาลองใหม่อีกครั้ง', 'error', 'ตกลง');
        this.setState({ loading: false });
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

    updateProductSuccess = () => {
        this.sweetAlret('สำเร็จ', 'แก้ไขสินค้าเรียบร้อยแล้ว ไอเหี้ยยย', 'success', 'ตกลง');
        this.setState({ loading: false });
        console.log('edit success');
    }

    uploadImageSuccess = async(url) => {
        if (url) {
            this.product.image = url;
        } else {
            delete this.product.image;
        }
        await fire_base.updateProduct(this.props.product.idp, this.product, this.updateProductSuccess, this.unSuccess);
    }


    render() {
        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='กำลังแก้ไขสินค้า...'
            >

                <Formik
                    validationSchema={fromProductSchema}
                    onSubmit={async(values, { resetForm }) => {
                        this.product = values;
                        this.setState({loading:true});
                        if (values.image) {

                            await fire_base.uploadImage('product/' + [this.props.product.idp[0], this.props.product.idp.slice(2)].join(''), values.image, this.uploadImageSuccess, this.unSuccess);
                        } else {
                            await this.uploadImageSuccess('');
                        }
                    }}
                    initialValues={{
                        image: '',
                        productName: this.props.product.productName,
                        productPrice: this.props.product.productPrice,
                        productDetail: this.props.product.productDetail,
                        productTotal: this.props.product.productTotal,
                        productStatus: this.props.product.productStatus,
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
                            <Modal isOpen={this.state.ModalImage} toggle={this.toggleModalImage} backdrop='static' >
                                <ModalHeader >เลือก/แก้ไข รูปสินค้า</ModalHeader>
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
                                                    <BiImageAdd size={100} />
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
                                        setFieldValue('image', '');
                                        this.setDefaultImageCrop();
                                    }}
                                        disabled={this.state.disabledButtonDefault} >คืนค่าเริ่มต้น</Button>
                                    {' '}
                                    <Button
                                        color="success"
                                        disabled={this.state.disabledButtonSaveOrEdit}
                                        onClick={(e) => {
                                            this.editor.getImage().toBlob(async (blob) => {
                                                const resizeBlob = await resizeImageFile(blob);
                                                await console.log(resizeBlob);
                                                await setFieldValue('image', resizeBlob);
                                                const url = await URL.createObjectURL(resizeBlob);
                                                await this.setState({ resizeImageUrl: url });
                                                await console.log(url);

                                            }, 'image/jpeg', 1);
                                            //setFieldValue('imageProfile', this.editor.getImage().toBlob( 'image/jpeg', 0.95));
                                            this.toggleModalImage(e);
                                            this.setState({ disabledButtonDefault: false });
                                        }}>
                                        แก้ไข/บันทึก
                                    </Button>
                                    {' '}
                                    <Button color="secondary" onClick={this.toggleModalImage}>ยกเลิก</Button>
                                </ModalFooter>
                            </Modal>




                            <Row form>
                                <Col md={3} >
                                    <FormGroup style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Button
                                            onClick={this.toggleModalImage}
                                            style={{ height: 150, width: 150, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.props.product.image && !values.image && (
                                                <img src={this.props.product.image} style={{ height: 150, width: 150, borderRadius:10 }} />
                                            )}
                                            {values.image && (
                                                <img src={this.state.resizeImageUrl} style={{ height: 150, width: 150, borderRadius: 10 }} />
                                            )}
                                            {!values.image && !this.props.product.image && (
                                                <div>
                                                    <BsImage size={65} />
                                                    <h6>คลิกเพื่อเพิ่มรูป</h6>
                                                </div>
                                            )

                                            }



                                            {/* 
                                            {values.image && (
                                                <img src={this.state.resizeImageUrl} style={{ height: 180, width: 180, borderRadius: 100 }} />
                                            )}
                                            {!values.image && (
                                                <div>
                                                    <BsImage size={65} />
                                                    <h6>คลิกเพื่อเพิ่มรูป</h6>
                                                </div>
                                            )

                                            } */}
                                        </Button>
                                    </FormGroup>
                                </Col>
                                <Col md={9} >
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label >รหัสสินค้า</Label>
                                                <Input
                                                    readOnly
                                                    type="text"
                                                    // name="productID"
                                                    // id="productID"
                                                    value={this.props.product.idp}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="productName">ชื่อสินค้า</Label>
                                                <Input
                                                    type="text"
                                                    name="productName"
                                                    id="productName"
                                                    placeholder="ข้าว... ตรา..."
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.productName}
                                                    invalid={errors.productName && touched.productName}
                                                />
                                                <FormFeedback >*{errors.productName}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label >ชนิด</Label>
                                                <Input
                                                    readOnly
                                                    // type="text"
                                                    // name="productType"
                                                    // id="productType"
                                                    // onChange={handleChange}
                                                    // onBlur={handleBlur}
                                                    value={this.props.product.productType}
                                                // invalid={errors.productType && touched.productType}
                                                />
                                                {/* <FormFeedback >*{errors.productType}</FormFeedback> */}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup >
                                                <Label >น้ำหนัก</Label>
                                                <Input
                                                    readOnly
                                                    // maxLength={10}
                                                    // type="text"
                                                    // name="productWeight"
                                                    // id="productWeight"
                                                    // onChange={handleChange}
                                                    // onBlur={handleBlur}
                                                    value={this.props.product.productWeight}
                                                // invalid={errors.productWeight && touched.productWeight}
                                                />
                                            </FormGroup>

                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="productPrice">ราคาต่อหน่วย (บาท)</Label>
                                                <Input
                                                    min={1}
                                                    type="number"
                                                    name="productPrice"
                                                    id="productPrice"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.productPrice}
                                                    invalid={errors.productPrice && touched.productPrice}
                                                />
                                                <FormFeedback >*{errors.productPrice}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="productTotal">จำนวน</Label>
                                                <Input
                                                    min={1}
                                                    type="number"
                                                    name="productTotal"
                                                    id="productTotal"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.productTotal}
                                                    invalid={errors.productTotal && touched.productTotal}
                                                />
                                                <FormFeedback >*{errors.productTotal}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} >
                                            <FormGroup>
                                                <Label for="productStatus">สถานะ</Label>
                                                <Input
                                                    type="select"
                                                    name="productStatus"
                                                    id="productStatus"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.productStatus}
                                                    invalid={errors.productStatus && touched.productStatus}
                                                >
                                                    <option>ปกติ</option>
                                                    <option>ยกเลิก</option>
                                                </Input>
                                                <FormFeedback >*{errors.productStatus}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} >
                                            <FormGroup>
                                                <Label >ใหม่/เก่า</Label>
                                                <Input
                                                    readOnly
                                                    // type="text"
                                                    // name="newOld"
                                                    // id="newOld"
                                                    // onChange={handleChange}
                                                    // onBlur={handleBlur}
                                                    value={this.props.product.newOld}
                                                // invalid={errors.companyID && touched.companyID}
                                                />
                                                {/* <FormFeedback >*{errors.companyID}</FormFeedback> */}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} >
                                            <FormGroup>
                                                <Label >บริษัท</Label>
                                                <Input
                                                    readOnly
                                                    type="text"
                                                    // name="companyID"
                                                    // id="companyID"
                                                    // onChange={handleChange}
                                                    // onBlur={handleBlur}
                                                    value={this.props.product.companyName}
                                                // invalid={errors.companyID && touched.companyID}
                                                />
                                                {/* <FormFeedback >*{errors.companyID}</FormFeedback> */}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} />
                                        <Col>
                                            <FormGroup>
                                                <Label for="productDetail">รายละเอียด</Label>
                                                <Input
                                                    type="textarea"
                                                    name="productDetail"
                                                    id="productDetail"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.productDetail}
                                                    invalid={errors.productDetail && touched.productDetail}
                                                />
                                                <FormFeedback >*{errors.productDetail}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>

                            <Row form>
                                <Col md={8} />
                                <Col md={2} style={{ display: 'flex' }}>
                                    <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="reset" color="secondary" style={{ flex: 1 }}>คืนค่าเริ่มต้น</Button>
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

            </LoadingOverlay>
        );
    }
}

EditProduct.propTypes = {
    product: PropTypes.object,
};

export default EditProduct;
