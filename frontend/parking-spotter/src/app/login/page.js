'use client';
import {useState} from 'react';
import Image from 'next/image';
import axios from 'axios'
export default function LoginPage(){
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [loginInProgress, setloginInProgress] = useState(false);
//Test Case that Authenticates Logins(Daher)
function handleFormSubmit(e){
    e.preventDefault();
    setloginInProgress(true);
    axios
    .post(
        "http://localhost:8000/api/users/login",
        {
            email: email,
            password: password
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    )
    .then((response) => {
        console.log(response);
        setloginInProgress(false);
    })
    .catch((error) => {
        console.log(error.message);
    });

    

}
    return(
        <section class="mt-8">
        <h1 class="text-center text-title text-4xl mb-4">
            Login
        </h1>
        <form class="max-w-xs mx-auto">
            <input type="email" placeholder="email"
            onChange={e => setemail(e.target.value)}/>
            <input type="password" placeholder="password"
            onChange={e => setpassword(e.target.value)}/>
            <button onClick={handleFormSubmit}type="submit">Login</button>
            <div class="my-4 text-center text-gray-500">
                Or login with provider
            </div>
            <button class="flex gap-4 justify-center items-center">
            <Image src={"/google.png"} alt={"google logo"} width={32} height={32}/>
                Login with Google
                </button>

        </form>
       
        </section>
    );
}