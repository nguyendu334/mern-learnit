import Post from '../models/Post.js';

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate('user', ['username']).sort('-createdAt');
            res.status(200).json({ success: true, posts });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    createPost: async (req, res) => {
        try {
            const newPost = new Post({
                title: req.body.title,
                description: req.body.description,
                url: req.body.url.startsWith('https://') ? req.body.url : `https://${req.body.url}`,
                status: req.body.status || 'TO LEARN',
                user: req.user.id,
            });
            const savedPost = await newPost.save();
            res.status(200).json({ success: true, post: savedPost });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    updatePost: async (req, res) => {
        try {
            const post = await Post.findOneAndUpdate(
                { id: req.params.id },
                {
                    ...req.body,
                    url: req.body.url.startsWith('https://') ? req.body.url : `https://${req.body.url}`,
                    status: req.body.status || 'TO LEARN',
                },
            );
            if (!post) return res.status(403).json('Post not found');
            return res.status(200).json({success: true, message: 'Post updated successfully', post });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    destroyPost: async (req, res) => {
        try {
            const post = await Post.delete({ _id: req.params.id });
            if (!post) return res.status(403).json('Post not found');
            return res.status(200).json({success: true, message: 'Post deleted successfully' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    restorePost: async (req, res) => {
        try {
            const post = await Post.restore({ _id: req.params.id });
            if (!post) return res.status(403).json('Post not found');
            return res.status(200).json({success: true, message: 'Post restored successfully' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    forceDestroyPost: async (req, res) => {
        try {
            const post = await Post.deleteOne({ _id: req.params.id });
            if (!post) return res.status(403).json('Post not found');
            return res.status(200).json({success: true, message: 'Post deleted successfully' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
};

export default postController;
