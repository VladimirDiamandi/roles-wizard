import { SetMetadata, UseGuards, Inject} from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import * as _ from 'lodash';

import { RolesGuard } from '../guards/roles.guard';
import { PostsOut } from '../dto/posts.out.dto';
import { PostCreated } from '../dto/post.create.out.dto';
import { PostService } from './post.service';
import { JwtGuard } from '../guards/jwt.guard';

@Resolver('Posts')
@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
export class PostResolver {
  constructor(
    private postService: PostService,
  ) {}

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

  @SetMetadata('roles', ['writer'])
  @Mutation(() => PostCreated)
  async createPost(@Args('text') text :string, @Context() context) {
    const userId = context.req.userId;
    const post = await this.postService.create(text, userId);
    return {
        id: post.id,
        message: "post created"
    }
  }
}