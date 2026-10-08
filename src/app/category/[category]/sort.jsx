"use client";

import { useRouter } from "next/navigation";

const Sort = ({ category, currentSort }) => {

    const router = useRouter();

    const handleSort = (e) => {

        const value = e.target.value;

        if (value === "default") {
            router.push(`/category/${category}`);
            return;
        }

        router.push(`/category/${category}?sort=${value}`);
    };

    return (
        <select
            value={currentSort}
            onChange={handleSort}
            className="border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-600 outline-none bg-white"
        >

            <option value="default">
                ডিফল্ট
            </option>

            <option value="low">
                দাম: কম থেকে বেশি
            </option>

            <option value="high">
                দাম: বেশি থেকে কম
            </option>

        </select>
    );
};

export default Sort;