import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Actionbar from './components/Actionbar/Actionbar';
import Navigator from './components/Navigator/Navigator';
import FlexFill from './components/FlexFill/FlexFill';

import ScreenDocuments from './screens/ScreenDocuments/ScreenDocuments';

import IconCode from './icons/IconCode';
import IconBin from './icons/IconBin'

import './App.css';

const ScreenBin = () =>{
  return <div>Bin</div>
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main>
        <Navigator 
          screenContainer={FlexFill}
          prepend={(screens, activeScreenName, setState) => {
            return (
              <Sidebar>
                {(state) => screens && screens.map(screen => {
                  const {name, iconcomponent} = screen.props
                  return <Sidebar.Item 
                    key={name}
                    name={name} 
                    state={state}
                    iconcomponent={iconcomponent} 
                    data-active={screen.props.name === activeScreenName}
                    onClick={() => setState(name)}/>
                })}
              </Sidebar>
            )
        }}>
          <Navigator.Screen 
            name="Documents" 
            component={ScreenDocuments} 
            iconcomponent={IconCode}
            data-default/>
          <Navigator.Screen 
            name="Bin" 
            component={ScreenBin} 
            iconcomponent={IconBin}/>
        </Navigator>
        <Actionbar />
      </Main>
    </div>
  );
}

export default App;
