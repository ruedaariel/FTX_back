import { Test, TestingModule } from '@nestjs/testing';
import { EjercicioBasicoService } from './ejercicio-basico.service';


describe('EjercicioBasicoService', () => {
  let service: EjercicioBasicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjercicioBasicoService],
    }).compile();

    service = module.get<EjercicioBasicoService>(EjercicioBasicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
