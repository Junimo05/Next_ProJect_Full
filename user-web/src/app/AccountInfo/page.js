import Link from 'next/link';
import Image from 'next/image';
// function Button() {
//     return (
//         <div>Sửa thông tin cá nhân</div>
//     )
// }
export default function Page() {
    return(
        <div>
            <div className="w-full h-[50px] ml-2 mt-2 text-lg"><Link href="/HomePage" className="border-solid border-2 border-black ml-1 p-2 rounded-3xl"> Trở về trang chủ</Link></div>
            <div className="ml-10 font-bold text-3xl">Trang cá nhân</div>
            <div><hr></hr></div>
            <div className="flex flex-row">
                <div><img src="" className="h-[400px] w-[300px] m-10" /></div>
                <div className="flex flex-col w-2/3 ">
                    <div className="font-bold text-lg">Thông tin cá nhân</div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">First Name:</div>
                        <div className="w-1/3">Last Name:</div>
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">Tài Khoản:</div>
                        <div className="w-1/3">Mật Khẩu:</div>
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">Email: </div>
                        <div className="w-1/3">Address:</div> 
                    </div>
                    <div className="flex flex-row m-5">
                        <div className="w-1/3">Phone:</div>
                        <div className="w-1/3">City:</div>  
                    </div>
                    <div><button className=" border-4 border-solid rounded-md border-orange-300 bg-orange-300 ml-32 mt-10">Sửa thông tin cá nhân</button></div>
                </div>

            </div>
        </div>
    )
}