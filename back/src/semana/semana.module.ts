import { Module } from '@nestjs/common';
import { SemanaService } from './semana.service';
import { SemanaController } from './semana.controller';

@Module({
  controllers: [SemanaController],
  providers: [SemanaService],
})
export class SemanaModule {}
