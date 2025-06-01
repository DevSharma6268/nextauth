"use client";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function ProfilePage() {
    const router=useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
    try {
        const res = await axios.get("/api/users/me");
        const userId = res.data.data._id;
        setData(userId);
        router.push(`/profile/${userId}`);  // Redirect after setting data
    } catch (error: any) {
        console.log("Error fetching user", error.message);
        toast.error("Failed to fetch user details");
    }
};

    const logout =async()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("logout success")
            router.push("/login")
        } catch (error:any) {
            console.log("logout error",error.message)
            toast.error(error.message)
        }
    }
  return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button type="button"
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button type="button"
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
    )
}

