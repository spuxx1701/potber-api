import { IsEnum } from 'class-validator';
import { PrivateMessageFolder } from 'src/private-messages/types';

export class PrivateMessagesMoveToFolderQuery {
  @IsEnum(PrivateMessageFolder)
  folder: PrivateMessageFolder;
}
