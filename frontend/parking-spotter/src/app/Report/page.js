'use client';
import {useState} from 'react';
import Image from 'next/image';
import axios from 'axios'
import Link from 'next/link';
export default function Report(){
const [location, setlocation] = useState('');
const [reportcomplete, setreportcomplete] = useState(false);
function handleFormSubmit(e){
    e.preventDefault();
    setreportcomplete(false);
    axios
    .post(
        "http://localhost:8000/api/crashReports",
        {
           location: location
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    )
    .then((response) => {
        console.log(response);
       
    })
    .catch((error) => {
        console.log(error.message);
    });

    setreportcomplete(true);

    

}
    return(
        <section class="mt-8">
        <h1 class="text-center text-title text-4xl mb-4">
            Report Portal
        </h1>
        {reportcomplete &&(
                <div class="my-4 text-center">
                    Report Created at {" "} {location}.<br/>
                    Now you can view the{' '}
                    <Link class="underline" href={'/map'}>Map</Link>
                </div>
            )}


        <form class="max-w-xs mx-auto">
            <input type="text" placeholder="Location"
            onChange={e => setlocation(e.target.value)}/>
            <button onClick={handleFormSubmit} type="submit">Submit</button>

        </form>
       
        </section>
    );
}