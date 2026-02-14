"use client"
import Image from "next/image"
import userImage from "@/public/user.png"
import { useSession } from "../lib/auth-client";
import Link from "next/link";


export default function User() {
    const session = useSession();
    if (session.isPending || !session.data) {
        return null
    }

    return (
        <>
            <Link href="/profile" className={`fixed top-1/2 left-0 h-15 w-15 rounded-full ${session.data ? "block" : "hidden"}`}>
                <Image
                    height={100}
                    width={100}
                    className="w-full h-full rounded-full"
                    src={session?.data.user?.image ? session.user.image : userImage}
                    alt={session?.data.user?.name}
                />
            </Link>
        </>
    )
}
