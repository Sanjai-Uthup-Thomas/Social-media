import React from 'react'
function BottomNav() {
    const Menus = [
        { name: "Home", icon: "home-outline", dis: "translate-x-0" },
        { name: "Profile", icon: "search-outline", dis: "translate-x-16" },
        { name: "create", icon: "add-circle-outline", dis: "translate-x-32" },
        { name: "Chat", icon: "chatbubble-outline", dis: "translate-x-48" },
        { name: "Search", icon: "person-outline", dis: "translate-x-64" },
    ];
    // const [active, setActive] = useState(0);
    return (
        <div className='sticky bottom-2 w-full max-h-[3rem] md:hidden block '>

            <div className="flex justify-center items-center">





                <div className="bg-white max-h-[4rem] px-6 rounded-t-xl">
                    <ul className="flex relative">
                        {/* <span
                            className={`bg-gray-400 duration-500 ${Menus[active].dis} h-16 w-16 absolute
         -top-5 rounded-full`}
                        > */}
                            <span
                                className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
                            ></span>
                            <span
                                className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
                            ></span>
                        {/* </span> */}
                        {Menus.map((menu, i) => (
                            <li key={i} className="w-16">
                                <a
                                    className="flex flex-col text-center pt-6"
                                    // onClick={() => setActive(i)}
                                >
                                    <span
                                        className={`text-xl cursor-pointer duration-500 
                                        
                                            `}
                                    >
                                        <ion-icon name={menu.icon} size="large"></ion-icon>
                                    </span>
                                    
                                   
                                </a>
                            </li>
                        ))}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BottomNav