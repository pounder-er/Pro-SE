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
    productType: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    
    productPrice: Yup.number()
        .required('กรุณาระบุข้อมูล'),
    productWeight: Yup.number(),
    // of(Yup.string().required()),
    image: Yup.string()
        .required('กรุณาระบุข้อมูล'),
    companyID: Yup.string(),
    productDetail: Yup.string(),
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


            elementProductType: [],
            elementPartnerCompany: []
        }
        this.product = null;
        this.hiddenFileInputRef = React.createRef();
        this.id = '';

        fire_base.getAllProductType(this.getProductTypeSuccess, this.unSuccess);
        fire_base.getAllCompany(this.getCompanySuccess, this.unSuccess);
        setTimeout(
            ()=>console.log(),
            2000
        );


    }

    

    // async componentDidMount() {
    //     await fire_base.getAllProductType(this.getProductTypeSuccess, this.unSuccess);
    //     await fire_base.getAllCompany(this.getCompanySuccess, this.unSuccess)
    // }

    getCompanySuccess = (querySnapshot) => {
        let element = [];
        querySnapshot.forEach((doc) => {
            let e = <option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().companyName}</option>
            element.push(e);
        })
        this.setState({ elementPartnerCompany: element });
        console.log(element);
    }

    getProductTypeSuccess = (querySnapshot) => {
        let element = []
        querySnapshot.forEach((doc) => {
            let e = <option key={doc.id} value={doc.id}>{doc.data().name}</option>
            element.push(e);
        })
        this.setState({ elementProductType: element })
        
        // this.setState({ elementProductType: element })
        console.log(element);
    }

    unSuccess = (error) => {
        console.log(error);
        this.sweetAlret('ไม่สำเร็จ','การเชื่อมต่อมีปัญหากรุณาลองใหม่อีกครั้ง','error','ตกลง');
        this.setState({loading:false});
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

    addProductSuccess=async(id)=>{
        this.id = await id;
        await fire_base.uploadImage('product/'+id,this.product.image,this.uploadImageSuccess,this.unSuccess);
    }

    uploadImageSuccess=async(url)=>{
        await fire_base.updateNewOldProduct(this.id,{image:url},this.updateProductSuccess,this.unSuccess);
    }

    updateProductSuccess=()=>{
        this.sweetAlret('สำเร็จ','เพิ่มสินค้าเรียบร้อยแล้ว','success','ตกลง');
        this.setState({loading:false});
        console.log('add product success');
    }



    render() {
        console.log(typeof 1);
        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='กำลังเพิ่มสินค้า...'
            >

                <Formik
                    validationSchema={fromProductSchema}
                    onSubmit={async(values, { resetForm }) => {
                        this.product = values;
                        await this.setState({loading:true});
                        await fire_base.addProduct(values,this.addProductSuccess,this.unSuccess);
                        //resetForm();
                        
                        console.log(values)
                    }}
                    initialValues={{
                        image: '',
                        productName: '',
                        productType: '1',
                        productPrice: '',
                        productWeight: 1,
                        productDetail: '',
                        companyID: '00'
                    }}
                >
                    {({
                        checked,
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
                                <Col>
                                    <FormGroup style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Button
                                            onClick={this.toggleModalImage}
                                            style={{ height: 180, width: 180, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {values.image && (
                                                <img src={this.state.resizeImageUrl} style={{ height: 180, width: 180, borderRadius: 100 }} />
                                            )}
                                            {!values.image && (
                                                <div>
                                                    <BsImage size={65} />
                                                    <h6>คลิกเพื่อเพิ่มรูป</h6>
                                                </div>
                                            )

                                            }
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="productName">ชื่อสินค้า</Label>
                                        <Input
                                            maxLength={40}
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
                                        <Label for="productType">ชนิด</Label>
                                        <Input
                                            maxLength={10}
                                            type="select"
                                            name="productType"
                                            id="productType"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productType}
                                            invalid={errors.productType && touched.productType}
                                        >
                                            {this.state.elementProductType}
                                        </Input>
                                        <FormFeedback >*{errors.productType}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup >
                                        <Label for="productWeight">น้ำหนัก</Label>
                                        <Input
                                            maxLength={10}
                                            type="select"
                                            name="productWeight"
                                            id="productWeight"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productWeight}
                                            invalid={errors.productWeight && touched.productWeight}
                                        >
                                            <option value={1} >1 กิโลกรัม</option>
                                            <option value={5} >5 กิโลกรัม</option>
                                            <option value={15} >15 กิโลกรัม</option>
                                        </Input>
                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="productPrice">ราคาต่อหน่วย</Label>
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
                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="companyID">บริษัท</Label>
                                        <Input
                                            type="select"
                                            name="companyID"
                                            id="companyID"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.companyID}
                                            invalid={errors.companyID && touched.companyID}
                                        >
                                            {this.state.elementPartnerCompany}
                                        </Input>
                                        <FormFeedback >*{errors.companyID}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}/>
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

            </LoadingOverlay>
        );
    }
}

AddProduct.propTypes = {

};

export default AddProduct;
