import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';

const DashBord = () => {
  let [name, setname] = useState("")
  let ID = useParams()

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${ID.ID}`)
    .then((e)=>{
      setname(e.data)
    
    })
    .catch(()=>{console.log("Unable to fetch data of Employee");})
},[])

  return (
    <div className="h-screen flex flex-col bg-indigo-500 ">
    <nav className="py-4 px-4 ">
      <ul className="flex justify-between items-center max-w-md mx-auto">
      <li className="mr-4"><Link to="/home/:ID" className="text-lg text-white">Home</Link></li>
          <li className="mr-4"><Button variant="text" className="text-lg text-white"><Link className="text-lg text-white" to='/create-employee'>Add Employee</Link></Button></li>
          <li className="mr-4"><Button variant="text" className="text-lg text-white"><Link className="text-lg text-white" to="/employee-list">Employee list </Link></Button></li>
          <li className="text-lg text-white-300 p-2">{name}</li>
          <li className="ml-4"><Link to="/" className="text-lg text-white">Logout</Link></li>
        </ul>
    </nav>
    <main className="flex-1 p-4 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-indigo-700 p-4">DashBord</h1>
        <p className="text-lg text-gray-600">Wellcome to admin panel</p>
      </main>
    </div>
  )
}

export default DashBord