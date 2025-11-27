"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutinaService = void 0;
const common_1 = require("@nestjs/common");
const rutina_entity_1 = require("../entities/rutina.entity");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../usuario/entities/usuario.entity");
const typeorm_2 = require("typeorm");
const error_manager_1 = require("../../config/error.manager");
const semana_entity_1 = require("../../semana/entities/semana.entity");
const dia_entity_1 = require("../../dia/entities/dia.entity");
const ejercicio_rutina_entity_1 = require("../../ejercicio-rutina/entities/ejercicio-rutina.entity");
const ejercicio_basico_entity_1 = require("../../ejercicio-basico/entities/ejercicio-basico.entity");
const rta_all_rutinas_dto_1 = require("../dto/rta-all-rutinas.dto");
const class_transformer_1 = require("class-transformer");
const file_img_service_1 = require("../../shared/file-img/file-img.service");
const rta_rutina_dto_1 = require("../dto/rta-rutina.dto");
let RutinaService = class RutinaService {
    usuarioRepository;
    rutinaRepository;
    ejercicioBasicoRepository;
    entityManager;
    fileImgService;
    constructor(usuarioRepository, rutinaRepository, ejercicioBasicoRepository, entityManager, fileImgService) {
        this.usuarioRepository = usuarioRepository;
        this.rutinaRepository = rutinaRepository;
        this.ejercicioBasicoRepository = ejercicioBasicoRepository;
        this.entityManager = entityManager;
        this.fileImgService = fileImgService;
    }
    async createRutina(rutinaDto) {
        try {
            let usuario = null;
            if (rutinaDto.idUsuario) {
                usuario = await this.usuarioRepository.findOneBy({ id: rutinaDto.idUsuario });
                if (!usuario) {
                    throw new error_manager_1.ErrorManager("NOT_FOUND", `No existe el usuario ${rutinaDto.idUsuario}, no se puede asociarlo a la rutina ${rutinaDto.nombreRutina}`);
                }
            }
            const nuevaRutina = new rutina_entity_1.RutinaEntity();
            nuevaRutina.nombreRutina = rutinaDto.nombreRutina;
            nuevaRutina.estadoRutina = rutinaDto.estadoRutina;
            nuevaRutina.usuario = usuario;
            nuevaRutina.semanas = await Promise.all((rutinaDto.semanas ?? []).map(async (semanaDto) => {
                const nuevaSemana = Object.assign(new semana_entity_1.SemanaEntity(), semanaDto);
                nuevaSemana.dias = await Promise.all((semanaDto.dias ?? []).map(async (diaDto) => {
                    const nuevoDia = Object.assign(new dia_entity_1.DiaEntity(), diaDto);
                    nuevoDia.ejerciciosRutina = await Promise.all((diaDto.ejerciciosRutina ?? []).map(async (ejercicioDto) => {
                        const nuevoEjercicio = Object.assign(new ejercicio_rutina_entity_1.EjercicioRutinaEntity(), ejercicioDto);
                        const ejercicioBasico = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: nuevoEjercicio.idEjercicioBasico });
                        if (!ejercicioBasico) {
                            throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encontro los datos del ejercicio basico ${nuevoEjercicio.idEjercicioBasico} `);
                        }
                        nuevoEjercicio.ejercicioBasico = ejercicioBasico;
                        return nuevoEjercicio;
                    }));
                    return nuevoDia;
                }));
                return nuevaSemana;
            }));
            const rutinaCreada = await this.rutinaRepository.save(nuevaRutina);
            if (!rutinaCreada) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `No se pudo crear la rutina ${rutinaDto.nombreRutina}`);
            }
            return (0, class_transformer_1.plainToInstance)(rta_rutina_dto_1.RtaRutinaDto, rutinaCreada, { excludeExtraneousValues: true });
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findAllRutinas() {
        const rutinas = await this.rutinaRepository.find({ where: { nombreRutina: (0, typeorm_2.Not)((0, typeorm_2.Like)('Rutina Basica %')) },
            relations: ['usuario', 'usuario.datosPersonales'] });
        const rtaDto = rutinas.map(r => (0, class_transformer_1.plainToInstance)(rta_all_rutinas_dto_1.RtaAllRutinasDto, {
            idRutina: r.idRutina,
            nombreRutina: r.nombreRutina,
            estadoRutina: r.estadoRutina,
            idUsuario: r.usuario ? r.usuario.id : null,
            nombreUsuario: r.usuario ? r.usuario.datosPersonales ? r.usuario.datosPersonales.nombre.trim() + ' ' + r.usuario.datosPersonales.apellido.trim() : "anonimo" : "anonimo"
        }));
        return rtaDto;
    }
    async findRutinaById(id) {
        try {
            const rutina = await this.rutinaRepository.findOne({
                where: { idRutina: id },
                relations: {
                    usuario: true,
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
                throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encontro la rutina ${id}`);
            }
            console.log("rutina.usuario.id", rutina.usuario?.id);
            return rutina;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findRutinaByName(nombre) {
        try {
            console.log("entre a finbyname");
            const rutina = await this.rutinaRepository.findOneBy({ nombreRutina: nombre });
            return rutina;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async updateRutina(id, rutinaDto) {
        try {
            return (0, class_transformer_1.plainToInstance)(rta_rutina_dto_1.RtaRutinaDto, await this.entityManager.transaction(async (transaccion) => {
                const rutinaExistente = await transaccion.findOne(rutina_entity_1.RutinaEntity, {
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
                    throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encuentra la rutina ${id}`);
                }
                const rutinaDuplicada = await transaccion.findOne(rutina_entity_1.RutinaEntity, {
                    where: {
                        nombreRutina: rutinaDto.nombreRutina,
                        idRutina: (0, typeorm_2.Not)(id),
                    }
                });
                if (rutinaDuplicada) {
                    throw new error_manager_1.ErrorManager("CONFLICT", `El nombre ${rutinaDto.nombreRutina} ya existe en la rutina ${rutinaDuplicada.idRutina}`);
                }
                rutinaExistente.nombreRutina = rutinaDto.nombreRutina;
                rutinaExistente.estadoRutina = rutinaDto.estadoRutina;
                await transaccion.delete(semana_entity_1.SemanaEntity, { rutina: { idRutina: id } });
                rutinaExistente.semanas = await Promise.all((rutinaDto.semanas ?? []).map(async (semanaDto) => {
                    console.log("semanadto -------->", semanaDto);
                    const nuevaSemana = Object.assign(new semana_entity_1.SemanaEntity(), semanaDto);
                    console.log("nuevaSemana ------------>", nuevaSemana);
                    nuevaSemana.dias = await Promise.all((semanaDto.dias ?? []).map(async (diaDto) => {
                        const nuevoDia = Object.assign(new dia_entity_1.DiaEntity(), diaDto);
                        nuevoDia.ejerciciosRutina = await Promise.all((diaDto.ejerciciosRutina ?? []).map(async (ejercicioDto) => {
                            const nuevoEjercicio = Object.assign(new ejercicio_rutina_entity_1.EjercicioRutinaEntity(), ejercicioDto);
                            const ejercicioBasico = await transaccion.findOne(ejercicio_basico_entity_1.EjercicioBasicoEntity, { where: { idEjercicioBasico: ejercicioDto.idEjercicioBasico } });
                            if (!ejercicioBasico) {
                                throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encontro el ejercicio basico ${ejercicioDto.idEjercicioBasico} `);
                            }
                            nuevoEjercicio.ejercicioBasico = ejercicioBasico;
                            return nuevoEjercicio;
                        }));
                        return nuevoDia;
                    }));
                    return nuevaSemana;
                }));
                const rutinaActualizada = await transaccion.save(rutinaExistente);
                return rutinaActualizada;
            }), { excludeExtraneousValues: true });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async deleteRutina(id) {
        try {
            const rutina = await this.rutinaRepository.findOneBy({ idRutina: id });
            if (!rutina) {
                throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encontro la rutina ${id}`);
            }
            await this.entityManager.transaction(async (transaccion) => {
                await transaccion.remove(rutina);
            });
            return true;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async updateEstado(id, body) {
        const unaRutina = await this.rutinaRepository.findOneBy({ idRutina: id });
        if (!unaRutina) {
            throw new error_manager_1.ErrorManager("NOT_FOUND", `Rutina ${id} no encontrada`);
        }
        if (!Object.values(rutina_entity_1.ESTADORUTINA).includes(body.estadoRutina)) {
            throw new error_manager_1.ErrorManager('BAD_REQUEST', 'Estado inválido');
        }
        unaRutina.estadoRutina = body.estadoRutina;
        await this.rutinaRepository.save(unaRutina);
        return true;
    }
};
exports.RutinaService = RutinaService;
exports.RutinaService = RutinaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(rutina_entity_1.RutinaEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(ejercicio_basico_entity_1.EjercicioBasicoEntity)),
    __param(3, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager, file_img_service_1.FileImgService])
], RutinaService);
//# sourceMappingURL=rutina.service.js.map