'use client'
import Link from 'next/link'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();
import {useState, useEffect, useRef} from 'react';
export default function Page() {
    const [product,setProduct] = useState();
    useEffect(() => {
        let user = localStorage.getItem("user");
        const fetchData = async () => {
            console.log(user);
            console.log("http://localhost:8080/user/"+ user);
            const response = await fetch("http://localhost:8080/user/"+ user);
            const data = await response.json();
            setProduct(data);
        }
        fetchData();
    },[])
    return (
        <>
        <div className="w-full h-[50px] ml-2 mt-2 text-lg"><Link href="/HomePage" className="border-solid border-2 border-black ml-1 p-2 rounded-3xl"> Trở về trang chủ</Link></div>
        <div className="flex flex-row w-full h-full border-2 border-solid border-black rounded-3xl p-4">
            <div className="flex flex-col w-1/2 h-full ">
                <div className="font-bold text-lg">Danh sách sản phẩm:</div>
                <div className="flex flex-col w-4/5 border-2 border-solid border-black rounded-3xl grow p-5 m-5">
                    <div className="grow">Sản phẩm 1</div>
                    <div className="grow">Tên sản phẩm:</div>
                    <div className="grow">Giá tiền:</div>
                    <div className="grow">Số lượng:</div>
                </div>
                <div className="flex flex-col w-4/5 border-2 border-solid border-black rounded-3xl grow p-5 m-5">
                    <div className="grow">Sản phẩm 2</div>
                    <div className="grow">Tên sản phẩm:</div>
                    <div className="grow">Giá tiền:</div>
                    <div className="grow">Số lượng:</div>
                </div>
                <div className="flex flex-col w-4/5 border-2 border-solid border-black rounded-3xl grow p-5 m-5">
                    <div className="grow">Sản phẩm 3</div>
                    <div className="grow">Tên sản phẩm:</div>
                    <div className="grow">Giá tiền:</div>
                    <div className="grow">Số lượng:</div>
                </div>
            </div>
            <div className="flex flex-col w-1/2 h-full  pl-4">
                <div className="font-bold text-lg h-[50px]">Thông tin khách hàng</div>
                <div className="grow pl-4 h-[50px]">Tên khách hàng: {product && product.first_name +" "+ product.last_name }</div>
                <div className="grow pl-4 h-[50px]">SĐT liên hệ: {product && product.phone}</div>
                <div className="grow pl-4 h-[50px]">Địa chỉ nhận hàng: {product && product.address}</div>
                <div className="grow pl-4 h-[50px]">Phương thức thanh toán: 
                <select className="text-center border-black hover:bg-blue-200 rounded-md border-2">
                    <option>Chuyển khoản</option>
                    <option>Thanh toán khi nhận hàng</option>
                </select>
                </div>
                <div className="grow pl-4 h-[50px]">Phương thức giao hàng: 
                <select className="text-center border-black hover:bg-blue-200 rounded-md border-2">
                    <option>Giao hàng tiết kiệm</option>
                    <option>Giao hàng nhanh</option>
                    <option>Giao hàng hỏa tốc</option>
                </select></div>
                <div className="flex grow items-center justify-center  mt-5 h-24"><button className="border-2 border-solid border-green-400 bg-green-400 w-3/6 rounded-md font-bold text-[24px] outline-green-500 text-white hover:text-black">Đặt Hàng</button></div>             
            </div>
        </div>
        </>
    )
}