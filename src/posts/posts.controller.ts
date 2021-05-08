import { Request, Response } from 'express';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { CommentOnPostDto } from './dto/comment-on-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createPostDto: CreatePostDto, res: Response) {
    return this.postsService.create(createPostDto, res);
  }

  @Get()
  getPosts(@Req() request: Request, @Res() response: Response) {
    return this.postsService.getPosts(request, response);
  }

  @Get(':identifier/:slug')
  getPost(
    @Param('identifier') identifier: string,
    @Param('slug') slug: string,
    @Res() response: Response,
  ) {
    return this.postsService.getPost(identifier, slug, response);
  }

  @Post(':identifier/:slug/comments')
  @UseGuards(JwtAuthenticationGuard)
  commentOnPost(
    @Param('identifier') identifier: string,
    @Param('slug') slug: string,
    @Body() bodyData: CommentOnPostDto,
    @Res() response: Response,
  ) {
    return this.postsService.commentOnPost(
      identifier,
      slug,
      bodyData,
      response,
    );
  }

  @Get(':identifier/:slug/comments')
  getPostComments(
    @Param('identifier') identifier: string,
    @Param('slug') slug: string,
    @Res() response: Response,
  ) {
    return this.postsService.getPostComments(identifier, slug, response);
  }
}
