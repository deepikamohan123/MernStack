import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";
import logo from './download.png'


function App() {
  return (<div className="bg-neutral-300 h-auto w-screen">
    <img src={logo} className="w-20 h-20 p-2"></img>
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path='/'></Route>
        <Route element={<SignUp/>} path='/register'/>
        <Route element={<Home/>} path='/home/:ID'/>
        <Route element={<CreateEmployee/>} path='create-employee'/>
        <Route element={<EmployeeList/>} path="/employee-list"/>
        <Route element={<EditEmployee/>} path="/edit-employee/:ID"/>
      </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
