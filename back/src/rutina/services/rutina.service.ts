import { Injectable } from '@nestjs/common';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { UpdateRutinaDto } from '../dto/update-rutina.dto';
import { RutinaEntity } from '../entities/rutina.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { SemanaEntity } from 'src/semana/entities/semana.entity';
import { DiaEntity } from 'src/dia/entities/dia.entity';
import { EjercicioRutinaEntity } from 'src/ejercicio-rutina/entities/ejercicio-rutina.entity';
import { EjercicioBasicoEntity } from 'src/ejercicio-basico/entities/ejercicio-basico.entity';



@Injectable()
export class RutinaService {
  constructor(
    @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(RutinaEntity) private readonly rutinaRepository: Repository<RutinaEntity>,
    @InjectRepository(EjercicioBasicoEntity) private readonly ejercicioBasicoRepository: Repository<EjercicioBasicoEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  public async createRutina(rutinaDto: CreateRutinaDto): Promise<RutinaEntity> {
    try {
      let usuario: UsuarioEntity | null = null;
      if (rutinaDto.idUsuario) {
        usuario = await this.usuarioRepository.findOneBy({ id: rutinaDto.idUsuario });
        if (!usuario) {
          throw new ErrorManager("NOT_FOUND", `No existe el usuario ${rutinaDto.idUsuario}, no se puede asociarlo a la rutina ${rutinaDto.nombreRutina}`);
        }
      }

      //no es aconsejable el create porque no maneja relaciones M:1 (con Usuario por ej) y no maneja la construccion de objetos anidados con relaciones (relacion con ejercicio basico)
      const nuevaRutina = new RutinaEntity();
      nuevaRutina.nombreRutina = rutinaDto.nombreRutina;
      nuevaRutina.estadoRutina = rutinaDto.estadoRutina;
      nuevaRutina.usuario = usuario;
      //las fechas se inicializan automaticamente

      nuevaRutina.semanas = await Promise.all( //si alguna promesa falla, fallan todas
        rutinaDto.semanas.map(async (semanaDto) => {
          const nuevaSemana = Object.assign(new SemanaEntity(), semanaDto);

          nuevaSemana.dias = await Promise.all(
            semanaDto.dias.map(async (diaDto) => {
              const nuevoDia = Object.assign(new DiaEntity(), diaDto);

              nuevoDia.ejerciciosRutina = await Promise.all(
                diaDto.ejerciciosRutina.map(async (ejercicioDto) => {
                  const nuevoEjercicio = Object.assign(new EjercicioRutinaEntity(), ejercicioDto);

                  const ejercicioBasico = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: nuevoEjercicio.idEjercicioBasico });

                  if (!ejercicioBasico) {
                    throw new ErrorManager("NOT_FOUND", `No se encontro los datos del ejercicio basico ${nuevoEjercicio.idEjercicioBasico} `);
                  }
                  nuevoEjercicio.ejercicioBasico = ejercicioBasico;
                  return nuevoEjercicio;
                })
              );
              return nuevoDia;
            })
          );
          return nuevaSemana;
        })
      );

      const rutinaCreada = await this.rutinaRepository.save(nuevaRutina);
      if (!rutinaCreada) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo crear la rutina ${rutinaDto.nombreRutina}`);
      }
      return rutinaCreada;
    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }

  public async findAllRutinas(): Promise<RutinaEntity[]> {
    //no se usa eager = true (en las entitys) para que traiga todos los datos anidados pq cuando quiero todos los nombre de rutina no necesito todos los datos
    const rutinas = await this.rutinaRepository.find({
      relations: {
        semanas: {
          dias: {
            ejerciciosRutina: {
              ejercicioBasico: true
            } //true, la relacion debe incluirse en el resultado
          }
        }
      }
    })
    return rutinas;
  }

  public async findRutinaById(id: number): Promise<RutinaEntity> {
    try {
      //no se puede usar findOneBy pq tengo relaciones anidadas
      const rutina = await this.rutinaRepository.findOne({
        where: { idRutina: id },
        relations: {
          semanas: {
            dias: {
              ejerciciosRutina: {
                ejercicioBasico: true
              }
            }
          }
        }
      });

      if (!rutina) {
        throw new ErrorManager("NOT_FOUND", `No se encontro la rutina ${id}`)
      }

      return rutina; //tambien puede ser null
    }
    catch (err) {
      throw ErrorManager.handle(err)
    }
  }


  public async findRutinaByName(nombre: string): Promise<RutinaEntity | null> {
    try {
      //no se puede usar findOneBy pq tengo relaciones anidadas
      const rutina = await this.rutinaRepository.findOneBy({ nombreRutina: nombre });

      return rutina; //tambien puede ser null
    }
    catch (err) {
      throw ErrorManager.handle(err)
    }
  }

  updateRutina(id: number, updateRutinaDto: UpdateRutinaDto) {
    return `This action updates a #${id} rutina`;
  }

  public async deleteRutina(id: number): Promise<boolean> {
//borrado fisico en cascada hasta ejercicioBasico (ver tambien entity)
    try {

      const rutina = await this.rutinaRepository.findOneBy({ idRutina: id });

      if (!rutina) {
        throw new ErrorManager("NOT_FOUND", `No se encontro la rutina ${id}`);
      }

      //usamos transaccion porque hay muchas tablas anidadas y es mas seguro
      await this.entityManager.transaction(async (transaccion) => {
        await transaccion.remove(rutina); //devuelve rutina, pero no la uso
      });
      return true

    } catch (error) {
      throw ErrorManager.handle(error);
    }

  }
}
