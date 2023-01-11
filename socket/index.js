const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]

    }
})
let users = []

const addUser = (userId, socketId) => {
    console.log(userId, socketId, "adding");
    users[userId] =  socketId;
    // const existingUser = users.find((user) => {
    //     user.userId === userId && user.socketId === socketId
    // });
 
    // if(existingUser) {
    //     return{error: "Username is taken"};
    // }
    // users.push({ userId, socketId });
    // return {users};
    // !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
    // users.some((user) => user.userId === userId) && users.push({ userId, socketId })


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
    // console.log(socket);
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
        // const user = getUser(receiverId)
        // const users = getAll()
        // console.log(users, "sendMessage");
        // console.log({ senderId, receiverId, text, userDP });
        // console.log(user);
        // console.log(userDP);
        io.to(users[receiverId]).emit("getMessage", {
            senderId,
            text,
            userDP
        })
        // console.log("user?.socketId", user?.socketId);
        // const use = getAll()
        // console.log(use, "getMessage");
    })
    // receiverId: post.userId,
    //         userName: userName,
    //         type: "liked",
    //         userDp: DP,
    //         read:false
    socket.on("sendNotification", data => {
        console.log(data);
        const { receiverId, userName, type, userDp, read, time } = data
        // const receiver = users.find(user => user.userId === receiverId)
        // console.log(receiver);
        io.to(users[receiverId]).emit("getNotification", {
            userName,
            type,
            userDp,
            read,
            time
        })
        // console.log("user?.socketId", receiver?.socketId);

    })
    socket.on(`disconnect ${socket.id}`, () => {
        console.log("a user disconnected");
        // console.log(users);
        removeUser(socket.id)
        io.emit("getUser", users)
    })
});