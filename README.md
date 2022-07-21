# Task manager assignment

### Task manager is consist of 3 models: User, Task, Comment




---

## Queries & mutations
### Create user
Query
```
mutation createUser($input: CreateUserInput!){
  createUser(input: $input) {
    email
    _id
    name
  }
}
```

Input
```
{
  "input": {
    "email": "1@example.com",
    "name": "Jane Doe",
    "password": "password"
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-11-30.png)


### Login
Query
```
mutation login($input: LoginInput!){
  login(input: $input) 
}
```

Input
```
{
  "input": {
    "email": "1@example.com",
    "password": "password"
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-12-14.png)

### Create a task
You should authorize before to create a task

HTTP HEADERS
```
{
  "Authorization" : "/Token that recieved from login/"
}
```

Query
```
mutation createTask($input: CreateProductInput!){
  createProduct(input: $input){
    name,
    taskUserId,
    isParent
    parentId /If sub task, add parentId, else remove parentId/
    state
  }
}
```

Input
```
{
  "input": {
    "name": "A test task",
    "taskUserId" : "/task users mongoId/"
    "isParent": false,
    "parentId": "/An id of the parent task/",
    "state" : "done"
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-12-50.png)
![test](/screenshot/Screenshot%20from%202022-07-22%2000-13-09.png)


### Get tasks
```
query tasks {
  tasks {
    _id,
    name,
    isParent
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-10-55.png)



### Get a single task with subtasks
Query
```
query task($input: GetTaskInput!) {
  task(input: $input) {
    _id,
    name,
    subTasks{
      _id,
      name
    }
  }
}
```

Input
```
{
  "input": {
    "_id": "/parent task's mongoId/"
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-10-35.png)


### Search task
Query
```
query search($input: SearchTaskInput!) {
  search(input: $input) {
    _id,
    name,
    subTasks{
      _id,
      name
    }
  }
}
```

Input
```
{
  "input": {
    "search": "/name of the task/"
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-30-47.png)



### Create a comment
You should authorize before to create a comment

HTTP HEADERS
```
{
  "Authorization" : "/Token that recieved from login/"
}
```

Query
```
mutation createComment($input: CreateCommentInput!){
  createComment(input: $input){
    comment,
    taskId
  }
}
```

Input
```
{
  "input": {
    "comment" : "test comment",
    "taskId": "/a mongoid of the task/"
  }
}
```
![test](/screenshot/Screenshot%20from%202022-07-22%2000-55-55.png)
![test](/screenshot/Screenshot%20from%202022-07-22%2000-55-44.png)

