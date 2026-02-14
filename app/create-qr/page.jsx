"use client"
import Link from "next/link";
import GenerateQr from "./GenerateQr";
import { useSession } from "../lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


export default function CreateQrPage() {
    const router = useRouter();
    const session = useSession();
    if (session.isPending) {
        return <div className="card mx-auto">
            <p>Loading...</p>
        </div>
    }
    if (!session.data) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "You are not logged in",
        })
        router.push("/login")
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="card">
                    <h2>Create QR Code</h2>
                    <GenerateQr />
                    <Link href="/" className="button">Back to Menu</Link>
                </div>
            </div>
        </>
    )
}
