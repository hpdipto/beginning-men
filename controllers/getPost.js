
const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.param.id);
    console.log(blogpost);
    res.render('post', {
        blogpost
    });
}