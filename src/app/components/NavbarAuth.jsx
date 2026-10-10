"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function NavbarAuth() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const result = await signOut();

      if (result?.error) {
        toast.error(
          result.error.message || "Logout করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      setOpen(false);
      toast.success("সফলভাবে Logout হয়েছে!");

      setTimeout(() => {
        router.replace("/signin");
        router.refresh();
      }, 1500);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Logout করতে সমস্যা হয়েছে।"
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isPending) return null;

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/signin">সাইন ইন</Link>

        <Link
          href="/signup"
          className="rounded-sm bg-green-700 px-3 py-1 font-bold text-white"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-full bg-purple-900 p-3 text-white"
      >
        <span className="text-lg font-semibold">
          {user?.name?.[0]?.toUpperCase() || "U"} ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-md border bg-white py-2 text-gray-800 shadow-lg">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}