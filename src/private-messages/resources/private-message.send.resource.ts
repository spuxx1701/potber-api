import { ApiProperty } from '@nestjs/swagger';
import { privateMessageProperties } from './private-message.properties';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Trim } from 'src/utility/transformers/trim.transformer';

export class PrivateMessageSendResource {
  @ApiProperty(privateMessageProperties.title)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Trim()
  title: string;

  @ApiProperty(privateMessageProperties.content)
  @IsString()
  @IsNotEmpty()
  @MaxLength(5120)
  @Trim()
  content: string;

  @ApiProperty(privateMessageProperties.recipientName)
  @IsString()
  @IsNotEmpty()
  @Trim()
  recipientName: string;

  @ApiProperty(privateMessageProperties.saveCopy)
  @IsBoolean()
  @IsOptional()
  saveCopy?: boolean;
}
