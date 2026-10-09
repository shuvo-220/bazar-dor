
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function NavbarAuth() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();


const handleLogout = async () => {
  await signOut();
  setOpen(false);
  router.replace("/signin");
  router.refresh();
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
        onClick={() => setOpen(!open)}
        className="p-3 text-white bg-purple-900 rounded-full"
      >
        <span className="text-lg font-semibold">{user?.name[0]} ▾</span>
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
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

