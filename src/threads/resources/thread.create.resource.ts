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

export class OpeningPostResource {
  @ApiProperty({
    description:
      "The opening post's title. Acts as the thread's subtitle. Can be empty.",
    example: "It's a lot of fun!",
    required: false,
  })
  @IsString()
  @Trim()
  @MaxLength(255)
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "The opening posts's icon. Acts as the thread's icon.",
    example: '37',
    required: false,
  })
  @IsNumberString()
  @IsIn(postIcons)
  @IsOptional()
  icon?: string;

  @ApiProperty(postProperties.message)
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
}

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
    description: "The thread's tags.",
    example: ['potber', 'potber-api'],
    required: false,
  })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[] = [];

  @ApiProperty({
    description: 'The opening post of the thread.',
    type: OpeningPostResource,
  })
  openingPost: OpeningPostResource;

  constructor(init: ThreadCreateResource) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}
