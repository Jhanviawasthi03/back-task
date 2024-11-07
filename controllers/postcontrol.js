const Post=require("../models/postmodel");

exports.createpost = async (req, res) => {
    try {
        const { title, image, description, createdAt, tags, user } = req.body;
        
        const post = new Post({
            title,
            image,
            description,
            createdAt,
            tags,
            user,
        });
        
        const savedPost = await post.save();

        res.status(201).json({
            success: true,
            post: savedPost,
        });
    } catch (error) {
        console.error("Error while creating post:", error);
        return res.status(400).json({
            success: false,
            message: "Error while creating post",
            error: error.message 
        });
    }
};



exports.getallpost=async(req,res)=>{
    try{
        const posts=await Post.find();
        res.json({
            posts,
        });
    }
    catch(error){
        return res.status(400).json({
            error:"error while fetching posts",
        });
    }
};



exports.updatePost = async (req, res) => {
    try {
        const postid = req.params.id;
        const updatedata = req.body;

        const updatedPost = await Post.findByIdAndUpdate(postid, updatedata, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({
            success: true,
            post: updatedPost,
            message: "Post updated successfully",
        });
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(400).json({
            success: false,
            message: "Error while updating post",
        });
    }
};



exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        return res.status(400).json({
             error: "Error while deleting post" 
            });
    }
};
