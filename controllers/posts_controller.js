const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = (req,res)=>{    
    Post.create({
        content : req.body.content,
        user : req.user._id
    },function(err,post){
        if(err){ console.log('error in creating a post'); return; }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){

    Post.findById(req.params.id,function(err,post){

        // Now we have to check the curent login user id is same a post id or not
       // .id means converting the object into string (as general it is ._it in numberic)
       // mongoose will auto convert for us
    
        if(post && post.user == req.user.id)
        {
            post.remove(); 

            // Also removing all comment on this post from db
            // this will delete all comments that have this post id
            Comment.deleteMany({post: req.params.id },function(err){
                return res.redirect('/');
            });
        }
        else{
            return res.redirect('/');
        }
    });
}