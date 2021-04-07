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

class EditCalculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                    
                </Row>
            </Container>


        );
    }
}

EditCalculate.propTypes = {
    product: PropTypes.object
};

export default EditCalculate;