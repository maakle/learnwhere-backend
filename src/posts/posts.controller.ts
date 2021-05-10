// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { request, Response } from 'express';

import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CommentOnPostDto } from './dto/comment-on-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() request: RequestWithUser,
    response: Response,
  ) {
    return this.postsService.create(createPostDto, request, response);
  }

  @Get()
  getPosts(@Req() request: RequestWithUser, @Res() response: Response) {
    return this.postsService.getPosts(request, response);
  }

  @Get(':identifier/:slug')
  getPost(
    @Param('identifier') identifier: string,
    @Param('slug') slug: string,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    return this.postsService.getPost(identifier, slug, request, response);
  }

  @Post(':identifier/:slug/comments')
  @UseGuards(JwtAuthenticationGuard)
  commentOnPost(
    @Param('identifier') identifier: string,
    @Param('slug') slug: string,
    @Body() bodyData: CommentOnPostDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    return this.postsService.commentOnPost(
      identifier,
      slug,
      bodyData,
      request,
      response,
    );
  }

  @Get(':identifier/:slug/comments')
  getPostComments(
    @Param('identifier') identifier: string,
    @Param('slug') slug: string,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    return this.postsService.getPostComments(
      identifier,
      slug,
      request,
      response,
    );
  }
}
