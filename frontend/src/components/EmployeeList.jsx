
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import $ from 'jquery';
import 'datatables.net';



const EmployeeList = () => {
    let [infoFromDB, setinfoFromDB] = useState([])
    let [reload, setReload] = useState(0)
    useEffect(()=>{
        axios.get("http://localhost:5000/employee-list")
        .then((e)=>{
                setinfoFromDB(e.data)
            })
         .catch((e)=>{
                console.log("Error loading EmployeeList");
            })
            setReload(1)
        
    },[reload])
    let deleteUser = (e)=>{
      axios.delete(`http://localhost:5000/employee-list/${e}`)
      alert('Employee delete successfully...')
      setReload(2)
    }

    const today = new Date()

useEffect(() => {
  $('#product-table').DataTable();
}, []);
   
  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <p className='text-lg font-bold mb-4'>Total Count : {infoFromDB.length}</p>
       <table id='product-table' className=' w-full lg:w-3/4 xl:w-2/3 mb-4 overflow-x-auto'>
       <thead className='bg-gray-100 border-b border-gray-200'>
          <tr>
          <th className='px-4 py-2 text-left'>Unique Id</th>
            <th className='px-4 py-2 text-left'>Image</th>
            <th className='px-4 py-2 text-left'>Name</th>
            <th className='px-4 py-2 text-left'>Email</th>
            <th className='px-4 py-2 text-left'>Phone</th>
            <th className='px-4 py-2 text-left'>Designation</th>
            <th className='px-4 py-2 text-left'>Gender</th>
            <th className='px-4 py-2 text-left'>Course</th>
            <th className='px-4 py-2 text-left'>Date</th>
            <th className='px-4 py-2 text-left'>Action</th>
          </tr>
        </thead>
        <tbody className='text-center text-[15px]'>
          {infoFromDB.map((item,i) => (
            <tr key={item.id} className='border-b border-gray-200'>
              <td className='px-4 py-2'>{i+1}</td>
              <td className='px-4 py-2'><img alt='No image' src={`backend/Images/${item.image}`}/></td>
              <td className='px-4 py-2'>{item.name}</td>
              <td className='px-4 py-2'>{item.email}</td>
              <td className='px-4 py-2'>{item.phone}</td>
              <td className='px-4 py-2'>{item.designation}</td>
              <td className='px-4 py-2'>{item.gender}</td>
              <td className='px-4 py-2'>{item.course[0]},{item.course[1]}</td>
              <td className='px-4 py-2'>{today.toLocaleDateString()}</td>
              <td className='px-4 py-2'>
              <Button variant="outlined" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
              <Link  to={`/edit-employee/${item._id}`}>Edit</Link>
              </Button>
                <Button class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" variant="outlined" color="error"  onClick={()=>{deleteUser(item._id)}}> Delete </Button>
              </td>
            </tr>
          ))}
        </tbody>
        
       </table>
    </div>
  )
}

export default EmployeeList

