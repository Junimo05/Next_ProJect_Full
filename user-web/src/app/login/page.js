'use client'
import Link from 'next/link'
import axios from 'axios';
import { useState } from 'react'
export default function Page() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const handlerSubmit = async () => {
        axios.post('http://localhost:8080/auth/login', user)
            .then(function (response) {
                console.log(response);
                localStorage.setItem("user", response.data.id);
                window.location.replace("/HomePage/");
            })
            .catch(function (error) {
                alert("Sai thông tin! Vui lòng đăng nhập lại!");
            });
    }
    return (
        <div className="flex flex-row h-screen py-10">
            <div className="grow  w-2/6"></div>
            <div className="flex grow flex-col border-4 border-black rounded-2xl text-center w-2/6 bg-blue-100">
                <div className="pt-10 font-bold text-5xl mb-10">Đăng Nhập</div>
                <div className=" text-left px-5 text-[24px]">Tài khoản:</div>
                <div className=" w-full px-5"><input type="text" onChange={e => setUser({
                    ...user,
                    username: e.target.value
                })} className="w-full border-2 border-solid border-black rounded-md py-2 pl-2" /></div>
                <div className=" text-left px-5 pt-10 text-[24px]">Mật khẩu:</div>
                <div className=" w-full px-5"><input type="password" onChange={e => setUser({
                    ...user,
                    password: e.target.value
                })} className="w-full border-2 border-solid border-black rounded-md py-2 pl-2" /></div>
                <div className="flex items-center justify-center  mt-5 h-24"><button className="border-2 border-solid border-green-400 bg-green-400 w-3/6 rounded-md font-bold text-[24px] outline-green-500 text-white hover:text-black" onClick={handlerSubmit}>Đăng nhập</button></div>
                <div className=""><Link className="hover:text-blue-500" href="/signup">Đăng ký</Link></div>
            </div>
            <div className="grow  w-2/6"></div>
        </div>
    )
}