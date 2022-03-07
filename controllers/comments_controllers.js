const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=function(req,res){

// Adding comment only if the post exist realted to that id 
    Post.findById(req.body.post,function(err,post){
        if(post)
        {
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post // same as post: post._id
            },function(err,comment){

                post.comments.push(comment); 
                // It will automatically featch out the id and push it (or you can do comment._id)

                post.save(); // Whenever we are updateing something we have to call save

                res.redirect('/');
            });
        }
    });
}

module.exports.destroy = (req,res)=>{

    Comment.findById(req.params.id,function(err,comment){
        
        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();
            
            // I'm updating this post so use idandupdate
    // so after serching i need to pull ou the comment id so use inbuilt feature $pull
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}},
                function(err,post){
                    return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
        
    });
}