import { Field, InputType, ObjectType } from "type-graphql";
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";
import { FieldsOnCorrectTypeRule } from "graphql";


@InputType()
export class CreateCommentInput {

  @MaxLength(1000, {
    message: "Comment must not be more than 1000 characters",
  })
  @Field()
  comment: string;

  
  // @Field()
  // @IsMongoId()
  // @IsOptional()
  createdBy: any

  @Field()
  @IsMongoId()
  taskId: string

}

@InputType()
export class UpdateCommentInput extends CreateCommentInput {
  @Field()
  @IsMongoId()
  _id?:string;
}

@InputType()
export class GetCommentsInput {
  @Field()
  taskId: string;
}

