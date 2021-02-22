import Main from './User/Stocking/Main'
import Stock from './User/Stocking/Stock'
import Import from './User/Stocking/Import'
import ImportTable from './User/Stocking/ImportTable'
import Export from './User/Stocking/Export'
import ExportTable from './User/Stocking/ExportTable'

function App() {
  return (
    <div>
      <Main></Main>
      <Stock></Stock>
      <Import></Import>
      <ImportTable></ImportTable>
      <Export></Export>
      <ExportTable></ExportTable>
    </div>
  );
}

export default App;
