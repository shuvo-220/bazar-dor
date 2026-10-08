import Link from "next/link";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Sort from './sort';

const CategoryPage = async ({ params, searchParams }) => {

    const { category } = await params;
    const { sort } = await searchParams;

    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    const allProducts = data?.data || data;

    // Category অনুযায়ী product filter
    const products = allProducts.filter(
        (product) => product.category === category
    );

    // Copy করে sort করার জন্য নতুন array
    const sortedProducts = [...products];

    // দাম: কম থেকে বেশি
    if (sort === "low") {
        sortedProducts.sort((a, b) => a.today - b.today);
    }

    // দাম: বেশি থেকে কম
    if (sort === "high") {
        sortedProducts.sort((a, b) => b.today - a.today);
    }

    return (
        <section className="container mx-auto px-4 py-10">

            {/* Category Name */}
            <h2 className="mb-6 text-2xl font-bold">
                {products[0]?.categoryNameBn || "পণ্য"}
            </h2>

            {/* Total Product + Sort */}
            <div className="flex items-center justify-between mb-5">

                <h3 className="text-gray-500 font-semibold">
                    মোট {products.length} পণ্য দেখানো হচ্ছে
                </h3>

                <Sort
                    category={category}
                    currentSort={sort || "default"}
                />

            </div>

            {/* Products */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                {sortedProducts.map((product) => (

                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                    >

                        <div className="bg-gray-50 py-2 px-3 rounded-sm">

                            {/* Product Info */}
                            <div className="flex gap-2">

                                <div className="text-5xl">
                                    {product.image}
                                </div>

                                <div>

                                    <span className="text-md font-semibold text-gray-600">
                                        {product.nameBn}
                                    </span>

                                    <p className="text-[13px] text-gray-500">
                                        প্রতি {product.unit}
                                    </p>

                                </div>

                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between">

                                <div>

                                    <h4 className="text-gray-500 text-[12px] mt-2">
                                        আজকের দাম
                                    </h4>

                                    <p className="text-gray-700 font-bold text-[15px]">
                                        {product.today} টাকা
                                    </p>

                                </div>

                                {/* Price Change */}
                                {product.change?.dir === "up" && (
                                    <p className="flex gap-2 items-center text-sm font-medium text-red-600">

                                        <FaArrowUp />

                                        {product.change.pct}%

                                    </p>
                                )}

                                {product.change?.dir === "down" && (
                                    <p className="flex gap-2 items-center text-sm font-medium text-green-600">

                                        <FaArrowDown />

                                        {Math.abs(product.change.pct)}%

                                    </p>
                                )}

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </section>
    );
};

export default CategoryPage;