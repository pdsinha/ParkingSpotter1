import Link from "next/link"

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <nav className="flex items-center gap-8 text-gray-600 font-semibold">
                <Link href="/" className="text-title2 font-semibold text-2xl">Parking Spotter</Link>
                <Link href="/">Home</Link>
                <Link href="/Map">Map</Link>
                <Link href="/Report">Reports</Link>
                <Link href="/about">About</Link>
            </nav>
            <nav className="flex items-center gap-8 text-gray-600 font-semibold">
                <Link href="/login">Login</Link>
                <Link href="/register" className="bg-title rounded-full text-white px-8 py-2">Register</Link>
            </nav>
        </header>
    );
}