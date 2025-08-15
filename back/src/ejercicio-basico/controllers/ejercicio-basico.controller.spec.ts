import { Test, TestingModule } from '@nestjs/testing';
import { EjercicioBasicoController } from './ejercicio-basico.controller';
import { EjercicioBasicoService } from '../services/ejercicio-basico.service';

describe('EjercicioBasicoController', () => {
  let controller: EjercicioBasicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjercicioBasicoController],
      providers: [EjercicioBasicoService],
    }).compile();

    controller = module.get<EjercicioBasicoController>(EjercicioBasicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
