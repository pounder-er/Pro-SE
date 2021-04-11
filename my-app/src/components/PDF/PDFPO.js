import React from 'react';

import { PDFViewer } from '@react-pdf/renderer';

import {POCreater, POCreaterV2} from './PDFCreater';

class PDFPO extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let data = [{id:'110100', pname:'ข้าวหอม ตราสส.', pricePerUnit: 250,quantity: 20,discount: 0,sum: 5000},
                    {id:'110200', pname:'ข้าวหอม ตรานานา', pricePerUnit: 100,quantity: 10,discount: 0,sum: 1000},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''},
                    {id:'', pname:'', pricePerUnit: '', quantity: '', discount: '', sum: ''}
                   ]
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
        
        // let poData = [{pname : 'ข้าวหอม ตราสส.', quantity : 20},
        //           {pname : 'ข้าวหอม ตรานานา', quantity : 10},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //           {pname : '', quantity : ''},
        //          ]
        let poData = this.props.data.log
        let poInfo = {
            id : this.props.data.InID,
            date : this.props.data.dateCreate,
            respName : this.props.data.res
        }
        let branchData = {
            branchID : this.props.data.companyID
        }

        return(
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <PDFViewer style={{width:'100%', height:'100vh', border:'none'}}>
                    <POCreaterV2 data={poData} 
                               branchData={branchData} 
                               companyData={companyData}
                               poInfo={poInfo}/>
                </PDFViewer>
            </div>

        );
    }
}

export default PDFPO;