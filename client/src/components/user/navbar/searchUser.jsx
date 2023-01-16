import React from 'react'
import { Link } from 'react-router-dom'

function SearchUser({ user, index }) {
    return (
        <div> <div className="flex-col w-full bg-white sm:rounded-lg sm:shadow-sm p-1" key={index}>
            <Link to={`/${user.userName}`}>
                <div className="flex flex-row ">

                    <img className="w-12 h-12  border-gray-300 rounded-full" alt="User avatar"
                        src={`http://localhost:4000/DP/${user.userDp}`}
                    />
                    <div className="flex-col mt-1">
                        <div className="flex items-center flex-1 px-4 font-medium leading-tight">{user.userName}

                        </div>
                    </div>

                </div>
            </Link>
        </div>
        </div>
    )
}

export default SearchUser