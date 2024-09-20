import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let login=()=>{
        let payload = {email, password}
        axios.post('http://localhost:5000/login', payload)
        .then((e)=>{
            if(e.data.status == "success"){
                navigate(`/home/${e.data.id}`)
            }
            else if(e.data.status == "fail"){
                alert("Invalid Password")
            }
            else if(e.data.status == "noUser"){
                alert("Invalid Email")
            }
        })
    }

    return (
        <div>
            <div className='bg-white rounded-3xl border-2 border-gray-200 max-w-[1000px]  h-[550px] mx-auto shadow-xl scale-75 p-[30px]'>
            <h1 className='text-center font-semibold text-3xl my-3'>Login to your account</h1>
                <div className=' border-2 rounded-2xl border-gray-600 max-w-[500px] mx-auto my-5 p-5'> 
                <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Email</label><br/>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@gmail.com' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <br />
                <label htmlFor="" className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>Password</label><br/>
                <input placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className='flex flex-col items-center p-3'>
                <p class="text-md font-medium mb-2 text-gray-500 dark:text-gray-400"> Don’t have an account yet?  <Button variant="outlined" class="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to='/register'> Sign Up</Link></Button> </p>
                <br />
                <button class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={login}>Login</button>
                </div>
                </div>
            </div>


        </div>
    )
}

export default Login