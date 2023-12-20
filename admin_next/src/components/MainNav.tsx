"use client"

import * as React from "react"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function MainNav() {
  const [user, setUser] = React.useState<any>();
  const router = useRouter();
  React.useEffect(() => {
    if (sessionStorage.getItem("users")) {
      const user: any = sessionStorage.getItem("users");
      setUser(JSON.parse(user));
    }
  }, [])

  // console.log(user);
  return (

    <nav className="p-2 min-w-full h-15 inline-flex">
      <div className="flex-1 items-center gap-3 font-semibold ml-5">
        <img src="https://i.imgur.com/Bz81bkX.png" />
      </div>
      {user &&
        <>
          <div className="m-2 flex gap-2 float-right">
            Hello , {user.name}
          </div>
          <Button variant={"outline"} onClick={() => {
            sessionStorage.removeItem("users")
            router.push("/login")
          }}>
            Logout
          </Button>
        </>
      }
    </nav>
  )
}


