import React,{ useEffect,useState  } from 'react'
import { useSelector } from 'react-redux'
import {redirect, useNavigate } from 'react-router-dom'
import {getUsers } from '../../../api/adminApi'
import UserListMapped from './userListMapped'

function UserList() {
    const {
        auth: { controlState }
    } = useSelector(state => state)
  const [data, setData] = useState([])
  const fetch = async () => {
     getUsers().then((response)=>{
       console.log(response);
       setData(response.data)
     }).catch((error) => {
      localStorage.removeItem('admin-auth-token')
     })
  }
  useEffect(() => {
    fetch()
  }, [controlState])


  return (
  <div>
    <div className="pl-52 align-middle w-full ">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    User
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Profile Photo
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Email
                  </th>
                  {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Reports
                  </th> */}
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  data.map((item,index) => {
                    return (
                     <UserListMapped item={item} index={index}/>
                    )
                  })
                }


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>



  )
}

export default UserList