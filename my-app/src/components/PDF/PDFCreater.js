import React from 'react';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import { Table, TableBody, TableHeader, TableCell, DataTableCell } from '@david.kucsai/react-pdf-table'

import font from './font/Prompt-Regular.ttf'
import { isThisTypeNode } from 'typescript';

Font.register({ family: 'Prompt', src: font });


class InvoiceCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            tableBorderWidth: 2,
            sum: 0,
            discount: 0,
            tax: 0,
            total: 0,
            list: []
        }

        this.list = []
        this.sum = 0
        this.discount = 0
        this.tax = 0
        this.total = 0

    }

    componentDidMount() {
        let tempSum = 0;
        let tempDiscount = 0;
        for (let x of this.state.data) {
            // console.log(x);
            tempSum += x.sum;
            tempDiscount += x.discount;
        }
        this.sum = tempSum;
        this.discount = tempDiscount;
        // console.log(this.state.sum)
        let tempTax = ((tempSum - tempDiscount) * 7) / 100
        let tempTotal = (tempSum - tempDiscount) + tempTax
        this.tax = tempTax;
        this.total = tempTotal;

        this.renderAllPage();
    }

    sliceData = () => {
        console.log(this.props.data)
        if (this.props.data.length > 10) {
            for (let i = 0; i < this.props.data.length; i += 10) {
                let slice_data = this.props.data.slice(i, i + 10)
                this.setState({ list: this.state.list.concat([this.renderInvoiceListV2(slice_data)]) });
            }
        } else {
            this.setState({ list: this.state.list.concat([this.renderInvoiceListV2(this.state.data)]) });
        }
    }

    renderAllPage = () => {
        // this.sliceData()
        let c_list = []
        console.log(this.props.data.length)
        if (this.props.data.length > 10) {
            for (let i = 0; i < this.props.data.length; i += 10) {
                let slice_data = this.props.data.slice(i, i + 10)
                console.log('sliceeeeee', slice_data)
                // this.setState({list : this.state.list.concat([this.renderInvoiceListV2(slice_data)])});
                c_list.push(this.renderInvoiceListV2(slice_data))
            }
        } else {
            // let temp = this.state.list.concat([this.renderInvoiceListV2(this.state.data)])
            // this.setState({list : temp});
            c_list.push(this.renderInvoiceListV2(this.state.data))

        }
        console.log(c_list.length)
        let pageList = []
        for (let idx in c_list) {

            pageList.push(
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ marginTop: 20, marginLeft: 30, flex: 0.7 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.companyData.comName}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 14 }}>99/99</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>หมู่ {this.props.companyData.moo}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>ตำบล {this.props.companyData.sub_district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>อำเภอ {this.props.companyData.district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>จังหวัด {this.props.companyData.provide}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>โทร {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>ตำบล ---- </Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 20, marginRight: 30 }}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text style={{ fontSize: 20, marginTop: 5 }}>ใบแจ้งหนี้</Text>
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>Invoice</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{
                            marginLeft: 30,
                            flex: 0.7
                        }}>
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '97%'
                            }}>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}>สาขา {this.props.branchData.branchID}</Text>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.cusName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.address}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.moo}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.sub_district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.provide}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>{this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.tel}</Text>
                            </View>

                        </View>
                        <View style={{
                            borderColor: 'black',
                            borderWidth: 2,
                            marginRight: 30,
                            flex: 0.3
                        }}>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>หมายเลขใบแจ้งหนี้ : {this.props.invInfo.id}</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>วันที่ : {this.props.invInfo.date}</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>ผู้รับผิดชอบ : {this.props.invInfo.resp}</Text>
                            {/* <Text style={{ fontSize: 13, marginLeft: 5 }}>วันครบกำหนด : 01/01/2564</Text> */}
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 30, marginRight: 30 }}>
                        <View style={{ borderColor: 'black', borderWidth: this.state.tableBorderWidth }}>
                            <View style={{ flexDirection: 'row', textAlign: 'center', fontSize: 13 }}>
                                <View style={{ flex: 0.09 }}>
                                    <Text>ลำดับ</Text>
                                </View>
                                <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>รหัสสินค้า</Text>
                                </View>
                                <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>รายการสินค้า</Text>
                                </View>
                                <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>ราคาต่อหน่วย</Text>
                                </View>
                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>จำนวน</Text>
                                </View>
                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>ส่วนลด</Text>
                                </View>
                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>จำนวนเงิน</Text>
                                </View>

                            </View>
                            {/*  ##  renderList   ## */}
                            {/* <this.renderInvoiceList/> */}
                            {/* {this.state.list[idx]} */}
                            {/* {this.renderInvoiceListV2} */}
                            {/* <this.renderInvoiceListV2/> */}
                            {/* <c_list/> */}
                            {c_list[idx]}
                        </View>
                        {(idx == c_list.length - 1) &&
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 90, textAlign: 'center', alignSelf: 'center' }}>
                                        <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
                                            <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้มีอำนาจ</Text>
                                        </View>
                                        <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
                                            <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับผิดชอบการขาย</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <View style={{
                                        borderColor: 'black',
                                        borderWidth: this.state.tableBorderWidth,
                                        marginTop: 10,
                                        width: '70%',
                                        alignSelf: 'flex-end',
                                        fontSize: 13,
                                        textAlign: 'center'
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>ราคารวมทั้งสิ้น</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.sum}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>ส่วนลด</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.discount}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>ราคารวมส่วนลด</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.sum - this.discount}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>ภาษีมูลค่าเพิ่ม 7%</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.tax}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>จำนวนเงินรวมทั้งสิ้น</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.total}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>





                            </View>
                        }
                    </View>
                </Page>
            )

        }

        // return(pageList);
        this.list = pageList;
    }

    renderInvoiceListV2 = (list) => {
        // this.sliceData()
        // let list = this.state.list
        // console.log("listtt",list)
        let componentList = []
        // console.log(this.state.data);
        console.log('fromV2222222', list)
        for (let x in list) {
            console.log('dataaa', x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productID.id}</Text>
                    </View>
                    <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productName}</Text>
                    </View>
                    <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productPrice}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].volume}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].disCount}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{(list[x].productPrice * list[x].volume)-list[x].disCount}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    renderInvoiceList = () => {
        let componentList = []
        console.log(this.state.data);

        for (let x in this.state.data) {
            console.log(x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].id}</Text>
                    </View>
                    <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pricePerUnit}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].volume}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].discount}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].sum}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    render() {
        return (
            <Document title='PDFTEST'>
                {/* <this.renderAllPage/> */}
                {this.list}


            </Document>
        );
    }


}

class ReceiptCreaterV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            tableBorderWidth: 2,
            sum: 0,
            discount: 0,
            tax: 0,
            total: 0,
            list: []
        }

        this.list = []
        this.sum = this.props.sum
        this.discount = 0
        this.tax = 0
        this.total = 0
        console.log(this.props.invInfo)
    }

    componentDidMount() {
        let tempSum = 0;
        let tempDiscount = 0;
        for (let x of this.state.data) {
            // console.log(x);
            tempSum += x.sum;
            tempDiscount += x.discount;
        }
        this.sum = tempSum;
        this.discount = tempDiscount;
        // console.log(this.state.sum)
        let tempTax = ((tempSum - tempDiscount) * 7) / 100
        let tempTotal = (tempSum - tempDiscount) + tempTax
        this.tax = tempTax;
        this.total = tempTotal;

        this.renderAllPage();

    
    }

    sliceData = () => {
        console.log(this.props.data)
        if (this.props.data.length > 10) {
            for (let i = 0; i < this.props.data.length; i += 10) {
                let slice_data = this.props.data.slice(i, i + 10)
                this.setState({ list: this.state.list.concat([this.renderInvoiceListV2(slice_data)]) });
            }
        } else {
            this.setState({ list: this.state.list.concat([this.renderInvoiceListV2(this.state.data)]) });
        }
    }

    renderAllPage = () => {
        // this.sliceData()
        let c_list = []
        console.log(this.props.data.length)
        if (this.props.data.length > 10) {
            for (let i = 0; i < this.props.data.length; i += 10) {
                let slice_data = this.props.data.slice(i, i + 10)
                console.log('sliceeeeee', slice_data)
                // this.setState({list : this.state.list.concat([this.renderInvoiceListV2(slice_data)])});
                c_list.push(this.renderInvoiceListV2(slice_data))
            }
        } else {
            // let temp = this.state.list.concat([this.renderInvoiceListV2(this.state.data)])
            // this.setState({list : temp});
            c_list.push(this.renderInvoiceListV2(this.state.data))

        }
        console.log(c_list.length)
        let pageList = []
        for (let idx in c_list) {

            pageList.push(
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ marginTop: 20, marginLeft: 30, flex: 0.7 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.companyData.comName}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 14 }}>99/99</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>หมู่ {this.props.companyData.moo}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>ตำบล {this.props.companyData.sub_district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>อำเภอ {this.props.companyData.district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>จังหวัด {this.props.companyData.provide}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>โทร {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>ตำบล ---- </Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 20, marginRight: 30 }}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text style={{ fontSize: 20, marginTop: 5 }}>ใบเสร็จรับเงิน</Text>
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>Receipt</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{
                            marginLeft: 30,
                            flex: 0.7
                        }}>
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '97%'
                            }}>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}>สาขา {this.props.branchData.branchID}</Text>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.cusName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.address}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.moo}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.sub_district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.provide}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>{this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.tel}</Text>
                            </View>

                        </View>
                        <View style={{
                            borderColor: 'black',
                            borderWidth: 2,
                            marginRight: 30,
                            flex: 0.3
                        }}>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>หมายเลขใบแจ้งหนี้ : {this.props.invInfo.id}</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>วันที่ : {this.props.invInfo.date}</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>ผู้รับผิดชอบ : {this.props.invInfo.resp}</Text>
                            {/* <Text style={{ fontSize: 13, marginLeft: 5 }}>วันครบกำหนด : 01/01/2564</Text> */}
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 30, marginRight: 30 }}>
                        <View style={{ borderColor: 'black', borderWidth: this.state.tableBorderWidth }}>
                            <View style={{ flexDirection: 'row', textAlign: 'center', fontSize: 13 }}>
                                <View style={{ flex: 0.09 }}>
                                    <Text>ลำดับ</Text>
                                </View>
                                <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>รหัสสินค้า</Text>
                                </View>
                                <View style={{ flex: 0.32, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>รายการสินค้า</Text>
                                </View>
                                <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>ราคาต่อหน่วย</Text>
                                </View>
                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>จำนวน</Text>
                                </View>
                                
                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>จำนวนเงิน</Text>
                                </View>

                            </View>
                            {/*  ##  renderList   ## */}
                            {/* <this.renderInvoiceList/> */}
                            {/* {this.state.list[idx]} */}
                            {/* {this.renderInvoiceListV2} */}
                            {/* <this.renderInvoiceListV2/> */}
                            {/* <c_list/> */}
                            {c_list[idx]}
                        </View>
                        {(idx == c_list.length - 1) &&
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 60, textAlign: 'center', alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
                                                <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้จ่ายเงิน</Text>
                                            </View>
                                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
                                                <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับเงิน</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 45 }}>
                                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
                                                <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้ส่งสินค้า</Text>
                                            </View>
                                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
                                                <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับสินค้า</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{
                                        borderColor: 'black',
                                        borderWidth: this.state.tableBorderWidth,
                                        marginTop: 10,
                                        width: '70%',
                                        alignSelf: 'flex-end',
                                        fontSize: 13,
                                        textAlign: 'center'
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>ราคารวมทั้งสิ้น</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.sum}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>ภาษีมูลค่าเพิ่ม 7%</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.tax}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>จำนวนเงินรวมทั้งสิ้น</Text>
                                            </View>
                                            <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                                <Text>{this.total}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </Page>
            )

        }

        // return(pageList);
        this.list = pageList;
    }

    renderInvoiceListV2 = (list) => {
        // this.sliceData()
        // let list = this.state.list
        // console.log("listtt",list)
        let componentList = []
        // console.log(this.state.data);
        console.log('fromV2222222', list)
        for (let x in list) {
            console.log('dataaa', x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productID.id}</Text>
                    </View>
                    <View style={{ flex: 0.32, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productName}</Text>
                    </View>
                    <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productPrice}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].volume}</Text>
                    </View>
                    
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].volume * list[x].productPrice}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    renderInvoiceList = () => {
        let componentList = []
        console.log(this.state.data);

        for (let x in this.state.data) {
            console.log(x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].id}</Text>
                    </View>
                    <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pricePerUnit}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].volume}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].discount}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].sum}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    render() {
        return (
            <Document title='PDFTEST'>
                {/* <this.renderAllPage/> */}
                {this.list}


            </Document>
        );
    }


}


class POCreaterV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            tableBorderWidth: 2,
            sum: 0,
            discount: 0,
            tax: 0,
            total: 0,
            list: []
        }

        this.list = []
        this.sum = 0
        this.discount = 0
        this.tax = 0
        this.total = 0

    }

    componentDidMount() {
        let tempTotal = 0
        for (let x of this.state.data) {
            console.log(x);
            tempTotal += x.volume
        }
        this.total = tempTotal
        this.renderAllPage();
    }

    sliceData = () => {
        console.log(this.props.data)
        if (this.props.data.length > 10) {
            for (let i = 0; i < this.props.data.length; i += 10) {
                let slice_data = this.props.data.slice(i, i + 10)
                this.setState({ list: this.state.list.concat([this.renderInvoiceListV2(slice_data)]) });
            }
        } else {
            this.setState({ list: this.state.list.concat([this.renderInvoiceListV2(this.state.data)]) });
        }
    }

    renderAllPage = () => {
        // this.sliceData()
        let c_list = []
        console.log(this.props.data.length)
        if (this.props.data.length > 10) {
            for (let i = 0; i < this.props.data.length; i += 10) {
                let slice_data = this.props.data.slice(i, i + 10)
                console.log('sliceeeeee', slice_data)
                // this.setState({list : this.state.list.concat([this.renderInvoiceListV2(slice_data)])});
                c_list.push(this.renderInvoiceListV2(slice_data))
            }
        } else {
            // let temp = this.state.list.concat([this.renderInvoiceListV2(this.state.data)])
            // this.setState({list : temp});
            c_list.push(this.renderInvoiceListV2(this.state.data))

        }
        console.log(c_list.length)
        let pageList = []
        for (let idx in c_list) {

            pageList.push(
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ marginTop: 20, marginLeft: 30, flex: 0.7 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.companyData.comName}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 14 }}>99/99</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>หมู่ {this.props.companyData.moo}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>ตำบล {this.props.companyData.sub_district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>อำเภอ {this.props.companyData.district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>จังหวัด {this.props.companyData.provide}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>โทร {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>ตำบล ---- </Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 20, marginRight: 30 }}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text style={{ fontSize: 20, marginTop: 5 }}>ใบสั่งซื้อ</Text>
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>Purchase Orders</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{
                            marginLeft: 30,
                            flex: 0.7
                        }}>
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '97%'
                            }}>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}>ผู้ขาย {this.props.branchData.branchID}</Text>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.cusName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.address}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.moo}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.sub_district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.provide}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}> {this.props.branchData.tel}</Text>
                            </View>

                        </View>
                        <View style={{
                            borderColor: 'black',
                            borderWidth: 2,
                            marginRight: 30,
                            flex: 0.3
                        }}>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>หมายเลขใบสั่งซื้อ : {this.props.poInfo.id}</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>วันที่ : {this.props.poInfo.date}</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>ผู้รับผิดชอบ : {this.props.poInfo.respName}</Text>
                            {/* <Text style={{ fontSize: 13, marginLeft: 5 }}>วันครบกำหนด : 01/01/2564</Text> */}
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 30, marginRight: 30 }}>
                        <View style={{ borderColor: 'black', borderWidth: this.state.tableBorderWidth }}>
                            <View style={{ flexDirection: 'row', textAlign: 'center', fontSize: 13 }}>
                                <View style={{ flex: 0.09 }}>
                                    <Text>ลำดับ</Text>
                                </View>

                                <View style={{ flex: 0.77, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>รายการสินค้า</Text>
                                </View>

                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>จำนวน</Text>
                                </View>

                            </View>
                            {/*  ##  renderList   ## */}
                            {/* <this.renderInvoiceList/> */}
                            {/* {this.state.list[idx]} */}
                            {/* {this.renderInvoiceListV2} */}
                            {/* <this.renderInvoiceListV2/> */}
                            {/* <c_list/> */}
                            {c_list[idx]}
                        </View>
                        {(idx == c_list.length - 1) &&
                            <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginTop: 90, textAlign: 'center', alignSelf: 'center' }}>
                                    <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
                                        <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้มีอำนาจ</Text>
                                    </View>
                                    <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
                                        <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับตรวจสอบ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{
                                    borderColor: 'black',
                                    borderWidth: this.state.tableBorderWidth,
                                    marginTop: 10,
                                    width: '70%',
                                    alignSelf: 'flex-end',
                                    fontSize: 13,
                                    textAlign: 'center'
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text>จำนวนรวมทั้งสิ้น</Text>
                                        </View>
                                        <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                            <Text>{this.total}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        }
                    </View>
                </Page>
            )

        }

        // return(pageList);
        this.list = pageList;
    }

    renderInvoiceListV2 = (list) => {
        // this.sliceData()
        // let list = this.state.list
        // console.log("listtt",list)
        let componentList = []
        // console.log(this.state.data);
        console.log('fromV2222222', list)
        for (let x in list) {
            console.log('dataaa', x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.77, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].productName}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{list[x].volume}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    renderInvoiceList = () => {
        let componentList = []
        console.log(this.state.data);

        for (let x in this.state.data) {
            console.log(x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].id}</Text>
                    </View>
                    <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pricePerUnit}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].volume}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].discount}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].sum}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    render() {
        return (
            <Document title='PDFTEST'>
                {/* <this.renderAllPage/> */}
                {this.list}


            </Document>
        );
    }


}
// class ReceiptCreater extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: this.props.data,
//             tableBorderWidth: 2,
//             sum: 0,
//             discount: 0,
//             tax: 0,
//             total: 0
//         }

//     }

//     componentDidMount() {
//         let tempSum = 0;
//         let tempDiscount = 0;
//         for (let x of this.state.data) {
//             console.log(x);
//             tempSum += x.sum;
//             tempDiscount += x.discount;
//         }
//         this.setState({ sum: tempSum });
//         this.setState({ discount: tempDiscount });
//         console.log(this.state.sum)
//         let tempTax = ((tempSum - tempDiscount) * 7) / 100
//         let tempTotal = (tempSum - tempDiscount) + tempTax
//         this.setState({ tax: tempTax });
//         this.setState({ total: tempTotal });
//     }

//     renderInvoiceList = () => {
//         let componentList = []
//         console.log(this.state.data);

//         for (let x in this.state.data) {
//             console.log(x);
//             let num = parseInt(x) + 1;

//             componentList.push(
//                 <View style={{
//                     borderTopColor: 'black',
//                     borderTopWidth: this.state.tableBorderWidth,
//                     textAlign: 'center',
//                     fontSize: 11,
//                     flexDirection: 'row'
//                 }}>
//                     <View style={{ flex: 0.09 }}>
//                         <Text>{num}</Text>
//                     </View>
//                     <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                         <Text>{this.state.data[x].id}</Text>
//                     </View>
//                     <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                         <Text>{this.state.data[x].pname}</Text>
//                     </View>
//                     <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                         <Text>{this.state.data[x].pricePerUnit}</Text>
//                     </View>
//                     <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                         <Text>{this.state.data[x].volume}</Text>
//                     </View>
//                     <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                         <Text>{this.state.data[x].discount}</Text>
//                     </View>
//                     <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                         <Text>{this.state.data[x].sum}</Text>
//                     </View>
//                 </View>
//             );

//         }
//         return (componentList);
//     }

//     render() {
//         return (
//             <Document title='PDFTEST'>
//                 <Page size="A4" style={styles.page} orientation='landscape'>
//                     <View style={{ flexDirection: 'row', width: '100%' }}>
//                         <View style={{ marginTop: 20, marginLeft: 30, flex: 0.7 }}>
//                             <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.companyData.comName}</Text>

//                             <View style={{ flexDirection: 'row', marginTop: 5 }}>
//                                 <Text style={{ fontSize: 14 }}>99/99</Text>
//                                 <Text style={{ fontSize: 14, marginLeft: 10 }}>หมู่ {this.props.companyData.moo}</Text>
//                                 <Text style={{ fontSize: 14, marginLeft: 10 }}>ตำบล {this.props.companyData.sub_district}</Text>
//                                 <Text style={{ fontSize: 14, marginLeft: 10 }}>อำเภอ {this.props.companyData.district}</Text>
//                                 <Text style={{ fontSize: 14, marginLeft: 10 }}>จังหวัด {this.props.companyData.provide}</Text>
//                                 <Text style={{ fontSize: 14, marginLeft: 10 }}>{this.props.companyData.zipCode}</Text>
//                             </View>

//                             <View style={{ flexDirection: 'row' }}>
//                                 <Text style={{ fontSize: 14 }}>โทร {this.props.companyData.tel}</Text>
//                                 {/* <Text style={{fontSize:15, marginLeft:10}}>ตำบล ---- </Text> */}
//                             </View>
//                         </View>
//                         <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 20, marginRight: 30 }}>
//                             {/* <Text>Section #2</Text> */}
//                             <View style={{
//                                 borderColor: 'black',
//                                 borderWidth: 2,
//                                 width: '100%',
//                                 alignItems: 'center',
//                                 borderRadius: 10
//                             }}>
//                                 <Text style={{ fontSize: 20, marginTop: 5 }}>ใบเสร็จรับเงิน</Text>
//                                 <Text style={{ fontSize: 20, marginBottom: 5 }}>Receipt</Text>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ flexDirection: 'row', marginTop: 10 }}>
//                         <View style={{
//                             marginLeft: 30,
//                             flex: 0.7
//                         }}>
//                             <View style={{
//                                 borderColor: 'black',
//                                 borderWidth: 2,
//                                 width: '97%'
//                             }}>
//                                 <Text style={{ fontSize: 13, marginLeft: 14 }}>รหัสสาขา {this.props.branchData.branchID}</Text>
//                                 <Text style={{ fontSize: 13, marginLeft: 14 }}>ชื่อลูกค้า {this.props.branchData.cusName}</Text>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     <Text style={{ fontSize: 13, marginLeft: 14 }}>ที่อยู่ {this.props.branchData.address}</Text>
//                                     <Text style={{ fontSize: 13, marginLeft: 10 }}>หมู่ {this.props.branchData.moo}</Text>
//                                     <Text style={{ fontSize: 13, marginLeft: 10 }}>ต. {this.props.branchData.sub_district}</Text>
//                                     <Text style={{ fontSize: 13, marginLeft: 10 }}>อ. {this.props.branchData.district}</Text>
//                                     <Text style={{ fontSize: 13, marginLeft: 10 }}>จ. {this.props.branchData.provide}</Text>
//                                     <Text style={{ fontSize: 13, marginLeft: 10 }}>{this.props.branchData.zipCode}</Text>
//                                 </View>
//                                 <Text style={{ fontSize: 13, marginLeft: 14 }}>โทร {this.props.branchData.tel}</Text>
//                             </View>

//                         </View>
//                         <View style={{
//                             borderColor: 'black',
//                             borderWidth: 2,
//                             marginRight: 30,
//                             flex: 0.3
//                         }}>
//                             <Text style={{ fontSize: 13, marginLeft: 5 }}>หมายเลขใบแจ้งหนี้ : 12123</Text>
//                             <Text style={{ fontSize: 13, marginLeft: 5 }}>วันที่ : 01/01/2564</Text>
//                             <Text style={{ fontSize: 13, marginLeft: 5 }}>ผู้รับผิดชอบ : </Text>
//                             <Text style={{ fontSize: 13, marginLeft: 5 }}>วันครบกำหนด : 01/01/2564</Text>
//                         </View>
//                     </View>
//                     <View style={{ marginTop: 10, marginLeft: 30, marginRight: 30 }}>
//                         <View style={{ borderColor: 'black', borderWidth: this.state.tableBorderWidth }}>
//                         <View style={{ flexDirection: 'row', textAlign: 'center', fontSize: 13 }}>
//                                 <View style={{ flex: 0.09 }}>
//                                     <Text>ลำดับ</Text>
//                                 </View>
//                                 <View style={{ flex: 0.16, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                     <Text>รหัสสินค้า</Text>
//                                 </View>
//                                 <View style={{ flex: 0.18, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                     <Text>รายการสินค้า</Text>
//                                 </View>
//                                 <View style={{ flex: 0.15, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                     <Text>ราคาต่อหน่วย</Text>
//                                 </View>
//                                 <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                     <Text>จำนวน</Text>
//                                 </View>
//                                 <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                     <Text>ส่วนลด</Text>
//                                 </View>
//                                 <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                     <Text>จำนวนเงิน</Text>
//                                 </View>

//                             </View>
//                             {/*  ##  renderList   ## */}
//                             <this.renderInvoiceList />
//                         </View>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ flex: 1 }}>
//                                 <View style={{ marginTop: 60, textAlign: 'center', alignSelf: 'center' }}>
//                                     <View style={{ flexDirection: 'row' }}>
//                                         <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
//                                             <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้จ่ายเงิน</Text>
//                                         </View>
//                                         <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
//                                             <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับเงิน</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: 'row', marginTop: 45 }}>
//                                         <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
//                                             <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้ส่งสินค้า</Text>
//                                         </View>
//                                         <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
//                                             <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับสินค้า</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <View style={{
//                                     borderColor: 'black',
//                                     borderWidth: this.state.tableBorderWidth,
//                                     marginTop: 10,
//                                     width: '70%',
//                                     alignSelf: 'flex-end',
//                                     fontSize: 13,
//                                     textAlign: 'center'
//                                 }}>
//                                     <View style={{ flexDirection: 'row' }}>
//                                         <View style={{ flex: 1 }}>
//                                             <Text>ราคารวมทั้งสิ้น</Text>
//                                         </View>
//                                         <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                             <Text>{this.state.sum}</Text>
//                                         </View>
//                                     </View>

//                                     <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
//                                         <View style={{ flex: 1 }}>
//                                             <Text>ภาษีมูลค่าเพิ่ม 7%</Text>
//                                         </View>
//                                         <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                             <Text>{this.state.tax}</Text>
//                                         </View>
//                                     </View>

//                                     <View style={{ flexDirection: 'row', borderTopColor: 'black', borderTopWidth: this.state.tableBorderWidth }}>
//                                         <View style={{ flex: 1 }}>
//                                             <Text>จำนวนเงินรวมทั้งสิ้น</Text>
//                                         </View>
//                                         <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
//                                             <Text>{this.state.total}</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </Page>
//             </Document>
//         );
//     }


// }


class POCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            tableBorderWidth: 2,
            total: 0
        }

    }

    componentDidMount() {
        let tempTotal = 0;
        for (let x of this.state.data) {
            console.log(x);
            tempTotal += x.volume
        }

        this.setState({ total: tempTotal });
    }

    renderInvoiceList = () => {
        let componentList = []
        console.log(this.state.data);

        for (let x in this.state.data) {
            console.log(x);
            let num = parseInt(x) + 1;

            componentList.push(
                <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: this.state.tableBorderWidth,
                    textAlign: 'center',
                    fontSize: 11,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.09 }}>
                        <Text>{num}</Text>
                    </View>
                    <View style={{ flex: 0.77, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                        <Text>{this.state.data[x].volume}</Text>
                    </View>
                </View>
            );

        }
        return (componentList);
    }

    render() {
        return (
            <Document title='PDFTEST'>
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ marginTop: 20, marginLeft: 30, flex: 0.7 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.companyData.comName}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 14 }}>99/99</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>หมู่ {this.props.companyData.moo}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>ตำบล {this.props.companyData.sub_district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>อำเภอ {this.props.companyData.district}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>จังหวัด {this.props.companyData.provide}</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>โทร {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>ตำบล ---- </Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 20, marginRight: 30 }}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text style={{ fontSize: 20, marginTop: 5 }}>ใบสั่งซื้อ</Text>
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>Purchase Orders</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{
                            marginLeft: 30,
                            flex: 0.7
                        }}>
                            <View style={{
                                borderColor: 'black',
                                borderWidth: 2,
                                width: '97%'
                            }}>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}>รหัสสาขา {this.props.branchData.branchID}</Text>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}>ชื่อลูกค้า {this.props.branchData.cusName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, marginLeft: 14 }}>ที่อยู่ {this.props.branchData.address}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>หมู่ {this.props.branchData.moo}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>ต. {this.props.branchData.sub_district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>อ. {this.props.branchData.district}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>จ. {this.props.branchData.provide}</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 10 }}>{this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{ fontSize: 13, marginLeft: 14 }}>โทร {this.props.branchData.tel}</Text>
                            </View>

                        </View>
                        <View style={{
                            borderColor: 'black',
                            borderWidth: 2,
                            marginRight: 30,
                            flex: 0.3
                        }}>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>หมายเลขใบแจ้งหนี้ : 12123</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>วันที่ : 01/01/2564</Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>ผู้รับผิดชอบ : </Text>
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>วันครบกำหนด : 01/01/2564</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 30, marginRight: 30 }}>
                        <View style={{ borderColor: 'black', borderWidth: this.state.tableBorderWidth }}>
                            <View style={{ flexDirection: 'row', textAlign: 'center', fontSize: 13 }}>
                                <View style={{ flex: 0.09 }}>
                                    <Text>ลำดับ</Text>
                                </View>

                                <View style={{ flex: 0.77, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>รายการสินค้า</Text>
                                </View>

                                <View style={{ flex: 0.14, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                    <Text>จำนวน</Text>
                                </View>

                            </View>
                            {/*  ##  renderList   ## */}
                            <this.renderInvoiceList />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginTop: 90, textAlign: 'center', alignSelf: 'center' }}>
                                    <View style={{ borderTopColor: 'black', borderTopWidth: 1, width: 130 }}>
                                        <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้มีอำนาจ</Text>
                                    </View>
                                    <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginLeft: 30, width: 130 }}>
                                        <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับตรวจสอบ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{
                                    borderColor: 'black',
                                    borderWidth: this.state.tableBorderWidth,
                                    marginTop: 10,
                                    width: '70%',
                                    alignSelf: 'flex-end',
                                    fontSize: 13,
                                    textAlign: 'center'
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text>จำนวนรวมทั้งสิ้น</Text>
                                        </View>
                                        <View style={{ flex: 1, borderLeftColor: 'black', borderLeftWidth: this.state.tableBorderWidth }}>
                                            <Text>{this.state.total}</Text>
                                        </View>
                                    </View>
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
        fontFamily: 'Prompt'
    },
    section: {

    }
});



export { InvoiceCreater,  POCreater, ReceiptCreaterV2, POCreaterV2 }