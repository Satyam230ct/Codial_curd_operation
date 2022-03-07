const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){    
    // console.log(req.cookies); // Printing the cookies
    // Changing the val of cookie we have to edit in res 
    // res.cookie('user_id',25);
/*
    Post.find({},function(err,posts){
        return res.render('home',{
            title: 'Codial | Home',
            posts: posts
        });
    });
*/

// To display about user information also we have to pre
// populate the user db
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
    
        User.find({},function(err,user){
            return res.render('home',{
                title: 'Codial | Home',
                posts: posts,
                all_users:user
            });
        });
    });
}