import { Injectable } from '@nestjs/common';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { UpdateRutinaDto } from '../dto/update-rutina.dto';
import { RutinaEntity } from '../entities/rutina.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';



@Injectable()
export class RutinaService {
  constructor(
    @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(RutinaEntity) private readonly rutinaRepository: Repository<RutinaEntity>,
  ) { }

  public async createRutina(createRutinaDto: CreateRutinaDto): Promise<RutinaEntity> {
    try {
      let usuario: UsuarioEntity | null = null;
      if (createRutinaDto.idUsuario) {
        usuario = await this.usuarioRepository.findOneBy({ id: createRutinaDto.idUsuario });
        if (!usuario) {
          throw new ErrorManager("NOT_FOUND", `No existe el usuario ${createRutinaDto.idUsuario}, no se puede asociarlo a la rutina ${createRutinaDto.nombreRutina}`);
        }
      }
      const creaRutina = new RutinaEntity();
      creaRutina.nombreRutina = createRutinaDto.nombreRutina;
      creaRutina.estadoRutina = createRutinaDto.estadoRutina;
      creaRutina.usuario = usuario;
    
      const rutinaCreada = await this.rutinaRepository.save(creaRutina);
      if (!rutinaCreada) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo crear la rutina ${createRutinaDto.nombreRutina}`);
      }
      return rutinaCreada;
    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }

  findAllRutinas() {
    return `This action returns all rutina`;
  }

  findRutinaById(id: number) {
    return `This action returns a #${id} rutina`;
  }

  updateRutina(id: number, updateRutinaDto: UpdateRutinaDto) {
    return `This action updates a #${id} rutina`;
  }

  deleteRutina(id: number) {
    return `This action removes a #${id} rutina`;
  }
}
