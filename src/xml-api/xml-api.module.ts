import { Module } from '@nestjs/common';
import XmlJsService from './xml-js.service';

@Module({
  exports: [XmlJsService],
  providers: [XmlJsService],
})
export default class XmlApiModule {}
