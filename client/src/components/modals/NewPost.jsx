import React, { useRef, useState } from 'react';
import './newPost.css'
import { useDispatch, } from 'react-redux';
import { createPost, getTag } from '../../api/userApi';
import { control } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

const NewPost = ({ open, onClose }) => {
    const [img,setImg]=useState(false)
    //place api
    const [address, setAddress] = useState("");
    const handleChangeAddress = (newAddress) => {
        setAddress(newAddress);
    };
    const handleSelectAddress = (newAddress) => {
        setAddress(newAddress);
        geocodeByAddress(newAddress)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                setForm({
                    ...form,
                    Location: newAddress
                })
            }
            )
            .catch((error) => console.error("Error", error));
    };


    const dispatch = useDispatch()
    const [tags, setTags] = useState([])
    const [tagsInText, setTagsInText] = useState([])



    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        Posts: null,
        description: "",
        postImage: ""
    })
    const inputRef = useRef(null);
    function handleSuggestionClick(suggestion) {
        const value = tagsInText.split(" ")
        const pop = value.pop()
        const finalValue = value.push(suggestion)
        const something = value.join(' ')
        setTagsInText(something)
        setTags('')
        inputRef.current.focus();
        inputRef.current.value = something
        let obj={
            target:{
                name:'description',
                value:something
            }
        } 
        handleChange(obj)
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
        setForm({
            ...form,
            [name]: e.target.value
        })
    }
    const fileUpload = (e) => {
        const img = e.target.files[0]
        if (!img?.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
            setImg(false)
            setError(true)
            setError(true)
            form.Posts = null
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
            setImg(true) 
            setError(false)
            setForm({
                ...form,
                Posts: img
            })
        }
    }
    const submit = async (e) => {
        e.preventDefault()
        const Data = new FormData()
        for (let key in form) {
            Data.append(key, form[key])
        }
        
        let { description, Posts } = form
        description = tagsInText
       
        if (form.Posts!==null && !error) {
            
            createPost(Data).then((response) => {
                onClose()
                dispatch(control())
                setImg(false)

            })
        }else{
            toast.warn('Please select a image', {
                position: "bottom-right",
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
                <div className='w-[380px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => {onClose() 
                        setImg(false)}}>X</button> 
                    <div className='bg-white p-2 h-auto text-black rounded text-center'> <div>
                        <p className='text-black'>Create New Post</p>
                        <div >
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div >{img ?
                                    <img className='w-full h-80' src={URL.createObjectURL(form.Posts)} />
                                    : <img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' />}

                                </div>
                                <div className='py-2'>
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={handleChangeAddress}
                                        onSelect={handleSelectAddress}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: "Add location",
                                                        className: "location-search-input p-1 w-[380px] outline-0 h-30 border-2 rounded-md"
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container"
                                                    styles={{
                                                        listView:{
                                                         position: 'absolute',
                                                         backgroundColor: 'white',
                                                         zIndex: 2,
                                                        }
                                                      }}>
                                                    {loading && <div>Loading...</div>}
                                                    {suggestions.map((suggestion) => {
                                                        const className = suggestion.active
                                                            ? "suggestion-item--active"
                                                            : "suggestion-item";
                                                        // inline style for demonstration purpose
                                                        const style = suggestion.active
                                                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                                                        return (
                                                            <div
                                                                key={suggestion.placeId}
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style
                                                                })}
                                                            >
                                                                <span>{suggestion.description}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>

                                {/* <div ><img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' /></div> */}
                                <div>
                                    <textarea
                                        type="text"
                                        className="p-1 outline-0 h-30 border-2 rounded-md addOn"
                                        placeholder="Write a caption..."
                                        name='description'
                                        onChange={handleChange}
                                        value={tagsInText}
                                        ref={inputRef}
                                    />
                                    {tags.length > 0 &&
                                        <div className='py-2 hashTags'>{tags.map((res) => {
                                            return (
                                                <div className='tags' onClick={() => handleSuggestionClick(res?.HashTag)}>{res?.HashTag}</div>
                                            )
                                        })}</div>}
                                    <label for="file-upload" className="text-[18px] text-center p-1 bg-gray-500 w-20 rounded-md text-white">
                                        Select Photo
                                    </label>
                                    <input id='file-upload' type='file' name='Image' onChange={fileUpload} accept="image/*" className='hidden bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2' />

                                </div>
                                <div>

                                    <button className="bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded my-3" type="submit">
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
