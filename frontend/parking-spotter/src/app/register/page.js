"use client"
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link';

export default function Registerpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    // Email validation function
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[c][o][m]$/;
        return regex.test(email);
    }

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailValid(validateEmail(emailValue));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!isEmailValid) {
            setError(true);
            return;
        }
        setCreatingUser(true);
        axios.post(/* ... axios request ... */)
            .then(/* ... handle response ... */)
            .catch(/* ... handle error ... */);
        setCreatingUser(false);
        setUserCreated(true);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-title text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User Created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br />
                    Please try again later{''}
                </div>
            )}

            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email"
                    onChange={handleEmailChange} />
                <input type="password" placeholder="password"
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit">Register</button>
                {!isEmailValid && <div className="text-red-500">Invalid email address</div>}
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing Account?{" "}<Link className="underline" href={'/login'}>Login Here</Link>
                </div>
            </form>
        </section>
    );
}