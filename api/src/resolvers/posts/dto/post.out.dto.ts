import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PostOut {
  @Field()
  id: string;

  @Field()
  text: string;
};