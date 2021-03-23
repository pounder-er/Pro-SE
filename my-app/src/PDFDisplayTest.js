import React from 'react';

import { PDFViewer } from '@react-pdf/renderer';

import {InvoiceCreater} from './PDFCreateTest';

class PDFDisplayTest extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let data = [{id:'110100', pname:'ข้าวหอม ตราสส.', pricePerUnit: 250,quantity: 20,discount: '-',sum: 5000},
                    {id:'110200', pname:'ข้าวหอม ตรานานา', pricePerUnit: 100,quantity: 10,discount: '-',sum: 1000},
                    {id:'', pname:'', pricePerUnit: 0,quantity: 0,discount: '-',sum: 0}
                   ]
        return(
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <PDFViewer style={{width:'100%', height:'100vh', border:'none'}}>
                    <InvoiceCreater data={data} />
                </PDFViewer>
            </div>

        );
    }
}

export default PDFDisplayTest;