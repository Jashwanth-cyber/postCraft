"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (res?.ok) {
            router.push("/dashboard");
        } else if (res?.error) {
            setError("Wrong Username or password");
        } else {
            setError("Sign in failed");
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col p-2 ">
            <div className="flex justify-center py-4">
                <form onSubmit={handleSubmit} className="block max-w-sm px-10 py-6 bg-white border-t-6 border-red-800 rounded-lg shadow">
                    <div>
                        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h1>
                        <p className="text-sm text-center text-gray-600 mt-2">Sign in to continue</p>
                        <div className="pt-2">
                            <LabelledInput
                                label="EMAIL"
                                placeholder="xyz@gmail.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <LabelledInput
                                label="PASSWORD"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    id="show-password"
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword((prev) => !prev)}
                                    className="mr-2"
                                />
                                <label htmlFor="show-password" className="text-sm text-gray-600 select-none">
                                    Show Password
                                </label>
                            </div>
                            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                            <button type="submit" className="mt-8 w-full text-white bg-red-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign In</button>
                            <p className="mt-4 text-center text-sm text-gray-600">
                                Don&apos;t have an account?
                                <Link href="/register" className="text-blue-800 underline">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

type LabelledInputProps = {
    label: string;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function LabelledInput({ label, placeholder, type, value, onChange }: LabelledInputProps) {
    return <div>
        <label className="block mb-2 text-sm text-gray-500 font-semibold pt-4">{label}</label>
        <input
            type={type || "text"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
            placeholder={placeholder}
            required
            value={value}
            onChange={onChange}
        />
    </div>
}