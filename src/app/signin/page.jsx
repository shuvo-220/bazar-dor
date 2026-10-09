"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fieldClass = "flex w-full flex-col gap-2";

    const labelClass = "text-sm font-semibold text-gray-700";

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    // Email and Password Login
    const onSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const result = await signIn.email({
                email: email.toString(),
                password: password.toString(),
                rememberMe: true,
            });

            if (result?.error) {
                setErrorMessage(
                    result.error.message ||
                        "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
                );
                return;
            }

            // Successful login হলে homepage-এ redirect
            router.replace("/");
            router.refresh();

        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Google Login
    const handleGoogleSignIn = async () => {
        setErrorMessage("");

        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch {
            setErrorMessage(
                "Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
            );
        }
    };

    // GitHub Login
    const handleGithubSignIn = async () => {
        setErrorMessage("");

        try {
            await signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch {
            setErrorMessage(
                "GitHub দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-start justify-center px-4 py-10">

            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                {/* Heading */}
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    সাইন ইন
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>

                {/* Sign In Form */}
                <Form
                    className="flex w-full flex-col gap-5"
                    onSubmit={onSubmit}
                >

                    {/* Email */}
                    <TextField
                        className={fieldClass}
                        isRequired
                        name="email"
                        type="email"
                    >
                        <Label className={labelClass}>
                            ইমেইল
                        </Label>

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
                    >
                        <Label className={labelClass}>
                            পাসওয়ার্ড
                        </Label>

                        <Input
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            className={inputClass}
                        />

                        <FieldError />
                    </TextField>

                    {/* Error Message */}
                    {errorMessage && (
                        <p
                            role="alert"
                            className="w-full rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            {errorMessage}
                        </p>
                    )}

                    {/* Sign In Button */}
                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                    </Button>

                </Form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-xs text-gray-500">
                        অথবা
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {/* Google */}
                    <Button
                        type="button"
                        variant="bordered"
                        onPress={handleGoogleSignIn}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <FaGoogle />
                        Google দিয়ে চালিয়ে যান
                    </Button>

                    {/* GitHub */}
                    <Button
                        type="button"
                        variant="bordered"
                        onPress={handleGithubSignIn}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <FaGithub />
                        GitHub দিয়ে চালিয়ে যান
                    </Button>

                </div>

                {/* Sign Up Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}

                    <Link
                        href="/signup"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        সাইন আপ
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignInPage;

