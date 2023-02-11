import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { postIcons } from '../config/post-icons';
import { postProperties } from './post.properties';

export class PostCreateResource {
  @ApiProperty(postProperties.title)
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiProperty(postProperties.icon)
  @IsString()
  @IsIn(postIcons)
  @IsOptional()
  icon?: string;
}
