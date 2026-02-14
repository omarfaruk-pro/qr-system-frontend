"use client"

import { useState } from "react";
import { useScanData } from "../context/ScanContext";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ImageScan() {
    const [qrCode, setQrCode] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { setScanResult } = useScanData();

    const scan = () => {
        setLoading(true);
        const file = qrCode;
        const formData = new FormData();
        formData.append("file", file);
        fetch(`${process.env.NEXT_PUBLIC_API}/scan-qr`, { method: "POST", body: formData })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setScanResult(data);
                    router.push("/result");
                    setLoading(false);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.message
                    })
                    setLoading(false);
                }
            })
    }
    return (
        <>
            <label className="flex gap-2 items-center">
                <Image src={qrCode ? URL.createObjectURL(qrCode) : "/upload.png"} height={100} width={100} alt="qr" className="shrink h-30 w-30 object-contain" />
                <span className="text-slate-700">{!qrCode ? "Upload QR Code" : qrCode.name}</span>
                <input type="file" hidden onChange={(e) => setQrCode(e.target.files[0])} />
            </label>
            <div className="flex justify-between gap-5">
                <button type="button" disabled={!qrCode || loading} onClick={scan} className="button">{loading ? "Scanning..." : "Scan QR Code"}</button>
                <Link href="/camera" className="button">Scan By Camera</Link>
            </div>
        </>
    )
}
