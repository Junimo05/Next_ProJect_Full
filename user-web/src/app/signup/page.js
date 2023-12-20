'use client'
import Link from 'next/link'
import axios from 'axios';
import {useState} from 'react'
export default function Page() {
    const [user,setUser] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone: "",
        city: ""
    });
    const handlerRegister =async () => {
        axios.post('http://localhost:8080/auth/register', user)
        .then(function (response) {
            console.log(response);
            localStorage.setItem("user", response.data.id);
            window.location.replace("/HomePage/");
        })
        .catch(function (error) {
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau!");
        });
    }
    return (
        <>
        <div className="flex flex-row h-screen py-10">
            <div className="grow  w-2/6"></div>
            <div className="flex grow flex-col border-4 border-black rounded-2xl text-center w-2/6 bg-blue-100">
                <div className="pt-10 font-bold text-5xl">Đăng Ký</div>
                <div className=" text-left px-5 text-[24px]">Tài khoản:</div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                ...user,
                username: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                <div className=" text-left px-5 text-[24px]">Mật khẩu:</div>
                <div className=" w-full px-5"><input type="password" onChange={e => setUser({
                ...user,
                password: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                <div className="grid grid-rows-2 grid-cols-2">
                <div className=" text-left px-5 text-[24px]">First name:</div>
                <div className=" text-left px-5 text-[24px]">Last name:</div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                ...user,
                first_name: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                ...user,
                last_name: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                </div>
                <div className=" text-left px-5 text-[24px]">Email:</div>
                <div className=" w-full px-5"><input type="email" onChange={e => setUser({
                ...user,
                email: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md pl-2" /></div>
                <div className=" text-left px-5 text-[24px]">Address:</div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                ...user,
                address: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                <div className=" text-left px-5 text-[24px]">Phone:</div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                ...user,
                phone: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                <div className=" text-left px-5 text-[24px]">City:</div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                ...user,
                city: e.target.value
            })} className="w-full border-2 border-solid border-black rounded-md  pl-2" /></div>
                <div className="flex items-center justify-center  mt-5 h-24"><button onClick={handlerRegister} className="border-2 border-solid border-green-400 bg-green-400 w-3/6 rounded-md font-bold text-[24px] outline-green-500 text-white hover:text-black" >Đăng ký</button></div>
            </div>
            <div className="grow  w-2/6"></div>
        </div>

        </>
    )
}