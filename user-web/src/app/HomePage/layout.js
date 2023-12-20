'use client'
import SideNav from './sidenav';
import Link from 'next/link';
import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {
  Bars3Icon,
  ShoppingCartIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

export default function RootLayout({ children }) {
  let loginCheck = "";
  if(localStorage.getItem("user")) {
     loginCheck = localStorage.getItem("user")
  }
  const router = useRouter();
  const [search,setSearch] = useState("")
  const handlerSearch = () => {
    router.push(`/SearchPage?name=${search}`);
  }
  return (
      <div className=" flex flex-col space-y-2 space-x-2 w-screen ">
        <div className=" bg-white h-20 p-15 flex w-full items-center justify-between font-medium text-lg text-gray-30">
          <div className="flex flex-row8 justify-center items-center">
          <div className=" flex p-2 w-1/2"><PhoneIcon className="w-8 space-x-2  m-2"/> Liên hệ mua hàng: 911</div>
          <div className="w-1/2 ml-2 mt-2 text-lg"><Link href="/HomePage" className="border-solid border-2 border-black ml-1 p-2 rounded-2xl">Trang chủ</Link></div>
          </div>
          <div className="flex w-2/5  h-1/2"><input onChange={(e) => setSearch(e.target.value)} className="w-full rounded-full bg-gray-200 text-gray-500 p-2" type="text" placeholder="Search" /><MagnifyingGlassIcon onClick={handlerSearch} className="w-8 hover:bg-blue-300 hover: cursor-pointer rounded-3xl"/></div>
          <div className="flex w-2/5 items-center justify-between  ">
            <div className="ml-10  w-1/4 rounded-3xl hover:bg-blue-300 text-center"><Link href="/ShoppingCart"><div className=" pl-10"><ShoppingCartIcon className="w-6"/></div>Giỏ hàng</Link></div>
            <div className="ml-10  w-1/4 rounded-3xl hover:bg-blue-300 text-center"><div className=" pl-10"><InformationCircleIcon className="w-6"/></div>Hỗ trợ</div>
            <div className="ml-10  w-1/4 rounded-3xl hover:bg-blue-300 text-center"><Link href="/AccountInfo"><div className=" pl-10"><UserCircleIcon className="w-6"/></div>Tài Khoản</Link></div>
            {loginCheck && loginCheck!=""? <div className=" w-1/4 text-center"><button onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}>Đăng Xuất</button></div> : <div className=" w-1/4 text-center"><Link href="/login">Login</Link></div>}

          </div>
        </div>
        <div><hr></hr></div>
        <div className="flex flex-row space-x-2 h">
          <div className="flex justify-between flex-col gap-2 font-medium text-sm space-x-0 space-y-0">
            <SideNav/>
            <div className="h-3 w-full grow bg-white"></div>
          </div>
          <div className="grid grid-cols-4 w-screen">{children}</div>
        </div>

        <div><hr></hr></div>
        <div className="bg-white w-screen h-20  flex text-lime-500">
          <div className="w-1/4 text-center">Dịch vụ giao hàng siêu tốc 2H</div>
          <div className="w-1/4 text-center">7 ngày đổi trả</div>
          <div className="w-1/4 text-center">100% chính hãng</div>
          <div className="w-1/4 text-center">Thanh toán dễ dàng</div>
        </div>
      </div>
    );
  }