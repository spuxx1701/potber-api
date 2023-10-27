import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { postIcons } from 'src/posts/config/post-icons';
import { postProperties } from 'src/posts/resources/post.properties';
import { Trim } from 'src/utility/transformers/trim.transformer';

export class ThreadCreateResource {
  @ApiProperty({
    description: 'The board you want the thread to create in.',
    example: '75',
  })
  @IsNumberString()
  boardId: string;

  @ApiProperty({
    description: "The thread's title.",
    example: 'This thread was created using potber-api!',
  })
  @IsString()
  @Trim()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: "The thread's subtitle.",
    example: "It's a lot of fun!",
  })
  @IsString()
  @Trim()
  @MaxLength(255)
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description:
      "The thread's icon. Will be the same as as the opening post's icon.",
    example: '37',
  })
  @IsNumberString()
  @IsIn(postIcons)
  @IsOptional()
  icon?: string;

  @ApiProperty({
    description: "The thread's tags.",
    example: ['potber', 'potber-api'],
  })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[] = [];

  @ApiProperty({
    description: "The message body of the thread's opening post.",
    example:
      'This thread was created using potber-api. Find out more about potber-api [url=https://github.com/spuxx1701/potber-api]here[/url]!',
  })
  @IsString()
  @Trim()
  @MinLength(1)
  @MaxLength(15000)
  message: string;

  @ApiProperty(postProperties.convertUrls)
  @IsOptional()
  @IsBoolean()
  convertUrls?: boolean = postProperties.convertUrls.default;

  @ApiProperty(postProperties.disableBbCode)
  @IsOptional()
  @IsBoolean()
  disableBbCode?: boolean = postProperties.disableBbCode.default;

  @ApiProperty(postProperties.disableEmojis)
  @IsOptional()
  @IsBoolean()
  disableEmojis?: boolean = postProperties.disableEmojis.default;

  constructor(init: ThreadCreateResource) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}
