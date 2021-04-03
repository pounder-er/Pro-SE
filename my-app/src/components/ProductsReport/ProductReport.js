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

import * as Yup from 'yup';
import { Link } from 'react-router-dom';

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
                            ลำดับ
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("รหัสสินค้า")}
                            className={getClassNamesFor("รหัสสินค้า")}
                        >
                            รหัสสินค้า
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("รายการสินค้า")}
                            className={getClassNamesFor("รายการสินค้า")}
                        >
                            รายการสินค้า
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ชนิด")}
                            className={getClassNamesFor("ชนิด")}
                        >
                            ชนิด
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("น้ำหนัก")}
                            className={getClassNamesFor("น้ำหนัก")}
                        >
                            น้ำหนัก
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("เวลา")}
                            className={getClassNamesFor("เวลา")}
                        >
                            เก่า/ใหม่
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ราคาต่อหน่วย")}
                            className={getClassNamesFor("ราคาต่อหน่วย")}
                        >
                            ราคาต่อหน่วย
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("สถานะ")}
                            className={getClassNamesFor("สถานะ")}
                        >
                            สถานะ
              </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ยอดคงเหลือ")}
                            className={getClassNamesFor("ยอดคงเหลือ")}
                        >
                            ยอดคงเหลือ
              </button>
                    </th>
                    <th>
                        รายละเอียด
                    </th>

                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.รหัสสินค้า}</td>
                        <td>{item.รายการสินค้า}</td>
                        <td>{item.ชนิด}</td>
                        <td>{item.น้ำหนัก}</td>
                        <td>{item.เวลา}</td>
                        <td>${item.ราคาต่อหน่วย}</td>
                        <td>{item.สถานะ}</td>
                        <td>{item.ยอดคงเหลือ}</td>
                        <td>{item.รายละเอียด}</td>
                        

                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

class ProductReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container fluid={true} style={{ backgroundColor: 'wheat' }} >
                <Row >
                    <Col>
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '100%',
                            alignSelf: 'center'
                        }}>ตรวขสอบสินค้า</h1>
                    </Col>
                </Row>
                <Row >
                    <Col md="3">
                        <InputGroup >
                            <Input placeholder="รหัสสินค้า" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><MdSearch color="#1F1F1F" size={22} /></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>

                    </Col>
                    <Col md={{ span: 4, offset: 7 }}>
                        <Button color="info" style={{ width: 200 }}>fillter</Button>
                    </Col>
                </Row>

                <ProductTable
                    products={[
                        { id: 1, "รหัสสินค้า": "110100", รายการสินค้า: "ข้าวหอมมะลิ ตราสส", ชนิด: "ข้าวหอมมะลิ", น้ำหนัก: 5, เวลา: "ใหม่", ราคาต่อหน่วย: 250.00, สถานะ: "ปกติ", ยอดคงเหลือ: 500.00, รายละเอียด: <Link to={this.props.match.url+"/productDetail"}>h</Link> },
                        { id: 1, "รหัสสินค้า": "110100", รายการสินค้า: "ข้าวหอมมะลิ ตราสส", ชนิด: "ข้าวหอมมะลิ", น้ำหนัก: 5, เวลา: "ใหม่", ราคาต่อหน่วย: 250.00, สถานะ: "ปกติ", ยอดคงเหลือ: 500.00, รายละเอียด: "ghjjg" }

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


export default ProductReport;