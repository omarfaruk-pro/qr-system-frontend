import Link from "next/link";

export default function Home() {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card">
          <h2 className="text-xl font-bold">Choose your option</h2>
          <Link href="/create-qr" className="button">Create QR Code</Link>
          <Link href="/scan-qr" className="button">Scan QR Code</Link>
        </div>
      </div>
    </>
  )
}
