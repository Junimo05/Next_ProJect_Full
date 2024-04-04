'use client';
import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
export default function SideNav() {
    const pathname = usePathname();
    const [product,setProduct] = useState();
    let data  = useRef();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/category");
            const data = await response.json();
            setProduct(data);
        }
        fetchData();
    },[])
    const handlerNav = (name) => {
        localStorage.setItem("nav", name);
        console.log(localStorage.getItem("nav"));
        window.location.replace("/HomePage/");
    }
    return (
        <>
            {product && product.map((link) => {
                return (
                    <div onClick={() => handlerNav(link.name)}
                        key={link.name}
                        className={clsx("flex  h-[40px] bg-gray-200  rounded-md items-center text-center justify-center md:p-2 md:px-3 gap-2 ",
                         )}
                        >
                                <p>{link.name}</p>
                        </div>
                );
            })}
        </>
    );
}