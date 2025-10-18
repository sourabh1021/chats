const mongoose = require('mongoose');

const Chat = require("./models/chat.js")

main()
    .then(()=>{
        console.log("connection successful")
    })
    .catch((err)=>{
        console.log(err)
    })

async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [
    {
    from:'suman',
    to:"shree",
    msg: "hello",
    created_at: new Date() // it's inbuilt function
    },
    {
    from:'shree',
    to:"suman",
    msg: "hii",
    created_at: new Date() // it's inbuilt function
    },
    {
    from:'sourabh',
    to:"yash",
    msg: "how are you",
    created_at: new Date() // it's inbuilt function
    },
    {
    from:'yash',
    to:"sourabh",
    msg: "i am fine",
    created_at: new Date() // it's inbuilt function
    },
    {
    from:'abhinav',
    to:"yash,suman,sourabh,shree",
    msg: "Hello mates",
    created_at: new Date() // it's inbuilt function
    },
    
]

Chat.insertMany(allchats)