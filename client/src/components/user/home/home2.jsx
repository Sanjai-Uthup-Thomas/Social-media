import React, { useEffect, useState } from 'react'
// import { ThreeCircles } from 'react-loader-spinner'
import { useDispatch} from 'react-redux'
import { logout } from '../../../features/auth/authSlice'
import Posts from '../posts/posts'
import Suggestions from '../Suggestions/Suggestions'



function HomePage() {
    // var users
    // const [loading, setLoading] = useState(true)
    // const {
    //     auth: { controlState }
    // } = useSelector(state => state)
//  const {
//     auth: { user },
//   } = useSelector(state => state);
//   console.log(JSON.parse(user));
    const dispatch = useDispatch()
    const logouthandel = () => {
        dispatch(logout())
    }
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)




    return (<>
        {
        // loading ? <div className="flex flex-col justify-center items-center w-full h-full">
        //     <ThreeCircles
        //         type="Puff"
        //         color="#00BFFF"
        //         height={100}
        //         width={100}
        //         timeout={3000} //3 secs

        //     />
        // </div> : 
        <main className=" grid grid-cols-3 container md:w-10/12 mx-auto pt-4   ">
            <div className="md:px-12 col-span-3 lg:col-span-2 ">

                <Posts />
            </div>
            <div className="col-span-1 hidden lg:block px-4">
                <div className="fixed p-5 w-80 bg-zinc-100">
                    <div className="flex flex-row p-2 bg-zinc-100">
                        <a href="">
                            <img
                                className="rounded-full"
                                src={`http://localhost:4000/DP/${userParse.profilePhoto}`}
                                width="100"
                            />
                        </a>
                        <div className="w-72 pl-2 m-auto">
                            <div className="text-sm font-medium">
                                {/* <Link to={`/${dataCurrentUser.me.username}`}>
                                 {dataCurrentUser.me.username}
                             </Link> */}
                                {userParse?.userName}
                            </div>
                            <div className="text-gray-500 text-sm leading-4">
                            {userParse?.username}

                            </div>
                        </div>
                        <div className="w-32 text-right m-auto">
                            <a
                                className="text-xs text-sky-500 font-bold cursor-pointer"
                                onClick={logouthandel}

                            >
                                Log out
                            </a>
                        </div>
                    </div>

                    <Suggestions userId={userParse?.id} />
                    {/* <Footer />  */}
                </div>
            </div>
        </main>}


    </>


    )
}

export default HomePage