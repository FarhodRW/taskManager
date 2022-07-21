import { Field, InputType, ObjectType } from "type-graphql";
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";
import { STATES } from "./task.schema";
import { FieldsOnCorrectTypeRule } from "graphql";


@InputType()
export class CreateTaskInput {

  @MaxLength(1000, {
    message: "Task must not be more than 1000 characters",
  })
  @Field()
  name: string;

  
  // @Field()
  // @IsMongoId()
  // @IsOptional()
  createdBy: any

  @Field()
  @IsMongoId()
  taskUserId: string


  @Field()
  @IsMongoId()
  @IsOptional()
  parentId?: string

  @Field()
  @IsBoolean()
  isParent: boolean

  @Field()
  @IsEnum(STATES)
  state: STATES;

}

@InputType()
export class UpdateTaskInput extends CreateTaskInput {
  @Field()
  @IsMongoId()
  _id?:string;
}

@InputType()
export class GetTaskInput {
  @Field()
  _id: string;
}


@InputType()
export class SearchTaskInput {
  @Field()
  search: string;
}

