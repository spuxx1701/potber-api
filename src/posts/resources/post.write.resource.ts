import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { postIcons } from '../config/post-icons';
import { postProperties } from './post.properties';

export class PostWriteResource {
  @ApiProperty(postProperties.threadId)
  @IsNumberString()
  threadId: string;

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

  @ApiProperty(postProperties.message)
  @IsString()
  @MaxLength(15000)
  message: string;

  @ApiProperty(postProperties.convertUrls)
  @IsOptional()
  @IsBoolean()
  convertUrls: boolean = postProperties.convertUrls.default;

  @ApiProperty(postProperties.disableBbCode)
  @IsOptional()
  @IsBoolean()
  disableBbCode: boolean = postProperties.disableBbCode.default;

  @ApiProperty(postProperties.disableEmojis)
  @IsOptional()
  @IsBoolean()
  disableEmojis: boolean = postProperties.disableEmojis.default;

  constructor(init: PostWriteResource) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}
