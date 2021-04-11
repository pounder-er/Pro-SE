import React from 'react';

import { PDFViewer } from '@react-pdf/renderer';

import {InvoiceCreater, ReceiptCreater, POCreater} from './PDFCreater';
import { BsThreeDotsVertical } from 'react-icons/bs';

class PDFInvoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        console.log(this.props.data)
    }

    render(){
        // let data = [{id:'110100', pname:'ข้าวหอม ตราสส.', pricePerUnit: 250,quantity: 20,discount: 0,sum: 5000},
        //             {id:'110200', pname:'ข้าวหอม ตรานานา', pricePerUnit: 100,quantity: 10,discount: 0,sum: 1000},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //             {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
        //            ]
        let data = this.props.data.log
        // let branchData = {branchID : '1234',
        //                   cusName : 'จอห์นวิค สมุทรปราการ',
        //                   address : '123/12',
        //                   moo : '-',
        //                   sub_district : 'ตลาดใหญ่',
        //                   district : 'เมือง',
        //                   provide : 'ภูเก็ต',
        //                   zipCode : '83000',
        //                   tel : '099-999-9999'
        // }
        
        let companyData = {
                           comName : 'จอห์นวิค สมุทรปราการ',
                           address : '123/12',
                           moo : '-',
                           sub_district : 'ตลาดใหญ่',
                           district : 'เมือง',
                           provide : 'ภูเก็ต',
                           zipCode : '83000',
                           tel : '099-999-9999'
        }   
        
        let poData = [{pname : 'ข้าวหอม ตราสส.', quantity : 20},
                  {pname : 'ข้าวหอม ตรานานา', quantity : 10},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                  {pname : '', quantity : ''},
                 ]
        let invInfo ={
            id : this.props.data.InID,
            date : this.props.data.dateCreate,
            resp : this.props.data.res
        }

        let branchData = {
            branchID : this.props.data.branchID
        }
        return(
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <PDFViewer style={{width:'100%', height:'100vh', border:'none'}}>
                    <InvoiceCreater data={data} 
                                    branchData={branchData} 
                                    companyData={companyData}
                                    invInfo={invInfo}/>
                </PDFViewer>
            </div>

        );
    }
}

export default PDFInvoice;