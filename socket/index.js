const io = require('socket.io')(3001, {
    cors :{
        origin: "http://localhost:3000",
        methods:["GET", "POST"]

    }
})
let users=[]

const addUser=(userId,socketId) =>{
    console.log(userId,socketId);
    !users.some((user)=> user.userId===userId)&&
    users.push({userId,socketId})
}
const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId)

}
const getUser =(userId)=>{
    return users.find(user=>user.userId === userId)
}
io.on("connection", (socket) => {
    console.log("a user connected");
    // console.log(socket);
    socket.on("addUser",userId=>{
        console.log(userId);
        addUser(userId,socket.id)
        io.emit("getUser",users)
    })
    //sending message
    socket.on("sendMessage",({senderId,receiverId,text,userDP})=>{
const user = getUser(receiverId)
console.log(user);
console.log(userDP);
io.to(user?.socketId).emit("getMessage",{
    senderId,
    text,
    userDP
})
    })
    // receiverId: post.userId,
    //         userName: userName,
    //         type: "liked",
    //         userDp: DP,
    //         read:false
    socket.on("sendNotification",data=>{
        console.log(data);
        const {receiverId,userName,type,userDp,read,time}=data
        const receiver=users.find(user=>user.userId===receiverId)
        console.log(receiver);
        io.to(receiver?.socketId).emit("getNotification",{
            userName,
            type,
            userDp,
            read,
            time
        })
    })
    socket.on("disconnect", ()=>{
        console.log("a user disconnected");
        console.log(users);
        removeUser(socket.id)
        io.emit("getUser",users)
    })
  });