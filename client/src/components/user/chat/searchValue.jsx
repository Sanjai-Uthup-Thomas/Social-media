import React from 'react'

function SearchValue({value}) {
  return (
    <a
    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
    <img className="object-cover w-10 h-10 rounded-full"
        src={`http://localhost:4000/DP/${value?.userDp}`}
        />
    <div className="w-full pb-2">
        <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">{value?.userName}</span>
            
        </div>
    </div>
</a>
  )
}

export default SearchValue