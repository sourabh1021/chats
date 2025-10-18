const express = require("express")
const app = express()
const mongoose = require('mongoose');
const path = require("path")
const Chat = require("./models/chat.js")
const methodOverride = require("method-override") // for update

app.use(methodOverride("_method"))
app.set("views",path.join(__dirname,"/views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({ extended: true }))

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

// const chat1 = new Chat({
//     from:'suman1',
//     to:"shree1",
//     msg: "hello1",
//     created_at: new Date() // it's inbuilt function
// })


// chat1.save()
// .then((res)=>{
//     console.log(res)

// })

//Index Routs

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find()
    console.log(chats)
    // res.send("Welcome")
    res.render("index.ejs",{chats})
})

app.get("/",(req,res)=>{
    res.send("server is working")
})

// New route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

//create rout
app.post("/chats",async(req,res)=>{
    let {from,to,msg} = req.body
    await Chat.insertOne({from:from,to:to,msg:msg,created_at: new Date()})
    res.redirect("/chats")
})

//Edit message 
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params
    let chat = await Chat.findById(id)
    // console.log(chat)
    // res.send("working")
    res.render("edit.ejs",{chat})
})

app.patch("/chats/:id",async(req,res)=>{
    let {id} = req.params
    let {msg} = req.body
    await Chat.findByIdAndUpdate(id, { msg:msg }, { runValidators: true, new: true });
    res.redirect("/chats")
})

//Delete
-
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params
    let deletedChat = await Chat.findByIdAndDelete(id)
    console.log(deletedChat)
    res.redirect("/chats")
})
app.listen(8080,()=>{
    console.log("server is listening on port 8080")
})