import { Types } from "mongoose";
import { CreateCommentInput, GetCommentsInput, UpdateCommentInput } from "../schema/comment/comment.dto";
import { CommentModel } from "../schema/comment/comment.schema";



class CommentService {
  async createComment(input: CreateCommentInput) {
   
    return CommentModel.create(input);
  }

  async updateComment(input: UpdateCommentInput) {

    await CommentModel.updateOne({ _id: new Types.ObjectId(input._id) }, input);

    const comment = await CommentModel.findById(input._id)

    return comment;
  }

  async getComments(input: GetCommentsInput) {
    const query = input.taskId
    return CommentModel.find({query})
  }



  
}

export default CommentService;
