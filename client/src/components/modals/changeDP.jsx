import React, { useState } from 'react';
import { changeDp } from '../../api/userApi';

const ChangeDP=({open,onClose})=>{
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
        setForm({
            ...form,
            DP: DP
        })
    }
    const submit = async(e) => {
        e.preventDefault()
        const Data = new FormData()
        for (let key in form) {
            console.log(`key, form[key] ${key, form[key]}`);
            Data.append(key, form[key])
        }
        console.log(`data ${Data}`);
         changeDp(Data).then((response)=>{
            onClose()
         })
    }
    if(!open){return null}else{
    return(
        <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='w-[400px] flex flex-col'>
                <button className='text-white text-xl place-self-end' 
                onClick={()=> onClose()}>X</button>
                <div className='bg-white p-2 h-auto text-black rounded text-center'> <div>
                        <p className='text-black'>Change Profile Photo</p>
                        <div >
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div ><img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' /></div>
                                <div>
                                    <input type='file' name='DP' onChange={fileUpload} />

                                </div>
                                <div>

                                    <button className="bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2" type="submit">
                                        Sunbmit
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
export default ChangeDP