"use client";

import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useScanData } from "../context/ScanContext";
import Swal from "sweetalert2";

export default function ScanCameraPage() {
    const [scanning, setScanning] = useState(false);
    const qrRef = useRef(null);
    const router = useRouter();
    const { setScanResult } = useScanData();

    const startScanner = async () => {
        if (qrRef.current) return;

        const html5QrCode = new Html5Qrcode("reader");
        qrRef.current = html5QrCode;

        try {
            setScanning(true);

            await html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 300, height: 300 },
                    aspectRatio: 1.0
                },
                async (decodedText) => {



                    try {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/scan-qr-url`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ url: decodedText })
                        });

                        const data = await res.json();
                        setScanResult(data);
                        await html5QrCode.stop();
                        qrRef.current = null;
                        setScanning(false);
                        router.push("/result");

                    } catch (err) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to process QR"
                        });
                    }
                }
            );
        } catch (err) {
            setScanning(false);
            qrRef.current = null;
            Swal.fire({
                icon: "error",
                title: "Camera Error",
                text: "Cannot access camera"
            });
        }
    };

    const stopScanner = async () => {
        if (qrRef.current) {
            await qrRef.current.stop();
            qrRef.current = null;
            setScanning(false);
        }
    };

    return (
        <div className="card">
            <div className="flex flex-col items-center mt-10 gap-6">
                <h1 className="text-2xl font-bold">Camera QR Scanner</h1>

                <div className={`relative w-75 h-75 ${scanning ? "" : "hidden"}`}>
                    <div id="reader" className="w-full h-full rounded-xl overflow-hidden" />

                    {scanning && (
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 border-4 border-green-500 rounded-xl" />
                            <div className="scan-line absolute left-0 w-full h-1 bg-green-400" />
                        </div>
                    )}
                </div>

                {!scanning ? (
                    <button
                        onClick={startScanner}
                        className="button mt-4"
                    >
                        Open Camera
                    </button>
                ) : (
                    <button
                        onClick={stopScanner}
                        className="button mt-4"
                    >
                        Stop Camera
                    </button>
                )}
            </div>
        </div>
    );
}
