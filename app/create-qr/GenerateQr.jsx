"use client"

import { useEffect, useState } from "react";
import { useSession } from "../lib/auth-client";
import Image from "next/image";
import Swal from "sweetalert2";

export default function GenerateQr() {
    const [urlInput, setUrlInput] = useState('');
    const [qrImg, setQrImg] = useState();
    const session = useSession();

    const generate = () => {
        fetch(`${process.env.NEXT_PUBLIC_API}/generate-qr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: urlInput, email: session.data.user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUrlInput('');
                    setQrImg(data.qr_base64);
                }
            })
    }

    const handleShare = async () => {
        try {
            const response = await fetch(`data:image/png;base64,${qrImg}`);
            const blob = await response.blob();

            const file = new File([blob], "qr-code.png", {
                type: "image/png",
            });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: "QR Code",
                    text: "Here is your QR Code",
                    files: [file],
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Share not supported",
                })
            }

        } catch (err) {
            console.log("Share failed:", err);
        }
    };

    return (
        <>
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter URL" />
            <div className="flex items-center justify-center">
                {
                    qrImg && (
                        <Image src={`data:image/png;base64,${qrImg}`} width={300} height={300} alt="QR Code" />
                    )
                }
            </div>
            {
                qrImg ? (<div className="flex gap-2">
                    <a
                        href={`data:image/png;base64,${qrImg}`}
                        download={`qr-code-${new Date().getTime()}.png`}
                        className="button block mt-3"
                    >
                        Download PNG
                    </a>
                    <button
                        onClick={handleShare}
                        className="button"
                    >
                        Share
                    </button>
                </div>
                ) : <button type="button" disabled={!urlInput} className="button" onClick={generate}>Generate QR Code</button>
            }

        </>
    )
}

