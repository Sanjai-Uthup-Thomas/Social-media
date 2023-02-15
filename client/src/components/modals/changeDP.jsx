import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeDp } from '../../api/userApi';
import { control } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeDP = ({ open, onClose }) => {
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        DP: ""
    })
    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setForm({
    //         ...form,
    //         [name]: value
    //     })
    // }
    const fileUpload = (e) => {
        const DP = e.target.files[0]
        if (!DP?.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
            
            form.DP=false
            setError(true)
            toast.warn('Please select valid image', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            // onClose()
        }else{
            setError(false) 
        }
        setForm({
            ...form,
            DP: DP
        })
    }
    const dispatch = useDispatch()
    const submit = async (e) => {
        e.preventDefault()
        const Data = new FormData()
        for (let key in form) {
           
            Data.append(key, form[key])
        }
        
        const { DP } = form
        
        if (DP && !error) {
            
            changeDp(Data).then((response) => {
                toast.success('Profile Photo changed', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                onClose()
                localStorage.setItem('user', JSON.stringify(response.data.data))
                dispatch(control())
            })
        }else{
            toast.warn('Select a photo', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='w-[370px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 h-auto text-black rounded text-center'> <div>
                        <p className='text-black'>Change Profile Photo</p>
                        <div >
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div >{form.DP ?
                                    <img className='' src={URL.createObjectURL(form.DP)} />
                                    : <img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' />}

                                </div>
                                <div>
                                    {/* <input type='file' name='DP' onChange={fileUpload} /> */}
                                    <label for="file-upload" className="text-[18px] text-center p-1 bg-gray-500 w-20 rounded-md text-white">
                                        Select Photo
                                    </label>
                                    <input id='file-upload' type='file' name='DP' onChange={fileUpload} accept="image/*" className='hidden bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2' />

                                </div>
                                <div>

                                    <button className="bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2" type="submit">
                                        Submit
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div></div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        )
    }
}
export default ChangeDP