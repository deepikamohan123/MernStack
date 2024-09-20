import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [cnfPassword, setCnfPassword] = useState('')
    let navigate = useNavigate()

    let submitForm =()=>{
        let payload = {
            name,email,cnfPassword
        }
        if(!name || !email || !cnfPassword){
            alert("To register fill all the fields..!")
        }
        else{
            if(password === cnfPassword ){
                axios.post('http://localhost:5000/register', payload)
            .then((e)=>{
                alert(e.data);
                navigate("/")
            })
            .catch((e)=>{
                alert("Error while saving...");
            })
            }
            else{
                alert("Both password should be same..")
            }
            
        }
    }

    return (
        <div className='bg-white rounded-3xl border-2 border-gray-200 max-w-[1000px]  h-[750px] mx-auto shadow-xl scale-75 p-[30px]'>
            <h1 className='text-center font-semibold text-3xl my-3'>Create an account</h1>
            <div className=' border-2 rounded-2xl border-gray-600 max-w-[500px] mx-auto my-5 p-5'>
                <div >
                
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='e.g. Deepika Mohan' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required />
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Email</label>
                    <input required className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@gmail.com' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Password</label>
                    <input required  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='••••••••' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Confirm Password</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='••••••••' type="password" value={cnfPassword} onChange={(e)=>{setCnfPassword(e.target.value)}}/>
                    <br/>
                    <div className='flex flex-col items-center p-3'>
                    <button class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submitForm}>Create an account</button> <br/>
                    <p class="text-md font-medium mb-2 text-gray-500 dark:text-gray-400">Already have an account? <Button class="font-medium text-primary-600 hover:underline dark:text-primary-500" variant="outlined"><Link to='/'>Login Here</Link></Button> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration