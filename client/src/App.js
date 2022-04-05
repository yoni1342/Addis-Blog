// import logo from './logo.svg';
import './App.css';
import TopBar from './components/topbar/TopBar';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Setting from './pages/settings/Setting';
import LoginPage from './pages/login/LoginPage';
import Register from './pages/register/Register';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { useContext } from 'react';
import { Context } from './context/Context';
function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <div className="App ">
        <TopBar />
        <Routes>
          <Route path= '/' element={ <Home/> }></Route>
          <Route path= '/post/:id' element={ <Single /> }>
          </Route>
          <Route path= '/write' element={user? <Write />:<LoginPage /> }>
          </Route>
          <Route path= '/setting' element={user? <Setting/>:<Register /> }>
          </Route>
          <Route path= '/Login' element={ user ? <Home /> : <LoginPage /> }>              
          </Route>
          <Route path= '/register' element={user? <Register />: <Register/> }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
