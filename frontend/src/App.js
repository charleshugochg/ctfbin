import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main>
        <Sidebar />
      </Main>
    </div>
  );
}

export default App;
