import React from 'react'
import MarqueeText from "react-marquee-text";
import 'react-marquee-text/dist/styles.css';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Marquee = async() => {

const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')
const products = await res.json();


        return (
            <div className="mt-3 border border-gray-300 border-r-0 border-l-0 text-black py-1 overflow-hidden">
                <MarqueeText direction="right" duration={20}>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="inline-flex items-center whitespace-nowrap"
                        >
                            {/* Product Name */}
                            <span className="font-medium">
                                {product.nameBn}
                            </span>

                            {/* Current Price */}
                            <span className="ml-2 font-semibold">
                                ৳{product.today}
                            </span>

                            {/* Price Change */}
                            {product.change.dir === "up" && (
                                <span className="ml-2 flex items-center gap-1 text-green-700">
                                    <FaArrowUp size={12} />
                                    {product.change.pct}%
                                </span>
                            )}

                            {product.change.dir === "down" && (
                                <span className="ml-2 flex items-center gap-1 text-red-700">
                                    <FaArrowDown size={12} />
                                    {Math.abs(product.change.pct)}%
                                </span>
                            )}

                            {product.change.dir === "flat" && (
                                <span className="ml-2 text-gray-800">
                                    — 0%
                                </span>
                            )}

                            <span className="mx-5">•</span>
                        </div>
                    ))}
                </MarqueeText>
            </div>

        )
    }

    export default Marquee