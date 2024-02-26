const { postModell } = require("../Model/postModel");

const createPost = async (req, res) => {
    try {
        const post = await postModell.create(req.body);
        res.status(201).json({ success: true,message:"Post Created!", data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModell.find();
        res.status(200).json({ success: true,total_post:posts.length, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postModell.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        res.status(200).send({ success: true, data: post });
    } catch (err) {
        res.status(500).send({ success: false, error: err.message });
    }
};

const updatePostById = async (req, res) => {
    try {
        const { title, body, active, geolocation } = req.body;
        const post = await postModell.findByIdAndUpdate(
            req.params.id,
            { title, body, active, geolocation },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        res.status(200).json({ success: true,message:"Updated SuccessFully!", data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deletePostById = async (req, res) => {
    try {
        const post = await postModell.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        res.status(200).json({ success: true,message:"Post Deleted", data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {createPost,getAllPosts,deletePostById,getPostById,updatePostById}
