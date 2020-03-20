const Comment = require('../models/Comment');

module.exports = class CommentsService {
  constructor() {}

  async addComment(id, user, text) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id, user, text);
        const comment = await Comment.create({
          text,
          post: id,
          user
        });
        resolve(comment);
      } catch (e) {
        reject(e)
      }
    })
  }

  async getComments(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const comments = await Comment.find({post: id}).populate('user');
        resolve(comments.reverse());
      } catch (e) {
        reject(e)
      }
    })
  }
};