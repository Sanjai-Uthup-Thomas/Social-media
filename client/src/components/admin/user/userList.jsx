import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function UserList() {
  const [data, setData] = useState([])
  const [control, setControl] = useState(false)
  const submitData = async (id) => {
    const response = await axios.patch(`http://localhost:4000/admin/blockuser/${id}`)
    if (response) {
      setControl(!control)
    }

  }
  const fetch = async () => {
    const response = await axios.get('http://localhost:4000/admin/userlist')
    console.log(response.data);
    setData(response.data)
  }
  useEffect(() => {
    fetch()
  }, [control])


  return (
  <div>
    <div class="pl-52 align-middle w-full ">
      <div class="overflow-x-auto">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-white border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    User
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Profile Photo
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Email
                  </th>
                  {/* <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Reports
                  </th> */}
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  data.map((item, index) => {
                    return (
                      <tr key={index} class="bg-gray-100 border-b">
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.userName}</td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <img
                                                    className="rounded-full"
                                                    // src={data.me.image}
                                                    src={`http://localhost:4000/DP/${item.profilePhoto}`}
                                                    // src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                                                    width="40"
                                                />
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        {/* <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                        </td> */}
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={() => submitData(item._id)}
                            className={`shadow ${item.Status ? 'bg-green-600 rounded-full hover:bg-green-700' : 'bg-red-600 rounded-full hover:bg-red-700'} focus:shadow-outline w-[140px] focus:outline-none text-white font-bold py-1 px-4`}>
                            {item.Status ? 'Unblock User' : 'Block User'}
                          </button>
                        </td>
                      </tr>
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