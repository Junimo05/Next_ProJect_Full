import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default function Page() {
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
                <div className="grow pl-4 h-[50px]">Tên khách hàng:</div>
                <div className="grow pl-4 h-[50px]">SĐT liên hệ:</div>
                <div className="grow pl-4 h-[50px]">Địa chỉ nhận hàng:</div>
                <div className="grow pl-4 h-[50px]">Phương thức thanh toán:</div>
                <div className="grow pl-4 h-[50px]">Phương thức giao hàng: </div>
                <div className="flex grow items-center justify-center  mt-5 h-24"><button className="border-2 border-solid border-green-400 bg-green-400 w-3/6 rounded-md font-bold text-[24px] outline-green-500 text-white hover:text-black">Đặt Mua</button></div>             
            </div>
        </div>
        </>
    )
}