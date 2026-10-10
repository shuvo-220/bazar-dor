import React from "react";

const ProductDetails = async ({ params }) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="px-4 py-16 text-center text-gray-600">
        পণ্যের তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  const data = await res.json();

  if (!data || !Array.isArray(data.markets)) {
    return (
      <div className="px-4 py-16 text-center text-gray-600">
        পণ্যের তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  const priceDifference = data.today - data.yesterday;

  const changePercent =
    data.yesterday !== 0
      ? ((priceDifference / data.yesterday) * 100).toFixed(1)
      : 0;

  const allMinPrices = data.markets.map((market) => market.min);
  const allMaxPrices = data.markets.map((market) => market.max);

  const lowestPrice = allMinPrices.length
    ? Math.min(...allMinPrices)
    : 0;

  const highestPrice = allMaxPrices.length
    ? Math.max(...allMaxPrices)
    : 0;

  const averagePrice = data.markets.length
    ? data.markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / data.markets.length
    : 0;

  const roundedAveragePrice = Math.round(averagePrice);

  return (
    <div className="w-full py-5 sm:py-8 lg:py-10">
      {/* Product Overview */}
      <section className="flex flex-col gap-5 rounded-xl border border-gray-200 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        {/* Product Information */}
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="shrink-0 text-5xl sm:text-6xl md:text-7xl">
            {data.image}
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
              {data.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি {data.unit} • {data.categoryNameBn}
            </p>

            {priceDifference > 0 && (
              <p className="mt-3 text-sm leading-6 text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold text-red-600">
                  বেড়েছে
                </span>{" "}
                · {priceDifference} টাকা
              </p>
            )}

            {priceDifference < 0 && (
              <p className="mt-3 text-sm leading-6 text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold text-green-600">
                  কমেছে
                </span>{" "}
                · {Math.abs(priceDifference)} টাকা
              </p>
            )}

            {priceDifference === 0 && (
              <p className="mt-3 text-sm text-gray-500">
                গতকালের তুলনায় আজ দাম অপরিবর্তিত।
              </p>
            )}
          </div>
        </div>

        {/* Today's Price */}
        <div className="w-full rounded-lg bg-gray-50 p-4 sm:p-5 md:w-auto md:min-w-48 md:shrink-0">
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 md:flex-col md:items-start">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {data.today} টাকা
            </h2>

            {priceDifference > 0 && (
              <span className="text-sm font-semibold text-red-600">
                ↑ {changePercent}% বেড়েছে
              </span>
            )}

            {priceDifference < 0 && (
              <span className="text-sm font-semibold text-green-600">
                ↓ {Math.abs(Number(changePercent))}% কমেছে
              </span>
            )}

            {priceDifference === 0 && (
              <span className="text-sm font-semibold text-gray-500">
                অপরিবর্তিত
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Price Summary */}
      <section className="mt-7 sm:mt-10">
        <h2 className="mb-4 text-lg font-bold text-gray-700 sm:text-xl">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-600 sm:text-base">
              সর্বনিম্ন দাম
            </h3>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {lowestPrice} টাকা
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-600 sm:text-base">
              সর্বোচ্চ দাম
            </h3>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {highestPrice} টাকা
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 sm:text-base">
              গড় দাম
            </h3>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              {roundedAveragePrice} টাকা
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সব বাজারের গড় দাম
            </p>
          </div>
        </div>
      </section>

      {/* Market Price Table */}
      <section className="mt-8 sm:mt-10">
        <h2 className="mb-4 text-lg font-bold text-gray-700 sm:text-xl">
          বাজারভিত্তিক দাম
        </h2>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-gray-600 sm:px-4 sm:text-sm">
                  বাজার
                </th>

                <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-gray-600 sm:px-4 sm:text-sm">
                  বিভাগ
                </th>

                <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-gray-600 sm:px-4 sm:text-sm">
                  সর্বনিম্ন
                </th>

                <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-gray-600 sm:px-4 sm:text-sm">
                  সর্বোচ্চ
                </th>

                <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-gray-600 sm:px-4 sm:text-sm">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody>
              {data.markets.map((market, index) => {
                const average = (market.min + market.max) / 2;

                return (
                  <tr
                    key={`${market.market}-${market.division}-${index}`}
                    className="border-t border-gray-200 transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-700 sm:px-4">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500 sm:px-4">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-green-700 sm:px-4">
                      {market.min} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-red-600 sm:px-4">
                      {market.max} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 sm:px-4">
                      {average.toFixed(1)} টাকা
                    </td>
                  </tr>
                );
              })}

              {data.markets.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    কোনো বাজারের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-xs text-gray-400 sm:hidden">
          সম্পূর্ণ টেবিল দেখতে ডানে-বামে স্ক্রল করুন।
        </p>
      </section>
    </div>
  );
};

export default ProductDetails;
