import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginOut {
  @Field({nullable: true})
  message?: string;

  @Field({nullable: true})
  error?: string;

  @Field({nullable: true})
  token?: string;
};