"use client"
import Image from 'next/image'
import {useState} from 'react'
import axios from 'axios'
import Link from 'next/link';
export default function Registerpage(){
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [creatingUser, setcreatingUser] = useState(false);
    const [userCreated, setusercreated] = useState(false);
    const [error, seterror] = useState(false);
//  Test Case for handling User Creation(Daher)
    function handleFormSubmit(e){
        e.preventDefault();
        setcreatingUser(true);
        axios
        .post(
            "http://localhost:8000/api/users",
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
        })
        .catch((error) => {
            console.log(error.message);
            seterror(true);
        });
        setcreatingUser(false);
        setusercreated(true);
        

    }
    //end of test case

    return(
        <section class="mt-8">
            <h1 class="text-center text-title text-4xl mb-4">
                Register
            </h1>
            {userCreated &&(
                <div class="my-4 text-center">
                    User Created.<br/>
                    Now you can{' '}
                    <Link class="underline" href={'/login'}>Login</Link>
                </div>
            )}
             {error &&(
                <div class="my-4 text-center">
                    An error has occured.<br/>
                    Please try again later{''}
                </div>
            )}

            <form class="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email"
            onChange={e => setemail(e.target.value)}/>
            <input type="password" placeholder="password"
            onChange={e => setpassword(e.target.value)}/>
            <button type="submit">Register</button>
            <div class="my-4 text-center text-gray-500">
                Or login with provider
            </div>
            <button class="flex gap-4 justify-center items-center">
            <Image src={"/google.png"} alt={"google logo"} width={32} height={32}/>
                Login with Google
                </button>
                <div class="text-center my-4 text-gray-500 border-t pt-4">
                   Existing Account?{" "}<Link class= "underline" href={'/login'}>Login Here</Link>
                </div>
            </form>
            
        </section>
    );
}