import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { createPost, getTag } from '../../api/userApi';
import { control } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPost = ({ open, onClose }) => {
    const dispatch = useDispatch()
    const [tags, setTags] = useState([])
    const [tagsInText, setTagsInText] = useState([])
  

    
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        Posts: null,
        description: "",
        postImage: ""
    })
    function handleSuggestionClick(suggestion) {
        const value=tagsInText.split(" ")
        const pop=value.pop()
        const finalValue=value.push(suggestion)
        const something=value.join(' ') 
        setTagsInText(something)
        setTags('')
      }
    const handleChange = (e) => {
        const { name, value } = e.target
        setTagsInText(value)
        function test(words) {
            var n = words.split(" ");
            return n[n.length - 1];
        }
        const tag = test(e.target.value)
        if (tag.startsWith('#')) {
            var data = tag.substring(1);
            getTag(data).then((response) => {
                let { data } = response
                setTags(data)
                // dispatch(control()) 
            })
        } else {
            setTags([])
        }
        console.log("tagsInText",tagsInText);
        setForm({
            ...form,
            [name]: tagsInText
        })
    }
    const fileUpload = (e) => {
        const img = e.target.files[0]
        if (!img?.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
            console.log('Please select valid image JPG,JPEG,PNG');
            setError(true)
            form.Posts = false
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
        } else {
            console.log(img);
            setError(false)
        }
        setForm({
            ...form,
            Posts: img
        })
    }
    const submit = async (e) => {
        e.preventDefault()
        if (error) {
            return false
        }
        const Data = new FormData()
        for (let key in form) {
            Data.append(key, form[key])
        }
        console.log(form.Posts);
        let { description, Posts } = form
        description=tagsInText
        console.log(description,"description");
        console.log(Posts);
        if (description && Posts && !error) {
            console.log(form);
            createPost(Data).then((response) => {
                onClose()
                dispatch(control())

            })
        }

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
                                <div >{form.Posts ?
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
                                        value={tagsInText}


                                    />
                                    {tags.length > 0 &&
                                    <div className='py-2'>{tags.map((res) => {
                                        return (
                                            <div className='' onClick={() => handleSuggestionClick(res?.HashTag)}>{res?.HashTag}</div>
                                        )
                                    })}</div> }
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
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" />
            </div>
        )
    }
}
export default NewPost
