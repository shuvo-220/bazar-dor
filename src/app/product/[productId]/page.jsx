import React from 'react'

const ProductDetails = async ({ params }) => {

  const { productId } = await params;

  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${productId}`);
  const data = await res.json();

  const priceDifference = data.today - data.yesterday;

  const changePercent =
    data.yesterday !== 0
      ? ((priceDifference / data.yesterday) * 100).toFixed(1)
      : 0;


  const allMinPrices = data.markets.map((market) => market.min);
  const allMaxPrices = data.markets.map((market) => market.max);

  const lowestPrice = Math.min(...allMinPrices);
  const highestPrice = Math.max(...allMaxPrices);

  const averagePrice =
    data.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0
    ) / data.markets.length;

  const roundedAveragePrice = Math.round(averagePrice);

  return (
    <div className='py-10'>

      <div className='flex items-center justify-between border border-gray-300 p-3 rounded-sm'>

        <div className='flex items-center gap-3'>
          <div className='text-7xl'>{data.image}</div>
          <div>
            <h3 className='text-xl font-semibold'>{data.nameBn}</h3>
            <p className='text-gray-400'>প্রতি {data.unit} • {data.categoryNameBn}</p>

            {priceDifference > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="text-gray-600">
                  বেড়েছে
                </span>{" "}
                · {priceDifference} টাকা
              </p>
            )}
            {priceDifference < 0 && (
              <p className="mt-2 text-sm text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="">
                  কমেছে
                </span>{" "}
                · {Math.abs(priceDifference)} টাকা
              </p>
            )}
          </div>
        </div>

        <div className=" rounded-md bg-gray-50 p-5">
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

          <div className="flex flex-col items-center mt-1">
            <h2 className="text-xl font-bold text-gray-800">
              {data.today} টাকা
            </h2>

            <div>
              {priceDifference > 0 && (
                <span className="text-sm font-semibold text-red-600">
                  ↑ {changePercent}% বেড়েছে
                </span>
              )}

              {priceDifference < 0 && (
                <span className="text-sm font-semibold text-green-600">
                  ↓ {Math.abs(changePercent)}% কমেছে
                </span>
              )}

              {priceDifference === 0 && (
                <span className="text-sm font-semibold text-gray-500">
                  অপরিবর্তিত
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* high low and average */}
      <div>
        <h2 className='py-5 text-gray-700 font-semibold'>দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className='border border-gray-300 rounded-sm py-2 px-3'>
            <h3 className='text-gray-600 font-semibold text-md'>সর্বনিম্ন দাম</h3>
            <span className='text-green-600 font-semibold text-xl'>{lowestPrice}</span>
            <p className='text-sm text-gray-500'>সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className='border border-gray-300 rounded-sm  py-2 px-3'>
            <h3 className='text-gray-600 font-semibold text-md'>সর্বাধিক দাম</h3>
            <span className='text-red-600 font-semibold text-xl'>{highestPrice}</span>
            <p className='text-sm text-gray-500'>সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className='border border-gray-300 rounded-sm  py-2 px-3'>
            <h3 className='text-gray-600 font-semibold text-md'>গড় দাম</h3>
            <span className=' font-semibold text-xl'>{roundedAveragePrice}</span>
            <p className='text-sm text-gray-500'>প্রতি কেজি-এর হিসাবে</p>
          </div>
        </div>
      </div>

      {/* division wise rate */}

      {/* Market Price Table */}
<div className="mt-10">
  <h2 className="py-5 text-gray-700 font-semibold">
    বাজারভিত্তিক দাম
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-600">
            বাজার
          </th>

          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-600">
            বিভাগ
          </th>

          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-600">
            সর্বনিম্ন
          </th>

          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-600">
            সর্বোচ্চ
          </th>

          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-600">
            গড়
          </th>
        </tr>
      </thead>

      <tbody>
        {data.markets.map((market, index) => {
          const average = (market.min + market.max) / 2;

          return (
            <tr key={index} className="hover:bg-gray-50">

              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                {market.market}
              </td>

              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-500">
                {market.division}
              </td>

              <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                {market.min} টাকা
              </td>

              <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                {market.max} টাকা
              </td>

              <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                {average.toFixed(1)} টাকা
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

    </div>
  )
}

export default ProductDetails