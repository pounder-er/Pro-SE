import React from 'react';
import fire_base from '../../firebase/Firebase';

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
    PaginationLink, Row, Col, Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import * as Yup from 'yup';

// const useSortableData = (items, config = null) => {
//     const [sortConfig, setSortConfig] = React.useState(config);

//     const sortedItems = React.useMemo(() => {
//         let sortableItems = [...items];
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === "ascending" ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === "ascending" ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [items, sortConfig]);

//     const requestSort = (key) => {
//         let direction = "ascending";
//         if (
//             sortConfig &&
//             sortConfig.key === key &&
//             sortConfig.direction === "ascending"
//         ) {
//             direction = "descending";
//         }
//         setSortConfig({ key, direction });
//     };

//     return { items: sortedItems, requestSort, sortConfig };
// };

// const ProductTable = (props) => {
//     const { items, requestSort, sortConfig } = useSortableData(props.products);
//     const getClassNamesFor = (name) => {
//         if (!sortConfig) {
//             return;
//         }
//         return sortConfig.key === name ? sortConfig.direction : undefined;
//     };
//     return (
//         <Table striped>
//             <thead>
//                 <tr>
//                     <th>
//                         <button
//                             type="button"
//                             onClick={() => requestSort("id")}
//                             className={getClassNamesFor("id")}
//                         >
//                             ลำดับ
//                         </button>
//                     </th>
//                     <th>
//                         <button
//                             type="button"
//                             onClick={() => requestSort("รหัสสินค้า")}
//                             className={getClassNamesFor("รหัสสินค้า")}
//                         >
//                             รหัสสินค้า
//                         </button>
//                     </th>
//                     <th>
//                         <button
//                             type="button"
//                             onClick={() => requestSort("ชนิด")}
//                             className={getClassNamesFor("ชนิด")}
//                         >
//                             ชนิด
//               </button>
//                     </th>
//                     <th>
//                         <button
//                             type="button"
//                             onClick={() => requestSort("รายการสินค้า")}
//                             className={getClassNamesFor("รายการสินค้า")}
//                         >
//                             รายการสินค้า
//               </button>
//                     </th>
//                     <th>
//                         <button
//                             type="button"
//                             onClick={() => requestSort("ปริมาณ")}
//                             className={getClassNamesFor("ปริมาณ")}
//                         >
//                             ปริมาณ
//               </button>
//                     </th>
//                     <th>
//                         <button
//                             type="button"
//                             onClick={() => requestSort("มูลค่าการขาย")}
//                             className={getClassNamesFor("มูลค่าการขาย")}
//                         >
//                             มูลค่าการขาย
//               </button>
//                     </th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {items.map((item) => (
//                     <tr key={item.id}>
//                         <td>{item.id}</td>
//                         <td>{item.รหัสสินค้า}</td>
//                         <td>{item.ชนิด}</td>
//                         <td>{item.รายการสินค้า}</td>
//                         <td>{item.ปริมาณ}</td>
//                         <td>${item.มูลค่าการขาย}</td>

//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//     );
// };
const filterValue = [
    { name: 'date', operator: 'startsWith', type: 'string', value: '' },
    { name: 'productID', operator: 'startsWith', type: 'string', value: '' },
    { name: 'total', operator: 'startsWith', type: 'string', value: '' },
    { name: 'volume', operator: 'startsWith', type: 'string', value: '' },
];
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
    { name: 'date', groupBy: false, defaultFlex: 1, header: 'วัน' },
    { name: 'productID', groupBy: false, defaultFlex: 1, header: 'รหัสสินค้า' },
    { name: 'total', groupBy: false, defaultFlex: 1, header: 'ปริมาณการขาย' },
    { name: 'volume', groupBy: false, defaultFlex: 1, header: 'ยอดดขาย' },

]
const dataSource = [{ id: '1150', firstName: 'chainan', lastName: 'punsri', email: 'chain@hhh.com' }, { id: '1151', firstName: 'ahainun', lastName: 'vansri', email: 'cain@hhh.com' }]
const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
    sortAsc: 'เรียงน้อยไปมาก',
    sortDesc: 'เรียงมากไปน้อย',
    clear: 'ลบ',
    clearAll: 'ลบทั้งหมด',
    contains: 'ประกอบด้วย',
    startsWith: 'เริ่มด้วย',
    endsWith: 'จบด้วย',
    neq: 'ไม่เท่ากับ',
    eq: 'เท่ากับ',
    notEmpty: 'ไม่ว่าง',
    empty: 'ว่าง',
    notContains: 'ไม่ได้ประกอบด้วย',
    disable: 'ปิดตัวกรอง',
    enable: 'เปิดตัวกรอง',
    pageText: 'หน้า ',
    ofText: ' จาก ',
    perPageText: 'แสดงรายการทีละ',
    showingText: 'กำลังแสดงรายการ '
})
class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            dataSource: dataSource
        }
    }

    setDataGridRef = (ref) => (this.dataGrid = ref)

    async componentDidMount() {
        await fire_base.getAllUserProfile(this.getAllUserProfileSuccess, this.unSuccess);
    }

    getAllUserProfileSuccess = (querySnapshot) => {
        let data = []
        querySnapshot.forEach(doc => {
            data.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        this.setState({ dataSource: data });
    }

    unSuccess(error) {
        console.log(error);
    }

    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Row >
                    <h1 style={{
                        marginTop: 20,
                        marginBottom: 20,
                        width: '100%',
                        alignSelf: 'center'
                    }}>ยอดขายสินค้า</h1>
                </Row>
                <Row >
                    <Col sm="1">
                        Date
                                </Col>
                    <Col >
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                    </Col>


                    <Col sm="1">
                        To Date
                                </Col>
                    <Col >
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                    </Col>
                    <Col>
                        <InputGroup >
                            <Input placeholder="รหัสสินค้า" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><MdSearch color="#1F1F1F" size={22} /></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>

                    </Col>
                    <Col md="auto">
                        <Button color="info" style={{ width: 200 }}>fillter</Button>
                    </Col>
                </Row >
                <Row style={{ marginTop:'20px'}}>
                    <ReactDataGrid
                        onReady={this.setDataGridRef}
                        i18n={i18n}
                        idProperty="id"
                        columns={columns}
                        pagination
                        defaultLimit={15}
                        defaultSkip={15}
                        pageSizes={[10, 15, 30]}
                        dataSource={this.state.dataSource}
                        defaultFilterValue={filterValue}
                        showColumnMenuTool={true}
                        emptyText="ไม่มีรายการ"
                    />
                </Row>

                {/* <ProductTable 
                    products={[
                        { id: 1, "รหัสสินค้า": "110100", ชนิด: "ข้าวหอมมะลิ", รายการสินค้า: "ข้าวหอมมะลิ ตราสส", ปริมาณ: 80000, มูลค่าการขาย: 2000000.00 },
                        { id: 2, "รหัสสินค้า": "110100", ชนิด: "ข้าวหอมมะลิ", รายการสินค้า: "ข้าวหอมมะลิ ตราสส", ปริมาณ: 70000, มูลค่าการขาย: 7000000.00 },
                        { id: 3, "รหัสสินค้า": "110110", ชนิด: "มะลิ", รายการสินค้า: "หอมมะลิ ", ปริมาณ: 50000, มูลค่าการขาย: 3000000.00 },
                        { id: 4, "รหัสสินค้า": "110200", ชนิด: "ข้าวหอม", รายการสินค้า: "ข้าว ตราสส", ปริมาณ: 84000, มูลค่าการขาย: 5000000.00 },
                        { id: 5, "รหัสสินค้า": "110130", ชนิด: "ข้าว", รายการสินค้า: "มะลิ ตราสส", ปริมาณ: 10000, มูลค่าการขาย: 100000.00 },


                    ]}
                />*/}


                <Pagination aria-label="Page navigation example"
                    style={{
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                    <PaginationItem>
                        <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last href="#" />
                    </PaginationItem>
                </Pagination>


            </Container>
        );
    }
}


export default SalesReport;