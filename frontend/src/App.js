import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'
import LinkMatch from './components/LinkMatch/LinkMatch';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Actionbar from './components/Actionbar/Actionbar';
import FlexFill from './components/FlexFill/FlexFill';

import ScreenDocuments from './screens/ScreenDocuments/ScreenDocuments';

import IconCode from './icons/IconCode';
import IconBin from './icons/IconBin'

import './App.css';

const ScreenBin = () =>{
  return <div>Bin</div>
}

function Layout () {
  return (
    <Main>
      <Sidebar>
        {state => (
          <>
            <LinkMatch to="/edit">
              {match => (
                <Sidebar.Item 
                  name="Documents"
                  iconcomponent={IconCode}
                  data-active={!!match}
                  state={state}/>
              )}
            </LinkMatch>
            <LinkMatch to="/bin">
              {match => (
                <Sidebar.Item 
                  name="Bin"
                  iconcomponent={IconBin}
                  data-active={!!match}
                  state={state}/>
              )}
            </LinkMatch>
          </>
        )}
      </Sidebar>
      <FlexFill>
        <Outlet />
      </FlexFill>
      <Actionbar />
    </Main>
  )
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/edit" />} />
            <Route path="/edit" element={<ScreenDocuments />} />
            <Route path="/bin" element={<ScreenBin />} />
            <Route path="*" element={<Navigate to="/edit" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
