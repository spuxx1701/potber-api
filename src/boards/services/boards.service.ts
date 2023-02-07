import { Injectable } from '@nestjs/common';
import XmlTransformerService from 'src/xml-api/xml-transformer.service';
import BoardResource, { BoardPageResource } from '../resources/board.resource';

@Injectable()
export default class BoardsService {
  constructor(private readonly xmlTransformer: XmlTransformerService) {}

  transformBoard(boardXml: Element): BoardResource {
    // Check whether the board was found and throw an error if it wasn't
    if (this.xmlTransformer.getNode('invalid-board', boardXml))
      throw new Error('not-found');
    // Check whether we have access to the given board and throw an error if we don't
    if (boardXml.nodeName === 'no-access') throw new Error('no-access');
    let page: BoardPageResource | undefined;
    const threadsNode = this.xmlTransformer.getNode('threads', boardXml);
    if (threadsNode) {
      page = {
        page: parseInt(
          this.xmlTransformer.getAttributeValue('page', threadsNode),
        ),
        stickiesCount: parseInt(
          this.xmlTransformer.getAttributeValue('with-stickies', threadsNode),
        ),
        globalsCount: parseInt(
          this.xmlTransformer.getAttributeValue('with-globals', threadsNode),
        ),
        threadsCount: parseInt(
          this.xmlTransformer.getAttributeValue('count', threadsNode),
        ),
        threads: [],
      };
      for (const threadXml of threadsNode.childNodes) {
        // page.threads.push(transformThread(threadXml) as unknown as Thread);
      }
    }
    const board = {
      id: this.xmlTransformer.getAttributeValue('id', boardXml),
      name: this.xmlTransformer.getNodeTextContent('name', boardXml),
      description: this.xmlTransformer.getNodeTextContent(
        'description',
        boardXml,
      ),
      threadsCount: parseInt(
        this.xmlTransformer.getAttributeValue(
          'value',
          this.xmlTransformer.getNode('number-of-threads', boardXml),
        ),
      ),
      repliesCount: parseInt(
        this.xmlTransformer.getAttributeValue(
          'value',
          this.xmlTransformer.getNode('number-of-replies', boardXml),
        ),
      ),
      categoryId: this.xmlTransformer.getAttributeValue(
        'id',
        this.xmlTransformer.getNode('in-category', boardXml),
      ),
      page,
    } as BoardResource;
    return board;
  }
}
