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
            <div>

            </div >
        );
    }
}

EditCalculate.propTypes = {
    product: PropTypes.object
};

export default EditCalculate;