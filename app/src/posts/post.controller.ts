import { Controller, Post, Delete, Get, SetMetadata, UseGuards} from '@nestjs/common';

import { RolesGuard } from '../guards/roles.guard';

@Controller('posts')
@UseGuards(RolesGuard)
export class PostController {
  constructor() {
      
  }

  @SetMetadata('roles', ['writer', 'reader'])
  @Get('')
  async readPosts() {
    return {
        message: "all posts"
    }
  }

  @SetMetadata('roles', ['writer'])
  @Post('')
  async editPosts() {
    return {
        message: "post edited"
    }
  }

  @SetMetadata('roles', ['writer'])
  @Delete('')
  async deletePosts() {
    return {
        message: "post deleted"
    }
  }
}