import React from "react";
import banner from "../../../public/bazar-hero.png";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="my-5 w-full overflow-hidden rounded-2xl bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
            <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 md:flex-row">

                {/* Banner Content */}
                <div className="w-full md:w-3/5">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 sm:text-sm">
                        {date}
                    </span>

                    <h1 className="py-3 text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <div className="pt-5">
                        <Link
                            href="/#all-products"
                            className="inline-block rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800 sm:text-base"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>

                {/* Banner Image */}
                <div className="flex w-full justify-center md:w-2/5 md:justify-end">
                    <Image
                        src={banner}
                        alt="আজকের বাজারের দাম"
                        priority
                        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 355px"
                        className="h-auto w-full max-w-[260px] object-contain sm:max-w-[300px] md:max-w-[320px] lg:max-w-[355px]"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;
