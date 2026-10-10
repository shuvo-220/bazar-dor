import Link from "next/link";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Product = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            cache: "no-store",
        }
    );

    const data = await res.json();
    const products = data?.data || data;

    const increasedProducts = products
        .filter((product) => product.change?.dir === "up")
        .slice(0, 6);

    const decreasedProducts = products
        .filter((product) => product.change?.dir === "down")
        .slice(0, 6);

    return (
        <section className="container mx-auto px-4 py-10">

            {/* ================= PRICE INCREASE ================= */}
            {increasedProducts.length > 0 && (
                <div className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold">
                        আজ দাম বেড়েছে
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {increasedProducts.map((product) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id}
                            >
                                <div className="rounded-sm bg-gray-50 px-3 py-2">
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

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="mt-2 text-[12px] text-gray-500">
                                                আজকের দাম
                                            </h4>

                                            <p className="text-[15px] font-bold text-gray-700">
                                                {product.today} টাকা
                                            </p>
                                        </div>

                                        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600">
                                            <FaArrowUp />
                                            {Math.abs(product.change?.pct)}%
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= PRICE DECREASE ================= */}
            {decreasedProducts.length > 0 && (
                <div className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold">
                        আজ দাম কমেছে
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {decreasedProducts.map((product) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id}
                            >
                                <div className="rounded-sm bg-gray-50 px-3 py-2">
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

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="mt-2 text-[12px] text-gray-500">
                                                আজকের দাম
                                            </h4>

                                            <p className="text-[15px] font-bold text-gray-700">
                                                {product.today} টাকা
                                            </p>
                                        </div>

                                        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-green-600">
                                            <FaArrowDown />
                                            {Math.abs(product.change?.pct)}%
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= ALL PRODUCTS ================= */}
            <div
                id="all-products"
                className="scroll-mt-24"
            >
                <h2 className="mb-6 text-2xl font-bold">
                    সব পণ্য
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            href={`/product/${product.id}`}
                            key={product.id}
                        >
                            <div className="rounded-sm bg-gray-50 px-3 py-2">
                                {/* Product info */}
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
                                        <h4 className="mt-2 text-[12px] text-gray-500">
                                            আজকের দাম
                                        </h4>

                                        <p className="text-[15px] font-bold text-gray-700">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                    {/* Price Change */}
                                    {product.change?.dir === "up" && (
                                        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600">
                                            <FaArrowUp />
                                            {Math.abs(product.change?.pct)}%
                                        </p>
                                    )}

                                    {product.change?.dir === "down" && (
                                        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-green-600">
                                            <FaArrowDown />
                                            {Math.abs(product.change?.pct)}%
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Product;