'use client'
import Image from 'next/image';
import axios from 'axios';
import {useState, useEffect} from 'react';

import {useSearchParams} from 'next/navigation';
export default function Page() {
    const searchParam = useSearchParams();
    const param = searchParam.get("id");
    const [product,setProduct] = useState();
    useEffect(() => {

            const fetchData = async () => {
                const response = await fetch(`http://localhost:8080/product/${param}`);
                const data = await response.json();
                setProduct(data);
            }
            fetchData();

    },[])
    let data = {
        id_Cus: Number(localStorage.getItem("user")) || null,
        id_Staff: Number(localStorage.getItem("user")) || null,
        status: product && product.status,
        total: product && product.price,
    }
    const handlerBuyProduct = async () => {
        console.log(JSON.stringify(data));
        axios.post('http://localhost:8080/order', data)
          .then(function (response) {
            alert("Bạn đã đặt hàng thành công!");
          })
          .catch(function (error) {
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau!");
          });
    }
    return (
        <>
        <div className="flex flex-row w-3/4">
            <div className="w-1/3"><img src={product && product.imageFiles[0]} className=" rounded-3xl w-[500px] h-[500px]"/></div>
            <div className=" w-2/3 ml-10">
                <h1 className="font-bold">Mô tả sản phẩm</h1>
                <hr></hr>
                <div className="h-3/4 flex flex-col w-3/4">
                <div className="">
                    <p>Tên sản phẩm: {product && product.name}</p>
                    <br></br>
                    <p>Chi tiết sản phẩm: {product && product.description}</p>
                    <br></br>
                    <p>Giá tiền: {product && product.price}VNĐ</p>
                </div>
                {/* <div className=" grow border-8">Chi tiết sản phẩm: {product && product.description}</div>
                <div className=" grow border-8">Giá tiền: {product && product.price}VNĐ</div> */}
                </div>
                <div className="flex items-center justify-center my-10 w-full"><button onClick={() => handlerBuyProduct()} className="flex text-center items-center justify-center font-medium text-lg border-2 border-slate-500 rounded-full p-5 h-[50px] w-[200px] bg-red-500 text-white">Đặt mua</button></div>
            </div>
        </div>
        </>
    )
}