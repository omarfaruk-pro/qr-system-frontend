
import { headers } from "next/headers"
import { auth } from "../lib/auth"
import Image from "next/image";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-3xl p-8 flex-1 text-center">
                    <h2 className="text-3xl font-semibold mb-2">Profile</h2>
                    <p className="text-gray-800 mb-1">You are not logged in</p>
                </div>
            </div>
        )
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user-qrs?email=${session.user.email}`)
    const data = await res.json();
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-3xl p-8 flex-1 text-center">
                    <h2 className="text-3xl font-semibold mb-2">Profile</h2>
                    <p className="text-gray-800 mb-1">Name: {session.user.name}</p>
                    <p className="text-gray-600 mb-1">Email: {session.user.email}</p>
                    <p className="text-gray-700 mb-1 text-sm">My Generated QR codes: {data.count}</p>

                    <div className="grid grid-cols-4 gap-3 mt-5">
                        {(data.success && data.count > 0) ? (
                            data.data.map(qr => (
                                <div key={qr._id} className=" rounded-lg shadow-md">
                                    <a
                                        href={`data:image/png;base64,${qr.qr_base64}`}
                                        download={`qr-code-${new Date().getTime()}.png`}
                                        title="Download your qr code"
                                    >
                                        <Image width={300} height={300} src={`data:image/png;base64,${qr.qr_base64}`} alt="qr code" className="w-full" />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-4">No QR codes found</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
