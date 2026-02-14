"use client";
import Link from "next/link";
import { useScanData } from "../context/ScanContext";

export default function Resultpage() {
    const { scanResult: data } = useScanData();
    let showResult;
    if (data) {
        if (data.success) {
            showResult = <div className="text-center">
                <p>URL: {data.url}</p>
                <p className="text-lg font-medium mt-2">This QR code is {data.registered ? "Created" : "Not Created"} by our platform. </p>
            </div>
        } else {
            showResult = <p>Your image could not have any QR code</p>
        }
    } else {
        showResult = <div>
            <p>You have not scanned any QR code</p>
        </div>
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="card">
                    {showResult}
                    <Link href="/scan-qr" className="button">Scan QR</Link>
                </div>
            </div>
        </>
    )
}
