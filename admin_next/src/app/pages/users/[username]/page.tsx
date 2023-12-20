'use client'
import UserFormEdit from "@/components/Form/form_User";
import { useSearchParams } from "next/navigation";

export default function UserPage() {
    const searchParams = useSearchParams()
    const result = searchParams.get('data')
    if (!result) {
        return (
            <div className="container mx-auto py-10 text-center align-middle">
                Can not get data
            </div>
        )
    }

    // console.log(result);
    const user = JSON.parse(result);

    // console.log(user);

    return (
        <section className="container mx-auto py-10">
            <div className="border-solid border-2 border-white py-10 px-10">
                <UserFormEdit
                    id_User={user.id_User}
                    username={user.username}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    address={user.address}
                    city={user.city}
                    email={user.email}
                    phone={user.phone}
                    role={user.role}
                    status={user.status}
                />
            </div>
        </section>
    )
}