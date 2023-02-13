const io = require('socket.io')(3001, {
    path: "/api/socket.io",
    cors: {
        origin:"*",
        methods: ["GET", "POST"]

    }
})
let users = []

const addUser = (userId, socketId) => {
    users[userId] = socketId;
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)

}
const getUser = (userId) => {
    return users.find(user => user?.userId === userId)
}
const getAll = () => {
    return users
}
io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);
    const users = getAll()
    console.log(users, "connected");
    socket.on("addUser", userId => {
        console.log(userId);
        if (userId !== null) {

            addUser(userId, socket.id)
        }
        io.emit("getUser", users)
        const user = getAll()
        console.log("getUser", user);
    })
    //sending message
    socket.on("sendMessage", ({ senderId, receiverId, text, userDP }) => {
        io.to(users[receiverId]).emit("getMessage", {
            senderId,
            text,
            userDP
        })
    })
    socket.on("sendNotification", data => {
        console.log(data);
        const { receiverId, userName, type, userDp, read, time } = data
        io.to(users[receiverId]).emit("getNotification", {
            userName,
            type,
            userDp,
            read,
            time
        })

    })
    socket.on(`disconnect ${socket.id}`, () => {
        removeUser(socket.id)
        io.emit("getUser", users)
    })
});