import { Test, TestingModule } from '@nestjs/testing';
import { EjercicioRutinaService } from './ejercicio-rutina.service';

describe('EjercicioRutinaService', () => {
  let service: EjercicioRutinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjercicioRutinaService],
    }).compile();

    service = module.get<EjercicioRutinaService>(EjercicioRutinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
