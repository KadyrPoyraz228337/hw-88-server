const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = class postsService {
 constructor() {}

 async getPosts() {
   return new Promise(async (resolve, reject) => {
     try {
       const posts = await Post.find().sort({datetime: 1}).populate('user');
       const data = await Promise.all(posts.map(async postItem => {
         const totalComments = await Comment.aggregate([
           { $match: {post: postItem._id} },
           { $count: 'totalComments' }
         ]);
         return {...postItem._doc, ...totalComments[0]}
       }));
       resolve(data.reverse())
     } catch (e) {
       reject(e)
     }
   })
 }

  async getPost(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await Post.findOne({_id: id});
        resolve(post)
      } catch (e) {
        reject(e)
      }
    })
  }

 async addPost(title, description, image, user) {
   return new Promise(async (resolve, reject) => {
    try {
      if(!description && image === 'null' || !description && image === undefined) {
        return reject({message: 'image or description must be filled'})
      }
      if(image === 'null' || !image) {
        image = 'textPost.png'
      }

      const post = await Post.create({
        user: user._id,
        title,
        description,
        image
      });

      resolve(post)
    } catch (e) {
      reject(e)
    }
   })
 }
};