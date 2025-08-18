import { Test, TestingModule } from '@nestjs/testing';
import { EjercicioRutinaController } from './ejercicio-rutina.controller';
import { EjercicioRutinaService } from './ejercicio-rutina.service';

describe('EjercicioRutinaController', () => {
  let controller: EjercicioRutinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjercicioRutinaController],
      providers: [EjercicioRutinaService],
    }).compile();

    controller = module.get<EjercicioRutinaController>(EjercicioRutinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
