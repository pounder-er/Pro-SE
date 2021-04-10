import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { i18n } from '../i18n';
import {
    Link,
} from 'react-router-dom';
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
import { connect } from 'react-redux';

import AvatarEditor from 'react-avatar-editor';

import fire_base from '../../firebase/Firebase';

import LoadingOverlay from 'react-loading-overlay';

import Resizer from 'react-image-file-resizer';

import swal from 'sweetalert';

import { BsImage } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

const formPo = Yup.object().shape({
    branchID: Yup.string()
        .required('ต้องกรอก'),

    productID: Yup.string()
        .required('ต้องกรอก'),

    volume: Yup.number()
        .required('ต้องกรอก'),

    disCount: Yup.number()
        .required('ต้องกรอก'),

    productPrice: Yup.number()
        .required('ต้องกรอก'),

})

const filterValue = [
    { name: 'productID', operator: 'startsWith', type: 'string', },
    { name: 'productName', operator: 'startsWith', type: 'string', },
    { name: 'productPrice', operator: 'startsWith', type: 'string', },
    { name: 'volume', operator: 'startsWith', type: 'string', },
    { name: 'disCount', operator: 'startsWith', type: 'string', },


];

const columns = [
    { name: 'productID', header: 'หมายเลขสินค้า', defaultVisible: true, groupBy: false },
    { name: 'productName', groupBy: false, defaultFlex: 1, header: 'รายการสินค้า' },
    { name: 'productPrice', groupBy: false, defaultFlex: 1, header: 'ราคาสินค้าต่อหน่วย' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'จำนวน' },
    { name: 'disCount', groupBy: false, defaultFlex: 1, header: 'ส่วนลด' },
    { name: 'summary', groupBy: false, defaultFlex: 1, header: 'ลบ' },

]

class So extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementBranch: [],
            elementProduct: [],
            dataSource: [],
            log: [],
            branchCheck: false,

        }
        this.product = []
        this.branchID = "00"
    }

    async componentDidMount() {
        await fire_base.getAllBranch(this.getBranchSuccess, this.unSuccess)
        await fire_base.getAllProduct(this.getAllProductSuccess, this.unSuccess);


    }

    getBranchSuccess = (querySnapshot) => {
        let element = [];
        querySnapshot.forEach((doc) => {
            let e = <option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().branchName}</option>
            element.push(e);
        })
        this.setState({ elementBranch: element });
        // console.log(element);
    }

    getAllProductSuccess = (querySnapshot) => {
        let element = [], l = [];
        querySnapshot.forEach((doc) => {
            let d = doc.data();
            let e = <option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.data().productName}</option>
            d.id = doc.id;
            l.push(d);
            element.push(e);
        })
        this.setState({ elementProduct: element });
        this.product = l;
        // console.log(element);
    }

    sweetAlret(title, text, icon, button) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: button,
        })
    }

    unSuccess = (error) => {
        console.log(error);
        this.sweetAlret('ล้มเหลว', 'สินค้าไม่เพียงพอ', 'error', 'ตกลง');
    }

    addPOSuccess = () => {

    }

    uploadTodb = () => {
        let data = {
            log: this.state.log,
            status: 'รอชำระเงิน',
            branchID: this.branchID,
            res: this.props.userProfile.firstName + " " + this.props.userProfile.lastName
        }
        // let llog = []
        console.log(data)
        // for(let x of this.state.log){           
        //     let b = this.product.find((doc,index)=>{
        //         if(doc.id == x.productID){
        //             return true;
        //         }
        //     });

        //     llog.push(b)
        // }

        fire_base.addSO(data, this.addPOSuccess, this.unSuccess)
    }

    render() {

        return (
            <div>
                <Formik
                    validationSchema={formPo}
                    onSubmit={async (values, { resetForm }) => {

                        let b = this.product.find((doc, index) => {
                            if (doc.id == values.productID) {
                                return true;
                            }
                        });
                        let c = this.state.log.find((doc, index) => {
                            if (doc.productID == values.productID) {
                                return true;
                            }
                        });
                        // console.log(this.product);
                        if (c != undefined) {
                            // console.log('555');
                            c.volume += values.volume;
                            if (b.productTotal - c.volume < 0) {
                                this.sweetAlret('สินค้าไม่เพียงพอ', 'สินค้าเหลือ' + b.productTotal, 'warning', 'ตกลง');
                            } else {
                                this.setState({ log: this.state.log.concat([]) });
                            }
                        } else {
                            // console.log(b,values.volume);
                            if (b.productTotal - values.volume < 0) {

                                this.sweetAlret('สินค้าไม่เพียงพอ', 'สินค้าเหลือ' + b.productTotal, 'warning', 'ตกลง');
                            } else {
                                let a = {}

                                // console.log('kkk',b)
                                a.productName = b.productName
                                a.volume = values.volume
                                a.productID = values.productID
                                a.productPrice = values.productPrice
                                a.disCount = values.disCount
                                // console.log(a)  
                                this.setState({ log: this.state.log.concat(a) })

                            }
                        }


                        // if()


                        // this.state.branchCheck = true
                        // let g = true

                        // if(this.state.log)
                        // {
                        //     for(let x of this.state.log)
                        //     {
                        //         if(x.productID == values.productID)
                        //         {
                        //             x.volume += values.volume
                        //             g = !g
                        //             this.setState({log : this.state.log.concat([])})
                        //         }
                        //     }
                        // }
                        // if(g)
                        // {
                        //     let a ={}

                        //     // console.log('kkk',b)
                        //     a.productName = b.productName
                        //     a.volume = values.volume
                        //     a.productID = values.productID
                        //     a.productPrice = values.productPrice
                        //     a.disCount = values.disCount
                        //     // console.log(a)  
                        //     this.setState({log : this.state.log.concat(a)})
                        // }
                        // else
                        // console.log("cccc")


                    }}
                    initialValues={{
                        productName: '',
                        productID: '300000',
                        productPrice: 1,
                        branchID: '00',
                        volume: 1,
                        disCount: 0
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
                        <Form onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); handleReset(e); }} >
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="branchID">สาขา</Label>
                                        <Input
                                            disabled={this.state.branchCheck}
                                            readOnly={this.state.branchCheck}
                                            type="select"
                                            name="branchID"
                                            id="branchID"
                                            onChange={(e) => {
                                                handleChange(e);
                                                // let element = []
                                                this.branchID = e.target.value;
                                                // let d = this.product.filter(doc=>{
                                                //     if(doc.companyID == e.target.value){
                                                //         this.companyID = e.target.value;
                                                //         return true;
                                                //     }
                                                // })
                                                // // console.log(e.target.value)
                                                // d.forEach(doc=>{
                                                //     element.push(<option key={doc.id} value={doc.id}>{doc.id + ' : ' + doc.productName}</option>);
                                                // })
                                                // this.setState({elementProduct:element});
                                                // console.log(values.companyID)

                                            }}
                                            onBlur={handleBlur}
                                            value={values.branchID}
                                            invalid={errors.branchID && touched.branchID}
                                        >
                                            {this.state.elementBranch}
                                        </Input>
                                        <FormFeedback >*{errors.branchID}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6} />
                                <Col md={4} >
                                    <FormGroup>
                                        <Label for="productID">สินค้า</Label>
                                        <Input
                                            type="select"
                                            name="productID"
                                            id="productID"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productID}
                                            invalid={errors.productID && touched.productID}
                                        >
                                            {this.state.elementProduct}
                                        </Input>
                                        <FormFeedback >*{errors.productID}</FormFeedback>
                                    </FormGroup>
                                </Col>

                                <Col md={4} >
                                    <FormGroup>
                                        <Label for="volume">จำนวน</Label>
                                        <Input
                                            type="number"
                                            name="volume"
                                            id="volume"
                                            min={1}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.volume}
                                            onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/, ''); handleChange(e); }}
                                            invalid={errors.volume && touched.volume}
                                        >
                                        </Input>
                                        <FormFeedback >*{errors.volume}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={4} ></Col>
                                <Col md={4} >
                                    <FormGroup>
                                        <Label for="productPrice">ราคาต่อชิ้น</Label>
                                        <Input
                                            type="number"
                                            name="productPrice"
                                            id="productPrice"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productPrice}
                                            invalid={errors.productPrice && touched.productPrice}
                                        >
                                        </Input>
                                        <FormFeedback >*{errors.productPrice}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={4} >
                                    <FormGroup>
                                        <Label for="disCount">ส่วนลด</Label>
                                        <Input
                                            type="number"
                                            name="disCount"
                                            id="disCount"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.disCount}
                                            invalid={errors.disCount && touched.disCount}
                                        >
                                        </Input>
                                        <FormFeedback >*{errors.disCount}</FormFeedback>
                                    </FormGroup>
                                </Col>

                                <Col md={2} style={{ display: 'flex' }}>
                                    <FormGroup style={{ display: 'flex', flex: 1 }}>
                                        <Button type="submit" color="success" style={{ flex: 1, height: 40, marginTop: '30px' }}>บันทึก</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>


                    )}
                </Formik>
                <Row style={{ marginTop: '20px' }}>
                    <ReactDataGrid
                        onReady={this.setDataGridRef}
                        i18n={i18n}
                        idProperty="id"
                        columns={columns}
                        pagination
                        defaultLimit={10}
                        defaultSkip={10}
                        pageSizes={[10, 15, 30]}
                        dataSource={this.state.log}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                        style={{ minHeight: 400 }}
                    />
                </Row>
                <Row form style={{ marginTop: '30px' }}>
                    <Col md={8} />
                    <Col md={2} style={{ display: 'flex' }}>
                        <FormGroup style={{ display: 'flex', flex: 1 }}>
                            <Button type="reset" color="secondary" style={{ flex: 1 }}>เคลียร์</Button>
                        </FormGroup>
                    </Col>
                    <Col md={2} style={{ display: 'flex' }}>
                        <FormGroup style={{ display: 'flex', flex: 1 }}>
                            
                                <Button onClick={this.uploadTodb} type="submit" color="success" style={{ flex: 1 }}>บันทึก</Button>
                            
                        </FormGroup>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md={6} >
                        <FormGroup>
                            <Label>บริษัท</Label>
                                <Input type="select">
                                    {this.state.elementPartnerCompany}
                                </Input>
                            
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} >
                        <FormGroup>
                            <Label>สินค้า</Label>
                            <Input type="select">
                                {this.state.elementPartnerCompany}
                            </Input>
                            
                        </FormGroup>
                    </Col>
                </Row> */}

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        session: state.session,
        userProfile: state.userProfile
    }
}
export default connect(mapStateToProps)(So);
