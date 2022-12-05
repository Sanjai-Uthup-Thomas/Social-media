import React from 'react'

function Suggestions() {
    return (
        <>
            <div className="flex flex-row pt-5">
                <div className="w-72 font-bold text-gray-500 text-sm">
                    Suggestions For You
                </div>
                <div className="w-32 text-sm text-right">
                    <a href="#" className="text-black-400 font-bold text-xs">
                        See All
                    </a>
                </div>
            </div>

            {[1, 2, 3,4,5,6].map(() => {
                return (
                    <div className="flex py-2">
                        <div className="flex items-center">
                            <a className="inline-block align-top" href="#">
                                <img
                                    className="rounded-full"
                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                                    width="35"
                                />
                            </a>
                            <div className="inline-block ml-2">
                                <div className="text-sm font-medium">
                                    sanjai_uthup
                                </div>
                                <div className="text-gray-500 text-xs">
                                    Suggested for you
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 items-center flex justify-end ">
                            <a

                                className="text-xs text-sky-500 font-bold cursor-pointer"
                            >
                                Follow
                            </a>
                            {/* <Follow user={user} /> */}
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Suggestions