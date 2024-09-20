import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const CreateEmployee = () => {
    let navigate = useNavigate();
    let [name, setName] = useState("")
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState()
    let [designation, setDesignation] = useState()
    let [gender, setGender] = useState("")
    let [course, setCourse] = useState([])
    let [image, setImage] = useState()
    let [createdAt, setCreatedAt] = useState(new Date().toISOString());

    let formHandle = (e) => {
        e.preventDefault()
        let payload = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            designation: designation,
            gender: gender,
            course: course,
            createdAt: createdAt
        }

        if (!name || !email || !phone || !designation || !gender || !course || !image) {
            alert("To Create Employee Fill all the fields..!")
        }
        else {
            axios.post("http://localhost:5000/employees", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((e) => { alert(e.data) })
                .catch(() => { console.log("Error while registration"); })

            navigate("/employee-list")

        }}

        let handleCourseChange = (e) => {
            const course1 = e.target.value;
            const isChecked = e.target.checked;
            if (isChecked) {
                setCourse(course.concat(course1));
            }
            else {
                setCourse(course.filter(item => item !== course1));
            }
        };

        return (
            <div className='bg-white rounded-3xl border-2 border-gray-200 max-w-[1000px]  h-[900px] mx-auto shadow-xl scale-75 p-[30px]'>
                <h1 className='text-center font-semibold text-3xl my-3'>Create an Employee </h1>
                <div className=' border-2 rounded-2xl border-gray-600 max-w-[500px] mx-auto my-5 p-5'>
                <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Full Name</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='e.g. Deepika Mohan' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Email</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@gmail.com' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Phone No.</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='857******4' type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Designation</label>
                    <select onChange={(e) => { setDesignation(e.target.value); }} name='designation' required class="block appearance-auto w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Gender : </label>
                    <div className='flex justify-evenly'>
                    <input type="radio" id="male" name="gender" value={gender} onChange={(e) => { setGender("Male") }} />
                    <label htmlFor="" className='block text-md font-medium  text-gray-900 dark:text-white'>Male</label>
                    <input type="radio" id="female" name="gender" value={gender} onChange={(e) => { setGender("Female") }} />
                    <label htmlFor="" className='block text-md font-medium  text-gray-900 dark:text-white'>Female</label>
                    </div>
                    <br/>
                    <label htmlFor="" className='block text-md font-medium  text-gray-900 dark:text-white'>Course :</label>
                    <div className='flex justify-evenly p-1'>
                    <input type="checkbox" id="MCA" name="course" value="MCA" checked={course.includes('MCA')} onChange={handleCourseChange} />
                    <label for="MCA" className='block text-md font-medium  text-gray-900 dark:text-white'> MCA </label>
                    <input type="checkbox" id="BCA" name="course" value="BCA" checked={course.includes('BCA')} onChange={handleCourseChange} />
                    <label for="BCA" className='block text-md font-medium  text-gray-900 dark:text-white'> BCA </label>
                    <input type="checkbox" id="BSC" name="course" value="BSC" checked={course.includes('BSC')} onChange={handleCourseChange} />
                    <label for="BSC" className='block text-md font-medium  text-gray-900 dark:text-white'> BSC </label><br />
                    </div>
                    <br/>
                    <label htmlFor="" className='block mb-2 text-md font-medium  text-gray-900 dark:text-white'>Upload Photo</label>
                    <input accept="image/jpeg, image/png" type="file" name='image' onChange={(e) => { setImage(e.target.files[0]) }} /><br /><br/>
                    <input type="hidden" value={createdAt} name="createdAt" />
                    <button class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={formHandle}>Register Me</button>
                </div>

            </div>
        )
    }

    export default CreateEmployee