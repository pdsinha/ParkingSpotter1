import Image from 'next/image'
import Right from "@/components/icons/Right"
import Link from 'next/link';
export default function Hero(){
    return (
        <section class = "hero mt-4">
            <div class="py-12">
                <h1 class = "text-4xl font-semibold">Spot, Park, Go! 
                <br />
                Your 
                Parking <span class="text-title">Solution.</span></h1>
                <p class= "my-4 text-subtitle text-md">
                Never waste a minute searching for parking again with our intuitive spotter app find available parking spots effortlessly!"
                </p>
                <div class="flex gap-4">
                    <Link href={'/Report'} className= "flex items-center gap-2  bg-title text-white px-4 py-2 rounded-full">Place a Report
                    <Right/>
                    </Link>
                    <Link href={'/map'} className="flex gap-2 py-2 text-gray-600 font-semibold">View Map
                    <Right/>
                    </Link>
                    
                </div>
                


            </div>
            <div class="relative mt-4">

            <Image src={'/carpic.jpg'} alt={"car"} layout={"fill"} objectFit={"contain"}/>


            </div>
       
        </section>
        
    );


}