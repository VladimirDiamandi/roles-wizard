import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PostCreated {
  @Field()
  id: string;

  @Field()
  message: string;
};