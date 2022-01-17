import { FakeBDDService } from './services/fake-BDD.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FakeBDDService],
  exports: [FakeBDDService],
})
export class SharedModule {}
