import React, { useState, FormEvent } from "react";
import { forgotPasswordEmail } from "../../services/ForgotPasswordService";

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await forgotPasswordEmail({ email });
        alert(response.data);
    };

    return (
        <>
        <div className="App-center-container">
        <div className="loginForm">
            <h1>Put your email (should be from an already registered user)</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
        </div>
        </>
    );
};
