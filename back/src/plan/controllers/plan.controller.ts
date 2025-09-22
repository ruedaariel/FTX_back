import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { plainToInstance } from 'class-transformer';
import { PlanRtaCompletaDto } from '../dto/plan-rta-completa.dto';


@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('register')
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get('all')
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return plainToInstance(PlanRtaCompletaDto,this.planService.findOneById(id));
  }

  @Patch('update/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete('delete/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.planService.remove(id);
  }
}
