import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSuggestions } from '../../../api/userApi'
import MappedSuggestion from './MappedSuggestions'


function SuggestionsComp() {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)
    const {
        auth: { controlState }
    } = useSelector(state => state)
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const fetchData = () => {
        getSuggestions(userParse?.id).then((response) => {
            console.log(response.data)
            setData(response.data)
            setLoader(false)
        })


    }
    useEffect(() => {
        fetchData()
    }, [controlState])

    return (
        <>
            <div className='p-4'>
            </div>
            {/* <h1 className=''>Suggested</h1> */}

            {data && data.map((data) => {
                return (
                    <div className='md:px-36'>
                        <MappedSuggestion data={data} />
                    </div>
                )
            })}

        </>
    )
}

export default SuggestionsComp