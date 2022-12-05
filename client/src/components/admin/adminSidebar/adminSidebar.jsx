import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { NavLink} from "react-router-dom";
import { adminLogout } from "../../../features/auth/authSlice";






function Sidebar() {
  const [open, setOpen] = useState(true)
  const dispatch=useDispatch()
  const logouthandel=()=>{
    console.log("hai");
    dispatch(adminLogout()) 
  }
  

  const Menus = [
    { title: "Dashboard", src: "https://img.icons8.com/material-rounded/512/dashboard-layout.png", path: "/admin/dashboard", number: 0,},
    { title: "Users", src: "https://img.icons8.com/ios-glyphs/512/user.png", path: "/admin/users", number: 1 },
    { title: "Posts ", src: "https://img.icons8.com/ios-filled/2x/post-stamp.png",  path: "/admin/posts", number: 2 },
   

  ];

  return (
    <div className={`${open ? "w-72" : "w-20"} h-screen p-5 pt-8  relative `}>
        <div className={`fixed left-0 top-0
         ${open ? "w-[15rem]" : "w-20"} h-screen p-5 pt-8 bg-blue-900 `}>
      < img src="https://img.icons8.com/ios-filled/2x/circled-left-2.png" alt="control"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-blue-900
    border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)} /> 
      <div className="flex gap-x-4 items-center">
        <img src="https://img.icons8.com/ios/2x/brave-web-browser.png" alt="logo"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            } fill-white`} />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}>Logo</h1>

      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (


          <NavLink to={Menu.path} key={index} className="link">
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-500 text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === { index } && "bg-blue-500"
                } `}
            >
              <img src={`${Menu.src}`} alt="menu" className={`${open && "hidden"}`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          </NavLink>
        ))}
        <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-500 text-white text-sm items-center gap-x-4 
                "bg-blue-500"
               `} onClick={logouthandel} >
          <img src="https://img.icons8.com/ios-glyphs/2x/logout-rounded-down.png" alt="menu" className={`${open && "hidden"}`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Logout
          </span>

        </li>
      </ul>
    </div>
    </div>
  );
}
export default Sidebar;