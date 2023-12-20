import Link from 'next/link'
export default function LayOut({children}) {
    return (
        <>
        <div className="w-screen">{children}</div>
        </>
    )
}