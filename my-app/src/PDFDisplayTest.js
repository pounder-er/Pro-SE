import React from 'react';

import { PDFViewer } from '@react-pdf/renderer';

import {MyDocument} from './PDFCreateTest';

class PDFDisplayTest extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <PDFViewer style={{width:'100%', height:'100vh', border:'none'}}>
                    <MyDocument />
                </PDFViewer>
            </div>

        );
    }
}

export default PDFDisplayTest;