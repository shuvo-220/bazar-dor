import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg text-center">
        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-8xl font-extrabold tracking-tight text-green-700 sm:text-9xl">
            404
          </h1>

          <div className="mx-auto mt-3 h-1.5 w-20 rounded-full bg-green-500" />
        </div>

        {/* Error Message */}
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          দুঃখিত! পেজটি পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন, সেটি সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে
          অথবা পেজটির অস্তিত্ব নেই।
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-base"
        >
          <span aria-hidden="true">←</span>
          হোমে ফিরে যান
        </Link>

        <p className="mt-6 text-xs text-gray-400">
          বাজার দর — আপনার বাজারের বিশ্বস্ত সঙ্গী
        </p>
      </div>
    </main>
  );
}