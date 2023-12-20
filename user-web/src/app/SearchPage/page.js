'use client'
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
// import {prisma} from '@/app/lib/prisma';
import { PrismaClient } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
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
    const search = useSearchParams();
    const name = search.get("name");
    useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8080/product/search/${name}`);
                const data = await response.json();
                setProduct(data);
            }
            fetchData();
        },[])
    product && console.log(product)
        return (
            <>
        {product &&
            (product.map((product) => {
                return (
                    <>
                    <Link href={`/HomePage/Detail/?id=${product.id_Pro}`}>
                    <div className="flex flex-col items-center border-4 m-5 rounded-md w-[300px] h-[400px]">
                        <div ><img src={product.imageFiles[0]} className="w-[100px] h-[100px]"/></div>
                        <div className=" text-[12pt] text-center">{product.name}</div>
                        <div >Giá tiền: {product.price}</div>
                        <div className="flex">
                        <div>{product.status}</div>
                        <div><ShoppingCartIcon  className="w-6"/></div>
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