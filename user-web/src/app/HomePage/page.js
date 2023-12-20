'use client'
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
// import {prisma} from '@/app/lib/prisma';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {
    ShoppingCartIcon,
  } from '@heroicons/react/24/outline';

export default function Page({id}) {
    // const initialProducts = await prisma.product.findMany();
    if(!localStorage.getItem("nav")) {
        localStorage.setItem("nav", 0); 
    }
    const [product,setProduct] = useState();
    let data  = useRef();
    useEffect(() => {
        let navData = localStorage.getItem("nav");
        if(navData==0) {
            const fetchData = async () => {
                const response = await fetch("http://localhost:8080/product");
                const data = await response.json();
                setProduct(data);
            }
            fetchData();
        }
        else {
            const fetchData = async () => {
                console.log(navData);
                console.log("http://localhost:8080/product/categorys/"+ navData);
                const response = await fetch("http://localhost:8080/product/categorys/"+ navData);
                const data = await response.json();
                setProduct(data);
            }
            fetchData();
        }

    },[])
    product?.products && setProduct(product.products)
    product && console.log(product)
        return (
            <>
        {product &&
            (product.map((product) => {
                return (
                    <>
                    <Link href={`/HomePage/Detail/?id=${product.id_Pro}`}>
                    <div className="flex flex-col items-center text-center border-2 border-black border-solid m-5 rounded-3xl w-[300px] h-[400px]">
                        <div className=" w-full h-[250px] "><img src={product.imageFiles[0]} className="w-full h-full rounded-tl-3xl rounded-tr-3xl"/></div>
                        <div className=" text-[12pt] text-center  w-full h-[50px]">{product.name}</div>
                        <div className="  w-full h-[50px]" >Giá tiền: {product.price}</div>
                        <div className="flex  w-full text-center items-center justify-center h-[50px]">
                        <div className="">{product.status}</div>
                        <div className=""><ShoppingCartIcon  className="w-6"/></div>
                        </div>
                    </div>
                    </Link>
                    </>
                );
            }))
            }
             <div></div>
            </>

        )
    }