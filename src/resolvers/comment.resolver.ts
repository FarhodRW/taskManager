import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateCommentInput, GetCommentsInput } from "../schema/comment/comment.dto";
import { Comment } from "../schema/comment/comment.schema";

import CommentService from "../service/comment.service";
import Context from "../types/context";

@Resolver()
export default class CommentResolver {
  constructor(private commentService: CommentService) {
    this.commentService = new CommentService();
  }

  @Authorized()
  @Mutation(() => Comment)
  createComment(
    @Arg("input") input: CreateCommentInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    input.createdBy = user._id
    console.log(input)
    return this.commentService.createComment({ ...input});
  }



  @Query(() =>  Comment)
  comments(@Arg("input") input: GetCommentsInput) {
    return this.commentService.getComments(input);
  }

 
}
