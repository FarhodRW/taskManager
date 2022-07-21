import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user.schema";


export enum STATES {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}


@ObjectType()
@index({ _id: 1 })
export class Task {
  @Field(() => String)
  _id:Types.ObjectId;

  @Field(() => String)
  @prop({ ref: () => User })
  createdBy: Ref<User>;


  @Field(() => String)
  @prop({ required: true, ref: () => User })
  taskUserId: Ref<User>;

  @Field(() => String)
  @prop({ required: true })
  name : string;



  @Field(() => String)
  @prop({ref: () => Task})
  parentId: Ref<Task>;
   

  @Field(() => Boolean)
  @prop({ default: false })
  isParent: boolean

  @Field(()=> String)
  @prop({enum: STATES, default: STATES.NOT_STARTED})
  state: STATES

  @Field(() => [Task])
  subtasks: Task[]
}

export const TaskModel = getModelForClass<typeof Task>(Task);
