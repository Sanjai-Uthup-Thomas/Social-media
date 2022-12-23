import {io} from 'socket.io-client'
import  { createContext } from 'react'
const SOCKET_URL = 'https://localhost:3001'
export const socket = io(SOCKET_URL)
export const AppContext= createContext()