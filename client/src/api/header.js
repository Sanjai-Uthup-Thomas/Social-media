const token = localStorage.getItem('token')

const header={
    headers: { "x-auth-token": token }
}

export default header