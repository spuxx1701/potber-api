import { Module } from '@nestjs/common';
import XmlJsService from './xml-js.service';
import XmlTransformerService from './xml-transformer.service';

@Module({
  exports: [XmlTransformerService, XmlJsService],
  providers: [XmlTransformerService, XmlJsService],
})
export default class XmlApiModule {}
