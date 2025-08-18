import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { RutinaService } from '../services/rutina.service';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { UpdateRutinaDto } from '../dto/update-rutina.dto';


@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Post('register')
  create(@Body() createRutinaDto: CreateRutinaDto) {
    return this.rutinaService.create(createRutinaDto);
  }

  @Get('all')
  findAll() {
    return this.rutinaService.findAll();
  }

  @Get(':id')
  findRutinaById(@Param('id',ParseIntPipe) id: number) {
    return this.rutinaService.findRutinaById(id);
  }

  @Put('update:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateRutinaDto: UpdateRutinaDto) {
    return this.rutinaService.update(id, updateRutinaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.rutinaService.remove(id);
  }
}
