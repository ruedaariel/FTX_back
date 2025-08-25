import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { RutinaService } from '../services/rutina.service';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { UpdateRutinaDto } from '../dto/update-rutina.dto';


@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Post('register')
public async  registerRutina(@Body() createRutinaDto: CreateRutinaDto) {
    return this.rutinaService.createRutina(createRutinaDto);
  }

  @Get('all')
  public async findAllRutinas() {
    return this.rutinaService.findAllRutinas();
  }

  @Get(':id')
  public async findRutinaById(@Param('id',ParseIntPipe) id: number) {
    return this.rutinaService.findRutinaById(id);
  }

  @Put('update:id')
  public async update(@Param('id',ParseIntPipe) id: number, @Body() updateRutinaDto: UpdateRutinaDto) {
    return this.rutinaService.updateRutina(id, updateRutinaDto);
  }

  @Delete('delete/:id')
  public async deleteRutina(@Param('id',ParseIntPipe) id: number) {
    return this.rutinaService.deleteRutina(id);
  }
}
