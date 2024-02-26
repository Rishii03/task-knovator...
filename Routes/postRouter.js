const express = require("express")
const { createPost, getAllPosts, getPostById, deletePostById, updatePostById } = require("../Controller/postController")
const verify = require("../Utils/JWTVerify")

const postRoute = express.Router()
postRoute.post("/create",createPost)

postRoute.get("/",getAllPosts)
postRoute.get("/singlepost/:id",getPostById)
postRoute.put("/update/:id",verify,updatePostById)
postRoute.delete("delete/:id",verify,deletePostById)
module.exports = {postRoute}