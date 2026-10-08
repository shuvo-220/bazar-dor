
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

    // আজ দাম বেড়েছে
    const increasedProducts = products.filter(
        (product) => product.change?.dir === "up"
    );

    // আজ দাম কমেছে
    const decreasedProducts = products.filter(
        (product) => product.change?.dir === "down"
    );

    return (
        <section className="container mx-auto px-4 py-10">

            {/* ================= PRICE INCREASE ================= */}
            {increasedProducts.length > 0 && (
                <div className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold">
                        আজ দাম বেড়েছে
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                        {increasedProducts.map((product) => (
                            <div key={product.id} className="bg-gray-50 py-2 px-3 rounded-sm ">
                                <div className="flex gap-2">
                                    <div className="text-5xl">{product.image}</div>
                                    <div>
                                        <span className="text-md font-semibold text-gray-600">{product.nameBn}</span>
                                        <p className="text-[13px] text-gray-500">প্রতি {product.unit}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-gray-500 text-[12px] mt-2">আজকের দাম</h4>
                                        <p className="text-md text-gray-700 font-bold text-[15px]">{product.yesterday} টাকা</p>
                                    </div>

                                    <p className="flex gap-2 items-center mt-2 text-sm font-medium text-red-600">
                                        <FaArrowUp /> {Math.abs(product.change?.pct)}%
                                    </p>
                                </div>
                            </div>
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
                            <div
                                key={product.id}
                                className="bg-gray-50 py-2 px-3 rounded-sm"
                            >
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
                                        <h4 className="text-gray-500 text-[12px] mt-2">
                                            আজকের দাম
                                        </h4>

                                        <p className="text-gray-700 font-bold text-[15px]">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                    <p className="flex gap-2 items-center mt-2 text-sm font-medium text-green-600">
                                        <FaArrowDown />
                                        {Math.abs(product.change?.pct)}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* ================= ALL PRODUCTS ================= */}
            <div>
                <h2 className="mb-6 text-2xl font-bold">
                    সব পণ্য
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-50 py-2 px-3 rounded-sm"
                        >
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
                                    <h4 className="text-gray-500 text-[12px] mt-2">
                                        আজকের দাম
                                    </h4>

                                    <p className="text-gray-700 font-bold text-[15px]">
                                        {product.today} টাকা
                                    </p>
                                </div>

                                {/* Change */}
                                {product.change?.dir === "up" && (
                                    <p className="flex gap-2 items-center mt-2 text-sm font-medium text-red-600">
                                        <FaArrowUp />
                                        {product.change?.pct}%
                                    </p>
                                )}

                                {product.change?.dir === "down" && (
                                    <p className="flex gap-2 items-center mt-2 text-sm font-medium text-green-600">
                                        <FaArrowDown />
                                        {Math.abs(product.change?.pct)}%
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
};

export default Product;


