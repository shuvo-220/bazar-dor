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
import { toast } from "react-toastify";

const SignInPage = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const fieldClass = "flex w-full flex-col gap-2";
    const labelClass = "text-sm font-semibold text-gray-700";

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    // Email and Password Login
    const onSubmit = async (e) => {
        e.preventDefault();

        if (isLoading || socialLoading) return;

        setErrorMessage("");
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            const email = formData.get("email");
            const password = formData.get("password");

            if (!email || !password) {
                toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
                return;
            }

            const result = await signIn.email({
                email: String(email),
                password: String(password),
                rememberMe: true,
            });

            if (result?.error) {
                const message =
                    result.error.message ||
                    "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";

                setErrorMessage(message);
                toast.error(message);
                return;
            }

            // Show success notification before redirect
            toast.success("সফলভাবে সাইন ইন হয়েছে!");

            // Redirect after toast appears
            window.setTimeout(() => {
                window.location.assign("/");
            }, 1500);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Google Login
    const handleGoogleSignIn = async () => {
        if (isLoading || socialLoading) return;

        setErrorMessage("");
        setSocialLoading("google");

        try {
            const result = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (result?.error) {
                const message =
                    result.error.message ||
                    "Google দিয়ে সাইন ইন করা যায়নি।";

                setErrorMessage(message);
                toast.error(message);
                setSocialLoading("");
            }
        } catch {
            const message =
                "Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";

            setErrorMessage(message);
            toast.error(message);
            setSocialLoading("");
        }
    };

    // GitHub Login
    const handleGithubSignIn = async () => {
        if (isLoading || socialLoading) return;

        setErrorMessage("");
        setSocialLoading("github");

        try {
            const result = await signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (result?.error) {
                const message =
                    result.error.message ||
                    "GitHub দিয়ে সাইন ইন করা যায়নি।";

                setErrorMessage(message);
                toast.error(message);
                setSocialLoading("");
            }
        } catch {
            const message =
                "GitHub দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";

            setErrorMessage(message);
            toast.error(message);
            setSocialLoading("");
        }
    };

    return (
        <div className="flex min-h-screen items-start justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    সাইন ইন
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>

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
                    >
                        <Label className={labelClass}>পাসওয়ার্ড</Label>
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
                        isDisabled={isLoading || !!socialLoading}
                        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                    </Button>
                </Form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                        type="button"
                        variant="bordered"
                        isDisabled={isLoading || !!socialLoading}
                        onPress={handleGoogleSignIn}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <FaGoogle />
                        {socialLoading === "google"
                            ? "অপেক্ষা করুন..."
                            : "Google দিয়ে চালিয়ে যান"}
                    </Button>

                    <Button
                        type="button"
                        variant="bordered"
                        isDisabled={isLoading || !!socialLoading}
                        onPress={handleGithubSignIn}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <FaGithub />
                        {socialLoading === "github"
                            ? "অপেক্ষা করুন..."
                            : "GitHub দিয়ে চালিয়ে যান"}
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
