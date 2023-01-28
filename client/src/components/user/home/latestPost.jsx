import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DPurl from '../../../api/DPapi';
import postsImages from '../../../api/imagesApi';
import { getLatestPost } from '../../../api/userApi';


function LatestPost() {
    const [post, setPost] = useState({})
    const fetchData = () => {
        getLatestPost().then((res) => {
            let { data } = res
            console.log(data);
            setPost(data[0])
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    let {description}=post
    const words = description?.split(' ');
    return (
        <>
         {post?.userName &&  <div className=''>
            <div className=" w-72 font-bold text-gray-500 text-sm bg-zinc-100">Latest Post</div>
            <div>
                <div className="border border-slate-200 bg-zinc-100 scroll-mx-4 p-2 mt-3    " >
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <Link to={`/${post?.userName}`}>
                                <div className='flex'>
                                <img
                                    className="rounded-full w-8 h-8 max-w-none inline "
                                    src={`${DPurl}/${post?.DP}`}
                                />{" "}
                                <div className="ml-3 ">
                                    <span className="text-sm font-semibold antialiased block leading-tight"> {post?.userName}</span>
                                    <span className="text-gray-600 text-xs block">{post?.Location}</span>
                                    <div className='text-xs'></div>

                                </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='text-base ml-2 py-1'>
                    {words.map((word, index) => {
        const style = {
          color: word.startsWith('#') ? '#1134A6' : 'black'
        };
        return <span key={index} style={style}>{word} </span>;
      })}
                    </div>
                    <img
                        className="w-full h-60 "
                        alt={`Photo by user`}
                        src={`${postsImages}/${post?.postImage}`}
                    />
                    <div className="header flex flex-row text-2xl justify-between">
                    </div>
                    <div className='flex justify-between'>
                    </div>
                </div>
            </div>
        </div>}       
        </>
       
    )
}

export default LatestPost