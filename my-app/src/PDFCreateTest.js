import React from 'react';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import { Table, TableBody, TableHeader, TableCell, DataTableCell} from '@david.kucsai/react-pdf-table'

import font from './font/Prompt-Regular.ttf'

Font.register({ family: 'Roboto', src: font });


class InvoiceCreater extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            tableBorderWidth: 2
        }
    }

    renderInvoiceList=()=>{
        let componentList = []
        console.log(this.state.data);
        for(let x in this.state.data) {
            console.log(x);
            let num = parseInt(x)+1;
            componentList.push(
                // <TableBody>
                //     <TableCell weighting={0.09}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{x+1}</Text>
                //     </TableCell>
                //     <TableCell weighting={0.16}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{this.state.data[x].id}</Text>
                //     </TableCell>
                //     <TableCell weighting={0.16}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{this.state.data[x].pname}</Text>
                //     </TableCell>
                //     <TableCell weighting={0.15}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{this.state.data[x].pricePerUnit}</Text>
                //     </TableCell>
                //     <TableCell weighting={0.14}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{this.state.data[x].quantity}</Text>
                //     </TableCell>
                //     <TableCell weighting={0.13}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{this.state.data[x].discount}</Text>
                //     </TableCell>
                //     <TableCell weighting={0.14}>
                //         <Text style={{textAlign:'center', width:'100%'}}>{this.state.data[x].sum}</Text>
                //     </TableCell>
                // </TableBody>

                <View style={{borderTopColor:'black', 
                              borderTopWidth:this.state.tableBorderWidth, 
                              textAlign:'center', 
                              fontSize:11,
                              flexDirection:'row'}}>
                    <View style={{flex:0.09}}>
                        <Text>{num}</Text>    
                    </View>
                    <View style={{flex:0.16, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].id}</Text>
                    </View>
                    <View style={{flex:0.18, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{flex:0.15, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pricePerUnit}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].quantity}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].discount}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].sum}</Text>
                    </View>    
                </View>
            );
        }
        return(componentList);
    }

    render(){
        return(
            <Document title='PDFTEST'> 
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{marginTop:20, marginLeft:30, flex:0.7}}>
                            <Text style={{fontSize:25, fontWeight:'bold'}}>Company Name</Text>

                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Text style={{fontSize:14}}>99/99</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>หมู่ -- </Text>
                                <Text style={{fontSize:14, marginLeft:10}}>ตำบล ---- </Text>
                                <Text style={{fontSize:14, marginLeft:10}}>อำเภอ ---- </Text>
                                <Text style={{fontSize:14, marginLeft:10}}>จังหวัด ----- </Text>
                                <Text style={{fontSize:14, marginLeft:10}}>83000 </Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14}}>โทร 099-999-9999 </Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>ตำบล ---- </Text> */}
                            </View>
                        </View>
                        <View style={{flex:0.3, alignItems:'flex-end', marginTop:20, marginRight:30}}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{borderColor:'black', 
                                        borderWidth:2, 
                                        width:'100%', 
                                        alignItems:'center', 
                                        borderRadius:10}}>
                                <Text style={{fontSize:20, marginTop:5}}>ใบแจ้งหนี้</Text>
                                <Text style={{fontSize:20, marginBottom:5}}>Invoice</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', marginTop:10}}>
                        <View style={{marginLeft:30,
                                    flex:0.7}}>
                            <View style={{borderColor:'black',
                                    borderWidth:2,
                                    width:'97%'}}>
                                <Text style={{fontSize:13, marginLeft:14}}>รหัสสาขา 123</Text>
                                <Text style={{fontSize:13, marginLeft:14}}>ชื่อลูกค้า</Text>
                                <View style={{flexDirection:'row'}}> 
                                    <Text style={{fontSize:13, marginLeft:14}}>ที่อยู่ 12/12</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>หมู่ 9</Text> 
                                    <Text style={{fontSize:13, marginLeft:10}}>ต. -------</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>อ. -------</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>จ. -------</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>83000</Text>
                                </View>
                                <Text style={{fontSize:13, marginLeft:14}}>โทร 099-999-9999</Text>
                            </View>
                
                        </View>
                        <View style={{borderColor:'black',
                                    borderWidth:2, 
                                    marginRight:30, 
                                    flex:0.3}}>
                            <Text style={{fontSize:13, marginLeft:5}}>หมายเลขใบแจ้งหนี้ : 12123</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>วันที่ : 01/01/2564</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>ผู้รับผิดชอบ : </Text>
                            <Text style={{fontSize:13, marginLeft:5}}>วันครบกำหนด : 01/01/2564</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:30, marginRight:30}}>
                        <View style={{borderColor:'black', borderWidth:this.state.tableBorderWidth}}>
                            <View style={{flexDirection:'row', textAlign:'center', fontSize:13}}>
                                <View style={{flex:0.09}}>
                                    <Text>ลำดับ</Text>    
                                </View>
                                <View style={{flex:0.16, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>รหัสสินค้า</Text>
                                </View>
                                <View style={{flex:0.18, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>รายการสินค้า</Text>
                                </View>
                                <View style={{flex:0.15, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>ราคาต่อหน่วย</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>จำนวน</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>ส่วนลด</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>จำนวนเงิน</Text>
                                </View>
                                
                            </View>
                            {/*  ##  renderList   ## */}
                            <this.renderInvoiceList/>
                        </View>
                        <View style={{borderColor:'black', 
                                      borderWidth:this.state.tableBorderWidth, 
                                      marginTop:10, 
                                      width:'35%', 
                                      alignSelf:'flex-end',
                                      fontSize:13,
                                      textAlign:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    <Text>ราคารวมทั้งสิ้น</Text>
                                </View>
                                <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                    <Text>EIEI</Text>
                                </View>
                            </View>  

                            <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                <View style={{flex:1}}>
                                    <Text>ส่วนลด</Text>
                                </View>
                                <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                    <Text>EIEI</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                <View style={{flex:1}}>
                                    <Text>ราคารวมส่วนลด</Text>
                                </View>
                                <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                    <Text>EIEI</Text>
                                </View>
                            </View> 

                            <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                <View style={{flex:1}}>
                                    <Text>ภาษีมูลค่าเพิ่ม 7%</Text>
                                </View>
                                <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                    <Text>EIEI</Text>
                                </View>
                            </View> 

                            <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                <View style={{flex:1}}>
                                    <Text>จำนวนเงินรวมทั้งสิ้น</Text>
                                </View>
                                <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                    <Text>EIEI</Text>
                                </View>
                            </View>                         
                        </View>
                        
                    </View>
                </Page>
            </Document>        
        );
    }

    
}

// Create styles
const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      fontFamily:'Roboto'
    },
    section: {

    }
});
  


export {InvoiceCreater}

