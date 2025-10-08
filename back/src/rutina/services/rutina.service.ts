import { Injectable } from '@nestjs/common';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { UpdateRutinaDto } from '../dto/update-rutina.dto';
import { RutinaEntity } from '../entities/rutina.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { EntityManager, Not, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { SemanaEntity } from 'src/semana/entities/semana.entity';
import { DiaEntity } from 'src/dia/entities/dia.entity';
import { EjercicioRutinaEntity } from 'src/ejercicio-rutina/entities/ejercicio-rutina.entity';
import { EjercicioBasicoEntity } from 'src/ejercicio-basico/entities/ejercicio-basico.entity';
import { RtaAllRutinasDto } from '../dto/rta-all-rutinas.dto';
import { plainToInstance } from 'class-transformer';



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

  public async findAllRutinas(): Promise<RtaAllRutinasDto[]> {
    //solo trae las rutinas con sus datos basicos y id y nombre/apellido del usuario
    const rutinas = await this.rutinaRepository.find({relations: ['usuario','usuario.datosPersonales']});
    const rtaDto = rutinas.map (r =>plainToInstance(RtaAllRutinasDto, {
      idRutina: r.idRutina,
      nombreRutina: r.nombreRutina,
      estadoRutina: r.estadoRutina,
      idUsuario: r.usuario ? r.usuario.id : null,
      nombreUsuario: r.usuario ? r.usuario.datosPersonales ? r.usuario.datosPersonales.nombre.trim()+' '+ r.usuario.datosPersonales.apellido.trim() : "anonimo": "anonimo"
    }));

    
    return rtaDto;
  }

  //todas las rutinas con todos los datos anidados
  //  public async findAllRutinas(): Promise<RutinaEntity[]> { 
  //     //no se usa eager = true (en las entitys) para que traiga todos los datos anidados pq cuando quiero todos los nombre de rutina no necesito todos los datos
  //     const rutinas = await this.rutinaRepository.find({
  //       relations: {
  //         semanas: {
  //           dias: {
  //             ejerciciosRutina: {
  //               ejercicioBasico: true
  //             } //true, la relacion debe incluirse en el resultado
  //           }
  //         }
  //       }
  //     })
  //     return rutinas;

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
      console.log("entre a finbyname");
      //no se puede usar findOneBy pq tengo relaciones anidadas
      const rutina = await this.rutinaRepository.findOneBy({ nombreRutina: nombre });

      return rutina; //tambien puede ser null
    }
    catch (err) {
      throw ErrorManager.handle(err)
    }
  }

  public async updateRutina(id: number, rutinaDto: CreateRutinaDto): Promise<RutinaEntity> {
    //se borra todos los registros relacionados (semana, dia,etc)  y 
    // se crea nuevamente (pero se conserva el registro de rutina original)

    //ATENCION: no mezclar transacciones con repositorios
    try {

      //se pone en una misma transaccion para que, si se borra la rutina, pero falla la creacion, haga roll back
      return await this.entityManager.transaction(async (transaccion) => {
        const rutinaExistente = await transaccion.findOne(RutinaEntity, {
          where: { idRutina: id },
          relations: {
            semanas: {
              dias: {
                ejerciciosRutina: true,
              },
            },
          },
        });
        if (!rutinaExistente) {
          throw new ErrorManager("NOT_FOUND", `No se encuentra la rutina ${id}`);
        }

        //busca nombres duplicados pero que no sea el registro que estoy modificando
        const rutinaDuplicada = await transaccion.findOne(RutinaEntity, {
          where: {
            nombreRutina: rutinaDto.nombreRutina,
            idRutina: Not(id),
          }
        });
        if (rutinaDuplicada) {
          throw new ErrorManager("CONFLICT", `El nombre ${rutinaDto.nombreRutina} ya existe en la rutina ${rutinaDuplicada.idRutina}`);
        }
        //se mantiene rutina, solo se actualizan los campos
        rutinaExistente.nombreRutina = rutinaDto.nombreRutina;
        rutinaExistente.estadoRutina = rutinaDto.estadoRutina;

        //se borra desde semana
        await transaccion.delete(SemanaEntity, { rutina: { idRutina: id } });//es como si hiciera: DELETE FROM semana WHERE rutinaId = id;
       
        //se crea las nuevas relaciones de rutina con todos los datos
        rutinaExistente.semanas = await Promise.all(
          rutinaDto.semanas.map(async (semanaDto) => {
            const nuevaSemana = Object.assign(new SemanaEntity(), semanaDto);
           
            nuevaSemana.dias = await Promise.all(
              semanaDto.dias.map(async (diaDto) => {
                const nuevoDia = Object.assign(new DiaEntity(), diaDto);
               
                nuevoDia.ejerciciosRutina = await Promise.all(
                  diaDto.ejerciciosRutina.map(async (ejercicioDto) => {
                    const nuevoEjercicio = Object.assign(new EjercicioRutinaEntity(), ejercicioDto);
                    
                    const ejercicioBasico = await transaccion.findOne(EjercicioBasicoEntity, { where: { idEjercicioBasico: ejercicioDto.idEjercicioBasico } });
                    if (!ejercicioBasico) {
                      throw new ErrorManager("NOT_FOUND", `No se encontro el ejercicio basico ${ejercicioDto.idEjercicioBasico} `);
                    }
                    nuevoEjercicio.ejercicioBasico = ejercicioBasico;
                    return nuevoEjercicio
                  })
                );
                return nuevoDia;
              })
            );
            return nuevaSemana;
          })
        );

        const rutinaActualizada = await transaccion.save(rutinaExistente);
        return rutinaActualizada;
      });
    }
    catch (error) {
      throw ErrorManager.handle(error);
    }

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
