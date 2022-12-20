import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { createPost } from '../../api/userApi';
import { control } from '../../features/auth/authSlice';


const NewPost = ({ open, onClose }) => {
   

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        description: "",
        postImage: ""
    })
    const handleChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    const fileUpload = (e) => {
        const img = e.target.files[0]
        setForm({
            ...form,
            Posts: img
        })
    }
    const submit = async (e) => {
        e.preventDefault()
        const Data = new FormData()
        for (let key in form) {
            Data.append(key, form[key])
        }

        createPost(Data).then((response) => {
            onClose()
            dispatch(control())

        })
    }
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='w-[400px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 h-auto text-black rounded text-center'> <div>
                        <p className='text-black'>Create New Post</p>
                        <div >
                            <form onSubmit={submit} encType="multipart/form-data">
                            <div >{form.Posts?
                                <img className='' src={URL.createObjectURL(form.Posts)} />
                                : <img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' />}
                                   
                                    </div>
                                {/* <div ><img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' /></div> */}
                                <div>
                                    <textarea
                                        type="text"
                                        className="p-1 w-full outline-0 h-30 border-2 rounded-md"
                                        placeholder="Write a caption..."
                                        name='description'
                                        onChange={handleChange}


                                    />
                                    <label for="file-upload" class="text-[18px] text-center p-1 bg-gray-500 w-20 rounded-md text-white">
                                        Select Photo
                                    </label>
                                    <input id='file-upload' type='file' name='Image' onChange={fileUpload} accept="image/*" className='hidden bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2' />

                                </div>
                                <div>

                                    <button className="bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2" type="submit">
                                        Post
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div></div>
                </div>
            </div>
        )
    }
}
export default NewPost