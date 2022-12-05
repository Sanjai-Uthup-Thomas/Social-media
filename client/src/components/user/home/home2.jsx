import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../features/auth/authSlice'
import Posts from '../posts/posts'
import Suggestions from '../Suggestions/Suggestions'



function HomePage() {
    const dispatch=useDispatch()
    const logouthandel=()=>{
      dispatch(logout()) 
    }
    const { 
        auth: { user },
      } = useSelector(state => state);
      if(user.username===undefined){
        var users=JSON.parse(user)
      }else{
        var users=user
      }
      


    return (
        <main className=" grid grid-cols-3 container md:w-10/12 mx-auto mt-4 bg-gray-50  ">
        <div className="md:px-12 col-span-3 lg:col-span-2">
            
            <Posts/>
        </div>
        <div className="col-span-1 hidden lg:block px-12">
            <div className="fixed p-5 w-80">
                <div className="flex flex-row">
                    <a href="">
                        <img
                            className="rounded-full"
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                            width="100"
                        />
                    </a>
                    <div className="w-72 pl-2 m-auto">
                        <div className="text-sm font-medium">
                            {/* <Link to={`/${dataCurrentUser.me.username}`}>
                                {dataCurrentUser.me.username}
                            </Link> */}
                            {users?.username}
                        </div>
                        <div className="text-gray-500 text-sm leading-4">
                        {users?.username}
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

                <Suggestions />
                {/* <Footer />  */}
            </div>
        </div>
    </main>
    )
}

export default HomePage