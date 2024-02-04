const { Socket } = require('socket.io')

const io=require('socket.io')(8001,{
<<<<<<< HEAD
    cors: {
        // origin: "https://mdsasohail.github.io",
        // origin:'http://localhost:3000',
        origin:'*',
        methods: ["GET", "POST"]
      }
=======
    cors:{
        origin: ["*"],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        headers:'Content-Type, Authorization',
    }
>>>>>>> fba169298682a7c54235ec3963a773a25cb809e6
})


let users=[];

const addUser=(socket,userId)=>{
    !users.some((user)=>user.userId===userId)&&users.push({userId,socket})
}


const removeUser=(socketId)=>{
    users=users.filter(user=>user.socket!=socketId)
}

const findSocatId=(receiver)=>{
    return users.find((user)=>user.userId===receiver)
}
io.on("connection",(socket)=>{
    console.log("A user is connected");
    socket.on("addUser",(userId)=>{
        // console.log("Add the user id "+user)  
        addUser(socket.id,userId);
        io.emit("getUsers",users);
    })


 

    socket.on('sendMessage',async({senderId,receiverId,text})=>{
        console.log("Receiver id is in Socket "+receiverId);
           const receiver= await findSocatId(receiverId)
           console.log(receiver);
            io.to(receiver?.socket).emit("getMessage",{senderId,text})
    })

    socket.on("disconnect",()=>{
        console.log("A user is disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})
