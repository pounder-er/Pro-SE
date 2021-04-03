import React from 'react';


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

import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("id")}
                            className={getClassNamesFor("id")}
                        >
                            ลำดับที่
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("หมายเลขล๊อต")}
                            className={getClassNamesFor("หมายเลขล๊อต")}
                        >
                            หมายเลขล๊อต
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("รายการสินค้า")}
                            className={getClassNamesFor("ผลิต")}
                        >
                            ว/ด/ป ผลิต
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ชนิด")}
                            className={getClassNamesFor("หมดอายุ")}
                        >
                            ว/ด/ป หมดอายุ
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("น้ำหนัก")}
                            className={getClassNamesFor("จำนวนที่รับเข้า")}
                        >
                            จำนวนที่รับเข้า
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("เวลา")}
                            className={getClassNamesFor("ยอดคงเหลือ")}
                        >
                            ยอดคงเหลือ
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ราคาต่อหน่วย")}
                            className={getClassNamesFor("รายละเอียด")}
                        >
                            รายละเอียด
              </button>
                    </th>


                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.หมายเลขล๊อต}</td>
                        <td>{item.ผลิต}</td>
                        <td>{item.หมดอายุ}</td>
                        <td>{item.จำนวนที่รับเข้า}</td>
                        <td>{item.ยอดคงเหลือ}</td>
                        <td>{item.รายละเอียด}</td>
                        

                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Row >
                    <Col >
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '100%',
                            alignSelf: 'center'
                        }}>รายละเอียดสินค้า</h1>
                    </Col>
                    <Col xs="2">
                    <Link to={"/home/productsReport"}><Button color="warning" style={{ width: 200, marginTop: 40 }}>ย้อน</Button></Link>
                    </Col>
                    <Col xs="2">
                        <Button color="danger" style={{ width: 200, marginTop: 40 }}>แก้ไข</Button>
                    </Col>
                </Row>
                <Row style={{ height: 200 }}>
                    <Col style={{ backgroundColor:'green',marginLeft:"50px" }} md={{size:"2"}}></Col>
                    <Col >
                        <Row style={{ height: 80 }}>
                            <Col md={{ size: '3'}}>รหัสสินค้า:110100</Col>
                            <Col md="3">รายการสินค้า:ข้าวหอมมะลิ ตราสส</Col>
                            <Col md="3">ขนิด:ข้าวหอมมะลิ</Col>
                            <Col md="3">น้ำหนัก:5 กก.</Col>
                        </Row>
                        <Row style={{ height: 60 }}>
                            <Col md={{ size: '3'}}>ราคาต่อหน่วย:250</Col>
                            <Col md="3">บริษัท:บริษัทสส จำกัด</Col>
                            <Col md="3">สถานะ:ปกติ</Col>
                            <Col md="3">เก่า/ใหม่:ใหม่</Col>
                        </Row>
                    </Col>

                </Row>
                <ProductTable
                    products={[
                        { id: 1, หมายเลขล๊อต: "110100", ผลิต: "12/08/2554", หมดอายุ: "12/08/2554", จำนวนที่รับเข้า: 250, สถานะ: "ปกติ", ยอดคงเหลือ: 50, รายละเอียด: "" }



                    ]}
                />


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


export default ProductDetail;