import { Types } from "mongoose";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateTaskInput,
  GetTaskInput,
  SearchTaskInput,
  UpdateTaskInput,

} from "../schema/task/task.dto";
import { Task } from "../schema/task/task.schema";
import TaskService from "../service/task.service";
import Context from "../types/context";

@Resolver()
export default class TaskResolver {
  constructor(private taskService: TaskService) {
    this.taskService = new TaskService();
  }

  @Authorized()
  @Mutation(() => Task)
  createTask(
    @Arg("input") input: CreateTaskInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    input.createdBy = user._id
    console.log(input)
    return this.taskService.createTask({ ...input});
  }


  @Authorized()
  @Mutation(() => Task)
  updateTask(
    @Arg("input") input: UpdateTaskInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    input.createdBy = user._id
    console.log(input)
    return this.taskService.updateTask(input);
  }

  @Query(() => [Task])
  tasks() {
    return this.taskService.findTasks();
  }

  @Query(() =>  Task)
  task(@Arg("input") input: GetTaskInput) {
    return this.taskService.findSingleTask(input);
  }

  @Query(() =>  Task)
  search(@Arg("input") input: SearchTaskInput) {
    return this.taskService.findSearchTask(input);
  }
}
