import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { Task } from "../task/task.schema";
import { User } from "../user/user.schema";




@ObjectType()
@index({ _id: 1 })
export class Comment {
  @Field(() => String)
  _id:Types.ObjectId;

  @Field(() => String)
  @prop({ ref: () => User })
  createdBy: Ref<User>;


  @Field(() => String)
  @prop({ required: true, ref: () => Task })
  taskId: Ref<Task>;

  @Field(() => String)
  @prop({ required: true })
  comment : string;
}

export const CommentModel = getModelForClass<typeof Comment>(Comment);
