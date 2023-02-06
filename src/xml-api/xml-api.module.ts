import { Module } from '@nestjs/common';
import XmlTransformerService from './xml-transformer.service';

@Module({
  exports: [XmlTransformerService],
  providers: [XmlTransformerService],
})
export default class XmlApiModule {}
