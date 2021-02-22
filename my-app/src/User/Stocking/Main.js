import React from 'react';
import './Style/Main.css'

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="ContainerMain">
                
                <header className="Header">
                    <div className="Profile">
                        <div className="tab">
                            <b>ประยา จันโอชุท</b>
                            <b className="tabLeft">ID: M44114</b>
                        </div>
                        <b className="rank">พนักงานรากหญ้า</b>
                    </div>
                    <Button color="danger" style={{ borderRadius: 0 }}>ออกจากระบบ</Button>
                </header>

                <div className="ContentMain">
                    <body className="BodyMain">

                        {/* Place the icon here..... */}
                        <Button style = {{width:'100%', height:'100%', fontSize:40}}>Stocking</Button>
                    </body>

                    <body className="BodyMain">
                        <Button style = {{width:'100%', height:'100%', fontSize:40}}>Import</Button>
                    </body>

                    <body className="BodyMain">
                        <Button style = {{width:'100%', height:'100%', fontSize:40}}>Export</Button>
                    </body>

                </div>
            </div>
        )
    }
}

export default Main;