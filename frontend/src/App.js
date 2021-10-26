import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Actionbar from './components/Actionbar/Actionbar';
import Navigator from './components/Navigator/Navigator';
import FlexGrow from './components/FlexGrow/FlexGrow';

import IconCode from './icons/IconCode';
import IconBin from './icons/IconBin'

import './App.css';

const DocumentsScreen = () =>{
  return <div>Documents</div>
}

const BinScreen = () =>{
  return <div>Bin</div>
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main>
        <Navigator 
          screenContainer={FlexGrow}
          prepend={(screens, activeScreenName, handleChange) => {
            return (
              <Sidebar>
                {screens && screens.map(screen => {
                  const {name, iconcomponent} = screen.props
                  return <Sidebar.Item 
                    key={name}
                    name={name} 
                    iconcomponent={iconcomponent} 
                    data-active={screen.props.name === activeScreenName}
                    onClick={() => handleChange(name)}/>
                })}
              </Sidebar>
            )
        }}>
          <Navigator.Screen 
            name="Documents" 
            component={DocumentsScreen} 
            iconcomponent={IconCode}
            data-default/>
          <Navigator.Screen 
            name="Bin" 
            component={BinScreen} 
            iconcomponent={IconBin}/>
        </Navigator>
        <Actionbar />
      </Main>
    </div>
  );
}

export default App;
