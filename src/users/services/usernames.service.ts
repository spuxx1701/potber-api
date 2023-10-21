import { Injectable } from '@nestjs/common';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class UsernamesService {
  constructor(private readonly httpService: HttpService) {}
  async findMany(startsWith?: string): Promise<string[]> {
    const url = `${forumConfig.FORUM_URL}pm/async/usernames.php?v=${
      startsWith ?? ''
    }`;
    const { data } = await this.httpService.get(url);
    // Split and filter out empty values
    const usernames = data.split('\n').filter((username) => username);
    return usernames;
  }
}
