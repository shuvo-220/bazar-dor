"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (name.trim() === user?.name) {
      toast.info("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setLoading(true);

    try {
      const result = await updateUser({
        name: name.trim(),
      });

      if (result?.error) {
        toast.error(
          result.error.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const result = await signOut();

      if (result?.error) {
        toast.error("সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      setTimeout(() => {
        router.replace("/signin");
        router.refresh();
      }, 1000);
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-sm text-gray-500 sm:text-base">
          লোড হচ্ছে...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-200 p-6 text-center sm:p-8">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            সাইন ইন প্রয়োজন
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            প্রোফাইল দেখতে আগে সাইন ইন করুন।
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন।
          </p>
        </div>

        {/* User Information */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700 sm:h-14 sm:w-14 sm:text-2xl">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* User Details */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-semibold text-gray-800 sm:text-lg">
                  {user.name}
                </h2>
                <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:shrink-0 sm:text-base"
            >
              <span>↩</span>
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </section>

        {/* Update Profile */}
        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
          <div className="mb-5 border-b border-gray-100 pb-4 sm:mb-6">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              ব্যক্তিগত তথ্য
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              এখানে আপনার নাম পরিবর্তন করতে পারবেন।
            </p>
          </div>

          <form onSubmit={handleUpdate}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:px-4 sm:text-base"
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                required
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-base"
              >
                {loading ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;