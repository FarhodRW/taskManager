import { isNode } from "graphql/language/ast";
import { Types } from "mongoose";
import {
  CreateTaskInput,
  GetTaskInput,
  SearchTaskInput,
  UpdateTaskInput,
} from "../schema/task/task.dto";
import { TaskModel } from "../schema/task/task.schema";


class TaskService {
  async createTask(input: CreateTaskInput) {
    if(input.parentId) {
      input.isParent = false
    }
    console.log(input)
    return TaskModel.create(input);
  }

  async updateTask(input: UpdateTaskInput) {

    await TaskModel.updateOne({ _id: new Types.ObjectId(input._id) }, input);

    const task = await TaskModel.findById(input._id)

    return task;
  }

  async findTasks() {
    // Pagination login
    const query = {
      isParent: true
    }

    return TaskModel.find(query).lean();
  }

  async findSingleTask(input: GetTaskInput) {
    const $match = {
      $match: {
        _id: new Types.ObjectId(input._id)
      }
    }

    const $lookup = {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'parentId',
        as: 'subtasks'
      }
    }

    const $project = {
      $project: {
        _id: 1,
        name: 1,
        subtasks: {
          _id: 1,
          name: 1
        }
      }
    }

    const pipeline = [$match,$lookup,$project];

    const task = await TaskModel.aggregate(pipeline);
    
    if(task.length) return task.shift();
    else throw new Error('task not found')
  }


  async findSearchTask(input: SearchTaskInput) {
    const $match = {
      $match: {
        name: input.search
      }
    }

    const $lookup = {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'parentId',
        as: 'subtasks'
      }
    }

    const $project = {
      $project: {
        _id: 1,
        name: 1,
        subtasks: {
          _id: 1,
          name: 1
        }
      }
    }

    const pipeline = [$match,$lookup,$project];

    const task = await TaskModel.aggregate(pipeline);
    
    if(task.length) return task.shift();
    else throw new Error('task not found')
  }
}

export default TaskService;
