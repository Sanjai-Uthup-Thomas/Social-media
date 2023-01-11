import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deactiveAccount } from '../../api/userApi';
import { logout } from '../../features/auth/authSlice';

function Settings({ open, onClose, userId }) {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const handelDeactive = (e) => {
        console.log(userId);
        deactiveAccount(userId).then((response) => {
            dispatch(logout())
            Navigate('/')
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50'>
                <div className='w-[400px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 h-[170px] text-black rounded align-middle text-center overflow-y-auto'>
                        <div className='pt-6'>You can deactivate your account . This means your account will be hidden until you reactivate it by logging back in.</div>
                        <div className='mt-5'>
                            <a className="bg-black rounded-3xl px-4 py-1 mb-4 mt-8 ml-5 h-8 dark:bg-slate-800 dark:text-white  items-center cursor-pointer"
                                onClick={(e) => { handelDeactive() }}
                            >Deactivate
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings