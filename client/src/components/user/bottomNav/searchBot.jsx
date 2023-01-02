import React from 'react';
import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { getSearchedUser } from '../../../api/userApi';
import SearchUser from '../navbar/searchUser';




const SearchBot = ({ open, onClose }) => {
const [search,setSearch]=useState([])
    const searchUser = async (e) => {
        const searchValue = e.target.value;
        if (searchValue) {
            const { data } = await getSearchedUser(searchValue)
            setSearch(data)
        } else {
            setSearch()
        }
    };

    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center pt-16 z-50'>
                <div className='w-[400px] flex flex-col'>

                    <div className='bg-white p-2 h-auto text-black rounded text-center'> 
                    <div className='relative flex justify-between'>
                   

                        <GoSearch className="absolute left-3 top-3 text-gray-500" />

                        <input
                            id="search"
                            className="p-2 bg-gray-100 rounded-lg w-11/12 pl-10 align-middle focus:outline-0 placeholder:font-light"
                            placeholder="Search"
                            type="text"
                            onChange={searchUser}

                        />
                        <button className='text-black text-xl place-self-end mb-2 mr-2'
                            onClick={() => onClose()}>X</button>
                            
                    </div>
                    <div className='absolute w-[350px] pt-3'>
                                {search ? search.map((user, index) => {
                                    return (<>
                                        {<SearchUser user={user} index={index} onClick={() => setSearch([])} />}
                                    </>
                                    )
                                }) : ""
                                }
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchBot