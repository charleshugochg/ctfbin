import {
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

import CodeIcon from './icons/CodeIcon';
import BinIcon from './icons/BinIcon'

import EditorScreen from './screens/EditorScreen/EditorScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

import ErrorBaundary from './components/ErrorBoundary/ErrorBoundary'

import './App.css';

const ScreenBin = () =>{
  return <div>Bin</div>
}

function Layout () {
  return (
    <ErrorBaundary>
      <Sidebar>
        {state => (
          <>
            <LinkMatch to="/edit">
              {match => (
                <Sidebar.Item 
                  name="Documents"
                  iconcomponent={CodeIcon}
                  data-active={!!match}
                  state={state}/>
              )}
            </LinkMatch>
            <LinkMatch to="/bin">
              {match => (
                <Sidebar.Item 
                  name="Bin"
                  iconcomponent={BinIcon}
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
    </ErrorBaundary>
  )
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/edit" />} />
            <Route path="/edit" element={<EditorScreen.Layout />}>
              <Route index element={<EditorScreen.Placeholder>Open a file to edit.</EditorScreen.Placeholder>} />
              <Route path=":name" element={<EditorScreen.EditorWrapper />} />
            </Route>
            <Route path="/bin" element={<ScreenBin />} />
            <Route path="*" element={<Navigate to="/edit" />} />
          </Route>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
