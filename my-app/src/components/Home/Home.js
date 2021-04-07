import React from 'react';

import {
  Switch,
  Route,
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';

import styled from 'styled-components';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';

import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

import {
  BsFillLockFill,
  BsFillGrid1X2Fill,
  BsFillArchiveFill,
  BsBriefcaseFill,
  BsFillPeopleFill,
  BsBoxArrowRight,
  BsPersonFill
} from "react-icons/bs";

import { ImExit } from "react-icons/im";
import { CgSidebarOpen, CgSidebar } from "react-icons/cg";
import { IoMdSettings, IoMdCalculator } from "react-icons/io";
import { IoAlarmSharp } from "react-icons/io5";
import { FaWarehouse, FaUserPlus, FaThList } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import { GiBuyCard } from "react-icons/gi";

// import { MdPermContactCalendar } from "react-icons/md";
import { RiBarChart2Fill, RiContactsFill } from "react-icons/ri";

import fire_base from '../../firebase/Firebase';

import { connect } from 'react-redux';
import { addSession, addUserProfile } from '../../redux/actions';

import ListEmployee from '../Employees/ListEmployee';
import AddEmployee from '../Employees/AddEmployee';



import AddProduct from '../Product/AddProduct';
import HistoryInOut from '../HistoryInOut/HistoryInOut'
import SalesReport from '../SalesReport/SalesReport'
import ProductsReport from '../ProductsReport/ProductReport'
import ProductDetail from '../ProductDetail/ProductDetail'
import PartnerList from '../Company/PartnerList'

import Sell from '../Sell/Sell';
import So from '../Sell/So';
import Buy from '../Buy/Buy';
import Po from '../Buy/Po';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isOpen: false,
      headerTitle: '',
    }
  }

  componentDidMount(){
    // this.props.userProfile.test.get().then(doc=>{
    //   if (doc.exists) {
    //     console.log(doc.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    //   console.log(doc.data());
    // })
    
  }

  toggleProfile = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onLogout = (e) => {
    e.preventDefault();
    fire_base.logOut(this.logOutSuccess, this.logOutUnsuccess);
  }

  logOutSuccess = () => {
    this.props.dispatch(addSession(null));
    //this.props.history.push("/login");
  }

  logOutUnsuccess = (error) => {
    console.error(error.message);
  }

  checkJobTitle = () => {
    let menu = []
    if (this.props.userProfile.jobTitle == 'ผู้จัดการ' || this.props.userProfile.jobTitle == 'ผู้ดูแลระบบ') {
      menu = menu.concat([
        <MenuItem key='1' icon={<BsFillGrid1X2Fill />}>
         
          Dashboard
          <Link onClick={() => this.setState({ headerTitle: 'Dashboard' })} />
        </MenuItem>,
        <SubMenu key='2' title="จัดการพนักงาน" icon={<BsFillPeopleFill />}>
          <MenuItem suffix={<FaUserPlus size={18} />} >
            เพิ่มพนักงาน
          <Link to={this.props.match.url + "/add_employee"} onClick={() => this.setState({ headerTitle: 'เพิ่มพนักงาน' })} />
          </MenuItem>
          <MenuItem suffix={<RiContactsFill size={18} />} >
            รายชื่อพนักงาน
          <Link to={this.props.match.url + "/list_employee"} onClick={() => this.setState({ headerTitle: 'รายชื่อพนักงาน' })} />
          </MenuItem>
        </SubMenu>,

        <MenuItem key='3' icon={<RiBarChart2Fill size={18} />} >
          ยอดขายสินค้า
          <Link to={this.props.match.url + "/salesReport"} onClick={() => this.setState({ headerTitle: 'ยอดขายสินค้า' })} />
        </MenuItem>,

        <SubMenu key='4' title="ตั้งค่า" icon={<IoMdSettings size={18} />}>
          <MenuItem suffix={<IoMdCalculator size={18} />} >คำนวนการสั่งซื้อสินค้า</MenuItem>
          <MenuItem suffix={<IoAlarmSharp size={18} />} >ตั้งเวลาเช็คสต็อก</MenuItem>
        </SubMenu>
      ])
    }
    if (this.props.userProfile.jobTitle == 'ผู้จัดการ' ||
      this.props.userProfile.jobTitle == 'ผู้ดูแลระบบ' ||
      this.props.userProfile.jobTitle == 'เจ้าหน้าที่') {
      menu = menu.concat(
        [

          <SubMenu key='5' title="จัดการสินค้า" icon={<BsFillArchiveFill />}>
            <MenuItem suffix={<HiViewGridAdd size={20} />} >เพิ่มสินค้า<Link to={this.props.match.url + "/add_product"} onClick={() => this.setState({ headerTitle: 'เพิ่มสินค้าใหม่' })} /></MenuItem>
            <MenuItem suffix={<FaThList style={{marginRight:2}}  size={15} />} >
              รายการสินค้า
            <Link to={this.props.match.url + "/productsReport"} onClick={() => this.setState({ headerTitle: 'ตรวจสอบสินค้า' })} />
            </MenuItem>
            <MenuItem suffix={<GiBuyCard style={{marginRight:2}}  size={18} />} >รายการซื้อสินค้า<Link to={this.props.match.url + "/buy"} onClick={() => this.setState({ headerTitle: 'รายการซื้อสินค้า' })} /></MenuItem>
            <MenuItem>รายการขายสินค้า<Link to={this.props.match.url + "/sell"} onClick={() => this.setState({ headerTitle: 'รายการขายสินค้า' })} /></MenuItem>
          </SubMenu>,
          <SubMenu key='6' title="คลังสินค้า" icon={<FaWarehouse />}>
            <MenuItem >
              ประวัติสินค้าเข้า/ออกคลัง
            <Link to={this.props.match.url + "/historyInOut"} onClick={() => this.setState({ headerTitle: 'ระวัติสินค้าเข้า/ออกคลัง' })} />
            </MenuItem>
            <MenuItem >ผลการเช็คสต๊อกสินค้า<Link onClick={() => this.setState({ headerTitle: 'ผลการเช็คสต๊อกสินค้า' })} /></MenuItem>
          </SubMenu>,

          <SubMenu key='7' title="ผู้ติดต่อ" icon={<BsBriefcaseFill />}>
            <MenuItem>บริษัทคู่ค้า<Link to={this.props.match.url + "/PartnerList"} onClick={() => this.setState({ headerTitle: 'บริษัทคู่ค้า' })} /></MenuItem>
            <MenuItem>สาขา<Link onClick={() => this.setState({ headerTitle: 'สาขา' })} /></MenuItem>
          </SubMenu>
        ]
      )
    }
    if (this.props.userProfile.jobTitle == 'พนักงานคลัง') {
      menu = menu.concat(
        [
          <MenuItem key='8' >เช็คสต๊อกสินค้า<Link onClick={() => this.setState({ headerTitle: 'เช็คสต๊อกสินค้า' })} /></MenuItem>,
          <MenuItem key='9' >นำสินค้าออกจากคลัง<Link onClick={() => this.setState({ headerTitle: 'นำสินค้าออกจากคลัง' })} /></MenuItem>,
          <MenuItem key='10' >นำสินค้าเข้าคลัง<Link onClick={() => this.setState({ headerTitle: 'นำสินค้าเข้าคลัง' })} /></MenuItem>,
        ])
    }
    return menu;
  }

  render() {
    var myNumber = 15;
var formattedNumber = ("0" + myNumber).slice(-2);
console.log(formattedNumber);
    return (
      <ContainerHome>
        <Sidebar>

          <ProSidebar collapsed={this.state.collapsed} >
            <SidebarHeader>
              <Menu iconShape="circle" >
                <SubMenu icon={
                  (this.props.userProfile.imageProfile &&
                    (<img src={this.props.userProfile.imageProfile} style={{ height: 50, width: 50, borderRadius: 100 }} />)) ||
                  (!this.props.userProfile.imageProfile && (<BsPersonFill />))
                }
                  prefix={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h5>{this.props.userProfile.firstName}</h5>
                      <label style={{ fontSize: 12 }}>{this.props.userProfile.jobTitle}</label>
                    </div>} >
                  <MenuItem suffix={<BsBoxArrowRight />} onClick={(e) => this.onLogout(e)}>ออกจากระบบ</MenuItem>
                </SubMenu>
              </Menu>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="circle" popperArrow>
                {this.checkJobTitle()}
              </Menu>
            </SidebarContent>
          </ProSidebar>

        </Sidebar>
        <Content>
          <Header>

            <Button size='sm' style={{ padding: 3, paddingLeft: 4, paddingRight: 4 }} color="secondary" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
              {
                (this.state.collapsed && <CgSidebarOpen size={25} />) ||
                (!this.state.collapsed && <CgSidebar size={25} />)
              }
            </Button>
            <div style={{ fontSize: 25, color: '#F0FFFF', marginLeft: 10 }}>{this.state.headerTitle}</div>

          </Header>
          <Body>
            <Container fluid style={{ backgroundColor: 'white', borderRadius: 5, padding: 20 }}>
              <Switch>
                <Route exact path={this.props.match.path + "/historyInOut"} component={HistoryInOut} />
                <Route exact path={this.props.match.path + "/salesReport"} component={SalesReport} />
                <Route exact path={this.props.match.path + "/productsReport"} component={ProductsReport} />
                <Route exact path={this.props.match.path + "/productsReport/productDetail"} component={ProductDetail} />
                <Route exact path={this.props.match.path + "/list_employee"} component={ListEmployee} />
                <Route exact path={this.props.match.path + "/add_employee"} component={AddEmployee} />
                <Route exact path={this.props.match.path + "/add_product"} component={AddProduct} />
                <Route exact path={this.props.match.path + "/sell"} component={Sell} />
                <Route exact path={this.props.match.path + "/sell/so"} component={So} />
                <Route exact path={this.props.match.path + "/buy"} component={Buy} />
                <Route exact path={this.props.match.path + "/buy/po"} component={Po} />
                <Route exact path={this.props.match.path + "/PartnerList"} component={PartnerList} />
              </Switch>
            </Container>
            {/* <Button onClick={()=>{fire_base.addTest();}} >kuy</Button> */}
          </Body>
        </Content>
      </ContainerHome>
    );
  }
}

const ContainerHome = styled.div`
      display: flex;
      align-items: flex-start;
      background-color: #1F1F1F; 
    `;

const Sidebar = styled.div`
  display: flex;
  height: 100vh;
  flex-direction:column;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    /* background-color: rgb(142, 207, 57); */
    height: 100vh;
    `;

const Header = styled.div`
    display: flex;
    background-color: #46CBE8;
    /* height: 3vh; */
    max-height: 60px;
    min-height: 45px;
    padding: 5px;
    align-items: center;
    `;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3vh;
    flex-grow: 1;
    overflow-y: scroll;
    background-color: lightgrey;
    `;


const mapStateToProps = (state) => {
  return {
    session: state.session,
    userProfile: state.userProfile
  }
}

export default connect(mapStateToProps)(Home);
