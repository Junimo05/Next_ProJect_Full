'use client'
import Link from 'next/link';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
export default function Page() {
    const [product, setProduct] = useState();
    useEffect(() => {
        let user = localStorage.getItem("user");
        const fetchData = async () => {
            console.log(user);
            console.log("http://localhost:8080/user/" + user);
            const response = await fetch("http://localhost:8080/user/" + user);
            const data = await response.json();
            setProduct(data);
        }
        fetchData();
        console.log(user)
    }, [])
    return (
        <div>
            <div className="w-full h-[50px] ml-2 mt-2 text-lg"><Link href="/HomePage" className="border-solid border-2 border-black ml-1 p-2 rounded-3xl"> Trở về trang chủ</Link></div>
            <div className="ml-10 font-bold text-3xl">Trang cá nhân</div>
            <div><hr></hr></div>
            <div className="flex flex-row items-center justify-center">
                <div><UserCircleIcon className="w-[250px] h-[250px]" /></div>
                <div className="flex flex-col w-2/3 ">
                    <div className="font-bold text-lg">Thông tin cá nhân</div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">First Name: {product && product.first_name}</div>
                        <div className="w-1/3">Last Name: {product && product.last_name}</div>
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">Tài Khoản: {product && product.username}</div>
                        <div className="w-1/3">Mật Khẩu: ******</div>
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">Email: {product && product.email}</div>
                        <div className="w-1/3">Address: {product && product.address}</div>
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">Phone: {product && product.phone}</div>
                        <div className="w-1/3">City: {product && product.city}</div>
                    </div>
                    <div><button className=" border-4 border-solid rounded-md border-orange-300 bg-orange-300 ml-32 mt-10">Sửa thông tin cá nhân</button></div>
                </div>

            </div>
        </div>
    )
}