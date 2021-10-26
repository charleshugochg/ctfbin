import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Actionbar from './components/Actionbar/Actionbar';
import Plane from './components/Plane/Plane';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main>
        <Sidebar />
        <Plane />
        <Actionbar />
      </Main>
    </div>
  );
}

export default App;
