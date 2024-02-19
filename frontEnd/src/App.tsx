import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";
import { Outlet } from 'react-router-dom';

function App() {
  return (    
      <div>
        <Header />
        <TabNavigator />
        <div className='pt-[155px] pl-[150px] mb-[75px] '>
          <Outlet />
        </div>
      </div>    
  );
}

export default App;
