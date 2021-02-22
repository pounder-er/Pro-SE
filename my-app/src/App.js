//Import Components and Page
import Main from './User/Stocking/Main'
import Stock from './User/Stocking/Stock'
import Import from './User/Stocking/Import'
import Export from './User/Stocking/Export'

import {BrowserRouter, Router, Route, Link, Redirect} from 'react-router-dom'

function App() {
  return (
    <div>
      {/* <Main></Main> */}
      {/* <Stock></Stock>
      <Import></Import>
      <ImportTable></ImportTable>
      <Export></Export>
      <ExportTable></ExportTable> */}
      
      <Route exact path = '/' component = {Main}></Route>
      <Route path = '/Stock' component = {Stock}></Route>
      <Route path = '/Import' component = {Import}></Route>
      <Route path = '/Export' component = {Export}></Route>
      
    </div>
  );
}

export default App;
