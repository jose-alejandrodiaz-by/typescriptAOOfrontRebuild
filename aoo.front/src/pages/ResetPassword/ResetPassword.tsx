import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/ForgotPasswordService';

export function ResetPassword() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = decodeURIComponent(params.get('token') || '');
    const email = decodeURIComponent((params.get('email') || '').replace("*", "@"));
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (password === passwordConfirmation) {
                const response = await resetPassword({ email, token, password });
                if (response.status === 204) {
                    alert("Password was reset successfully");
                }
                setPassword('');
                setPasswordConfirmation('');
            } else {
                alert("Please fill both fields with the same password");
            }
        } catch (error) {
            console.log("Something went wrong while calling the reset password feature");
            throw error;
        }
    };

    return (
        <>
        <div className='App-center-container'>
        <div className="loginForm">
            <h1>Hi {email}, please enter a new password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    value={passwordConfirmation}
                    placeholder="Password"
                    onChange={e => setPasswordConfirmation(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
        </>
    );
}
