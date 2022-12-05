import React from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';






function Posts() {
  return (
    <>
    
      <div className="border border-slate-200 mb-5">
                <div className="p-3 flex flex-row">
                    <div className="flex-1">
                        <a href="" className="">
                            <img
                                className="rounded-full w-8 max-w-none inline "
                                src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
                            />{" "}
                            <span className="font-medium text-sm ml-2">
                                sanjai_uthup
                            </span>
                        </a>
                    </div>
                    <div className="">
                        <a
                            className=""
                            href="#"
                            // onClick={() => setIsModalOpen(true)}
                        >
                            <BsThreeDots />
                        </a>
                    </div>
                </div>
                <img
                    className="w-100 mx-auto"
                    alt={`Photo by sanjai_uthup`}
                    src='https://images.unsplash.com/photo-1520974735194-9e0ce82759fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                />

                <div className="header p-3 flex flex-row text-2xl justify-between">
                    <div className="flex ">
                    <a
                            className="mr-3 hover:text-red-600 cursor-pointer"
                            
                        >
                             <AiOutlineLike />
                        </a>
                       
                           
                        
                        <a
                            className="mr-3 hover:text-gray-500 cursor-pointer"
                            
                        >
                            <FaRegComment />
                        </a>
                      
                    </div>
                    <div className="">
                        <a
                            className="cursor-pointer hover:text-gray-500"
                            
                        >
                           <FiBookmark/>
                        </a>
                    </div>
                </div>
                <div className="font-medium text-sm px-3">100 likes</div>
                <div className="px-3 text-sm">
                    <span className="font-medium">sanjai_uthup</span> hai
                </div>
              

                <div className="text-gray-500 uppercase px-3 pt-2 pb-5 text-[0.65rem] tracking-wide">
                    10 min ago
                </div>

                <div className="px-3 py-2 flex flex-row border-t relative">
                    
                    <div className="flex items-center">
                        <a className="text-2xl cursor-pointer">
                           
                        </a>
                    </div>
                    <div className="flex-1 pr-3 py-1">
                        <input
                            className={`w-full px-3 py-1 text-sm bg-slate-50 outline-0`}
                           
                            type="text"
                            placeholder="Add a comment..."
                           
                        />
                    </div>
                    <div className="flex items-center text-sm">
                        <a
                            className= "cursor-pointer text-sky-500"
                                    
                           
                        >
                            Post
                        </a>
                    </div>
                </div>
            </div>


            <div className="border border-slate-200 mb-5">
                <div className="p-3 flex flex-row">
                    <div className="flex-1">
                        <a href="" className="">
                            <img
                                className="rounded-full w-8 max-w-none inline"
                                src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
                            />{" "}
                            <span className="font-medium text-sm ml-2">
                                sanjai_uthup
                            </span>
                        </a>
                    </div>
                    <div className="">
                        <a
                            className=""
                            href="#"
                            // onClick={() => setIsModalOpen(true)}
                        >
                            <BsThreeDots />
                        </a>
                    </div>
                </div>
                <img
                    className="w-100"
                    alt={`Photo by sanjai_uthup`}
                    src='https://www.wallpaperflare.com/static/701/185/209/animals-insect-beetles-macro-wallpaper.jpg'
                />

                <div className="header p-3 flex flex-row text-2xl justify-between">
                    <div className="flex ">
                       
                    <a
                            className="mr-3 hover:text-red-600 cursor-pointer"
                            
                        >
                             <AiOutlineLike />
                        </a>
                        
                        <a
                            className="mr-3 hover:text-gray-500 cursor-pointer"
                            
                        >
                            <FaRegComment />
                        </a>
                      
                    </div>
                    <div className="">
                        <a
                            className="cursor-pointer hover:text-gray-500"
                            
                        >
                           <FiBookmark/>
                        </a>
                    </div>
                </div>
                <div className="font-medium text-sm px-3">100 likes</div>
                <div className="px-3 text-sm">
                    <span className="font-medium">sanjai_uthup</span> hai
                </div>
              

                <div className="text-gray-500 uppercase px-3 pt-2 pb-5 text-[0.65rem] tracking-wide">
                    10 min ago
                </div>

                <div className="px-3 py-2 flex flex-row border-t relative">
                    
                    <div className="flex items-center">
                        <a className="text-2xl cursor-pointer">
                           
                        </a>
                    </div>
                    <div className="flex-1 pr-3 py-1">
                        <input
                            className={`w-full px-3 py-1 text-sm bg-slate-50 outline-0`}
                           
                            type="text"
                            placeholder="Add a comment..."
                           
                        />
                    </div>
                    <div className="flex items-center text-sm">
                        <a
                            className= "cursor-pointer text-sky-500"
                                    
                           
                        >
                            Post
                        </a>
                    </div>
                </div>
            </div>

            <div className="border border-slate-200 mb-5">
                <div className="p-3 flex flex-row">
                    <div className="flex-1">
                        <a href="" className="">
                            <img
                                className="rounded-full w-8 max-w-none inline"
                                src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
                            />{" "}
                            <span className="font-medium text-sm ml-2">
                                sanjai_uthup
                            </span>
                        </a>
                    </div>
                    <div className="">
                        <a
                            className=""
                            href="#"
                            // onClick={() => setIsModalOpen(true)}
                        >
                            <BsThreeDots />
                        </a>
                    </div>
                </div>
                <img
                    className="w-100"
                    alt={`Photo by sanjai_uthup`}
                    src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7625bafd-36cc-4e10-b455-2e75ad2739a7/d19165l-2213687d-f43f-4649-b28f-094852de5ca6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc2MjViYWZkLTM2Y2MtNGUxMC1iNDU1LTJlNzVhZDI3MzlhN1wvZDE5MTY1bC0yMjEzNjg3ZC1mNDNmLTQ2NDktYjI4Zi0wOTQ4NTJkZTVjYTYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LZpTE1AmRy1tCtaffDSHkj7d5XZWsVyHE5Ot-q3iO58'
                />

                <div className="header p-3 flex flex-row text-2xl justify-between">
                    <div className="flex ">
                       
                    <a
                            className="mr-3 hover:text-red-600 cursor-pointer"
                            
                        >
                             <AiOutlineLike />
                        </a>
                        
                        <a
                            className="mr-3 hover:text-gray-500 cursor-pointer"
                            
                        >
                            <FaRegComment />
                        </a>
                      
                    </div>
                    <div className="">
                        <a
                            className="cursor-pointer hover:text-gray-500"
                            
                        >
                           <FiBookmark/>
                        </a>
                    </div>
                </div>
                <div className="font-medium text-sm px-3">100 likes</div>
                <div className="px-3 text-sm">
                    <span className="font-medium">sanjai_uthup</span> hai
                </div>
              

                <div className="text-gray-500 uppercase px-3 pt-2 pb-5 text-[0.65rem] tracking-wide">
                    10 min ago
                </div>

                <div className="px-3 py-2 flex flex-row border-t relative">
                    
                    <div className="flex items-center">
                        <a className="text-2xl cursor-pointer">
                           
                        </a>
                    </div>
                    <div className="flex-1 pr-3 py-1">
                        <input
                            className={`w-full px-3 py-1 text-sm bg-slate-50 outline-0`}
                           
                            type="text"
                            placeholder="Add a comment..."
                           
                        />
                    </div>
                    <div className="flex items-center text-sm">
                        <a
                            className= "cursor-pointer text-sky-500"
                                    
                           
                        >
                            Post
                        </a>
                    </div>
                </div>
            </div>


           

    </>
  );
}
export default Posts