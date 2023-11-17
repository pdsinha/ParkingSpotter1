import Link from "next/link"

export default function Header(){
    return (
    <header class= "flex items-center justify-between">
    <Link class= "text-title2 font-semibold text-2xl" href="">Parking Spotter</Link>
    <nav class= "flex gap-8 text-gray-600-semibold">
    <Link href={''}class = "bg text-black px-8 py-2">Home</Link>
    <Link href={''}class = "bg  text-black px-8 py-2">Map</Link>
    <Link href={''}class = "bg  text-black px-8 py-2">Reports</Link>
    <Link href={''}class = "bg-title rounded-full text-black px-6 py-2">Sign-Up</Link>
    <Link href={''} class = "bg-title rounded-full text-black px-6 py-2">Login</Link>
    
    </nav>
   </header>
    );
}