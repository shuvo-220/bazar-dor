"use client";

import { signIn, signUp } from "@/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const { data: resData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password
        });
    };

    const handleGoogleSignIn = async (e) => {
        const data = await signIn.social({
            provider: "google",
        });
    }

    const handleGitHubSignIn=async(e)=>{
        const data = await signIn.social({
            provider:'github'
        })
    }

    const fieldClass = "flex w-full flex-col gap-2";
    const labelClass = "text-sm font-semibold text-gray-700";
    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    return (
        <div className="flex min-h-screen items-start justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                {/* Heading */}
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>

                {/* Signup Form */}
                <Form
                    className="flex w-full flex-col gap-5"
                    onSubmit={onSubmit}
                >
                    {/* Name */}
                    <TextField
                        className={fieldClass}
                        isRequired
                        name="name"
                        type="text"
                        minLength={2}
                        validate={(value) =>
                            value.trim().length < 2
                                ? "Name must be at least 2 characters"
                                : null
                        }
                    >
                        <Label className={labelClass}>নাম</Label>
                        <Input
                            placeholder="Enter your full name"
                            className={inputClass}
                        />
                        <FieldError />
                    </TextField>

                    {/* Email */}
                    <TextField
                        className={fieldClass}
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) =>
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                                ? null
                                : "Please enter a valid email address"
                        }
                    >
                        <Label className={labelClass}>ইমেইল</Label>
                        <Input
                            placeholder="john@example.com"
                            className={inputClass}
                        />
                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        className={fieldClass}
                        isRequired
                        name="password"
                        type="password"
                        minLength={8}
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain an uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label className={labelClass}>পাসওয়ার্ড</Label>
                        <Input
                            placeholder="Enter your password"
                            className={inputClass}
                        />
                        <Description className="text-xs text-gray-500">
                            At least 8 characters, 1 uppercase letter, and 1 number.
                        </Description>
                        <FieldError />
                    </TextField>

                    {/* Signup Button */}
                    <Button
                        type="submit"
                        className="mt-1 w-full rounded-lg bg-[#05893E] py-3 font-semibold text-white hover:bg-green-900"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </Button>
                </Form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-500">
                        OR CONTINUE WITH
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="bordered"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleGoogleSignIn}
                    >
                        <FaGoogle />
                        Google দিয়ে চালিয়ে যান
                    </Button>

                    <Button
                        type="button"
                        variant="bordered"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleGitHubSignIn}
                    >
                        <FaGithub />
                        GitHub দিয়ে চালিয়ে যান
                    </Button>
                </div>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;

