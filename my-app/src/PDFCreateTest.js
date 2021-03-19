import React from 'react';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import { Table, TableBody, TableHeader, TableCell} from '@david.kucsai/react-pdf-table'

import font from './font/Prompt-Regular.ttf'

Font.register({ family: 'Roboto', src: font });

// Create styles
const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      fontFamily:'Roboto'
    },
    section: {

    }
  });
  
// Create Document Component
const MyDocument = () => (
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
            {/* <View>
                <View style={{borderColor:'black', borderWidth:1}}>
                    <Text>EIEI</Text>
                </View>
                <View style={{borderColor:'black', borderWidth:1}}>
                    <Text>EIEI</Text>
                </View>
            </View> */}
            <Table>
                <TableHeader>
                    <TableCell>
                        First Name
                    </TableCell>
                    <TableCell>
                        Last Name
                    </TableCell>
                    <TableCell>
                        DOB
                    </TableCell>
                    <TableCell>
                        Country
                    </TableCell>
                    <TableCell>
                        Phone Number
                    </TableCell>
                </TableHeader>
            </Table>
        </View>
      </Page>
    </Document>
);

export {MyDocument}

