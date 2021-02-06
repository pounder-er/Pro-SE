import React from 'react';
import './Login.css';

import './Manager.css';

import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";


class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Container">
                <ProSidebar>
                    <Menu iconShape="square">
                        <MenuItem >Dashboard</MenuItem>
                        <SubMenu title="Components" >
                            <MenuItem>Component 1</MenuItem>
                            <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>
        );
    }
}


export default Manager;