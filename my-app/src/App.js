//Import Components and Page
import Main from './User/Stocking/Main'
import Stock from './User/Stocking/Stock'
import Import from './User/Stocking/Import'
import Export from './User/Stocking/Export'
import ImportTable from './User/Stocking/ImportTable'
import ExportTable from './User/Stocking/ExportTable'

import {BrowserRouter, Router, Route, Link, Redirect, Switch} from 'react-router-dom'

function App() {
  return (
    <div>
      <Switch>

        <Route exact path = '/' component = {Main}></Route>
        <Route path = '/Stock' component = {Stock}></Route>
        <Route path = '/Import' component = {Import}></Route>
        <Route path = '/ImportTable' component = {ImportTable}></Route>
        <Route path = '/Export' component = {Export}></Route>
        <Route path = '/ExportTable' component = {ExportTable}></Route>
          
      </Switch>

    </div>
  );
}

export default App;
