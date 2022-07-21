import UserResolver from "./user.resolver";
import TaskResolver from "./task.resolver";
import CommentResolver from "./comment.resolver";

export const resolvers = [UserResolver, TaskResolver, CommentResolver] as const;
