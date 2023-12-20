import Link from 'next/link'
export default function Layout({children}) {
    return (
        <>
        <div className="ml-10"><Link href="/HomePage">Trở về trang chủ</Link></div>
        <div className="grid grid-cols-4 w-screen">{children}</div>
        </>
    )
}