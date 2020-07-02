import { SetMetadata, UseGuards} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { RolesGuard } from '../guards/roles.guard';
import { PostsOut } from '../dto/posts.out.dto';

@Resolver('Posts')
@UseGuards(RolesGuard)
export class PostResolver {
  constructor() {}

  @SetMetadata('roles', ['writer', 'reader'])
  @Query(() => PostsOut)
  async readPost() {
    return {
        message: "all posts"
    }
  }

  @SetMetadata('roles', ['writer'])
  @Mutation(() => PostsOut)
  async editPost() {
    return {
        message: "post edited"
    }
  }

  @SetMetadata('roles', ['writer'])
  @Mutation(() => PostsOut)
  async deletePost() {
    return {
        message: "post deleted"
    }
  }
}