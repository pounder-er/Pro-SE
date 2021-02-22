import React from 'react';
import './Style/Main.css'

//Import Components and Page
// import Stock from 'Stock'
// import Import from 'Import'
// import ImportTable from 'ImportTable'
// import Export from 'Export'
// import ExportTable from 'ExportTable' 

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
import {BrowserRouter, Router, Route, Link, Redirect} from 'react-router-dom'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    onRoute =(route)=> {

        // console.log(route)
        if(route == "Stock"){
            
        }
        // else if(route == "Import"){

        // }
        // else if(route == "Export"){

        // }

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
                        <Link to = '/Stock' style = {{width:'100%', height:'100%'}}>
                            <Button onClick = {() => this.onRoute('Stock')} style = {{width:'100%', height:'100%', fontSize:40}}>Stocking ลองกดได้</Button>
                        </Link>
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