import React from 'react';

const Modal=({open,children,onClose})=>{
    if(!open){return null}else{
    return(
        <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='w-[400px] flex flex-col'>
                <button className='text-white text-xl place-self-end' 
                onClick={()=> onClose()}>X</button>
                <div className='bg-white p-2 h-auto text-black rounded text-center'>{children}</div>
             </div>
        </div>
    )
    }
}
export default Modal