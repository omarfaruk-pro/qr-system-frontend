
import Link from "next/link";
import ImageScan from "./ImageScan";

export default function ScanQr() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="card">
                    <h2 className="text-xl font-semibold">Scan QR Code</h2>
                    <ImageScan />
                    <Link className="button" href="/">Back to Menu</Link>
                </div>
            </div>
        </>
    )
}
