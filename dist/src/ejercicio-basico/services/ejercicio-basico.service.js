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
exports.EjercicioBasicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ejercicio_basico_entity_1 = require("../entities/ejercicio-basico.entity");
const typeorm_2 = require("typeorm");
const error_manager_1 = require("../../config/error.manager");
const config_1 = require("@nestjs/config");
const normalizar_string_1 = require("../../utils/normalizar-string");
const file_img_service_1 = require("../../shared/file-img/file-img.service");
const rta_nombre_ejercicio_basico_dto_1 = require("../dto/rta-nombre-ejercicio-basico.dto");
const class_transformer_1 = require("class-transformer");
const rta_ejercicio_basico_dto_1 = require("../dto/rta-ejercicio-basico.dto");
let EjercicioBasicoService = class EjercicioBasicoService {
    ejercicioBasicoRepository;
    configService;
    fileImgService;
    constructor(ejercicioBasicoRepository, configService, fileImgService) {
        this.ejercicioBasicoRepository = ejercicioBasicoRepository;
        this.configService = configService;
        this.fileImgService = fileImgService;
    }
    async createEjercicioBasico(ejercicioBasicoDto) {
        try {
            const ejercicioGuardado = await this.existName(ejercicioBasicoDto.nombreEjercicio);
            if (!ejercicioGuardado) {
                const nuevoEjercicioBasico = Object.assign(new ejercicio_basico_entity_1.EjercicioBasicoEntity(), ejercicioBasicoDto);
                const ejercicioCreado = await this.ejercicioBasicoRepository.save(nuevoEjercicioBasico);
                console.log("ejercicio Creado --->", ejercicioCreado);
                const rtaEjercicioDto = (0, class_transformer_1.plainToInstance)(rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto, ejercicioCreado, { excludeExtraneousValues: true });
                console.log("ejercicio RTA --->", rtaEjercicioDto);
                return rtaEjercicioDto;
            }
            else {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "ya existe el mismo nombre de ejercicio");
            }
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findByName(nombreEj) {
        try {
            const unEjercicio = await this.ejercicioBasicoRepository.findOne({ where: { nombreEjercicio: (0, normalizar_string_1.normalizarSinEspacios)(nombreEj) }, });
            if (!unEjercicio) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `no se encontró ejercicio con nombre ${nombreEj}`);
            }
            const rtaEjercicioDto = (0, class_transformer_1.plainToInstance)(rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto, unEjercicio, { excludeExtraneousValues: true });
            return unEjercicio;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async existName(nombreEj) {
        try {
            const unEjercicio = await this.ejercicioBasicoRepository.findOne({ where: { nombreEjercicio: (0, normalizar_string_1.normalizarSinEspacios)(nombreEj) }, });
            if (!unEjercicio) {
                return false;
            }
            return true;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async remove(id) {
        try {
            const ejercicioGuardado = await this.ejercicioBasicoRepository.findOne({
                where: { idEjercicioBasico: id },
                relations: ['ejerciciosRutina']
            });
            if (!ejercicioGuardado) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "No se encontro el ejercicio");
            }
            if (ejercicioGuardado.ejerciciosRutina && ejercicioGuardado.ejerciciosRutina.length > 0) {
                throw new error_manager_1.ErrorManager("CONFLICT", "No se puede borrar el ejercicio, \n hay rutinas que estan utilizando");
            }
            const ejercicioBorrado = await this.ejercicioBasicoRepository.delete({ idEjercicioBasico: id });
            if (ejercicioBorrado.affected === 0) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "No se borro el ejercicio");
            }
            if (ejercicioGuardado.imagenLink) {
                const imgBorrada = await this.fileImgService.borrarImagen(ejercicioGuardado.imagenLink, "ejercicios");
                if (imgBorrada) {
                    console.log(`se borro la imagen del ejercicio ${id}, ${ejercicioGuardado.imagenLink}`);
                }
                else {
                    console.log(`No existe la imagen ${ejercicioGuardado.imagenLink}`);
                }
            }
            return true;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findOne(id) {
        try {
            const unEjercicio = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
            if (!unEjercicio) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `No se encontro el ejercicio id ${id}`);
            }
            const rtaEjercicioDto = (0, class_transformer_1.plainToInstance)(rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto, unEjercicio, { excludeExtraneousValues: true });
            return rtaEjercicioDto;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findAll() {
        try {
            const ejercicios = await this.ejercicioBasicoRepository.find({
                order: { nombreEjercicio: 'ASC' }
            });
            const rtaEjerciciosDto = (0, class_transformer_1.plainToInstance)(rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto, ejercicios, { excludeExtraneousValues: true });
            return rtaEjerciciosDto;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findAllNames() {
        try {
            const ejercicios = await this.ejercicioBasicoRepository.find();
            return (0, class_transformer_1.plainToInstance)(rta_nombre_ejercicio_basico_dto_1.RtaNombreEjercicioBasicoDto, ejercicios, { excludeExtraneousValues: true });
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async update(id, updateEjercicioBasicoDto) {
        try {
            const ejercicioGuardado = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
            if (!ejercicioGuardado) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `No se encuentra ejercicio id ${id}`);
            }
            if (updateEjercicioBasicoDto.nombreEjercicio) {
                const ejercicioControl = await this.ejercicioBasicoRepository.findOne({
                    where: { nombreEjercicio: updateEjercicioBasicoDto.nombreEjercicio, idEjercicioBasico: (0, typeorm_2.Not)(id), }
                });
                if (ejercicioControl) {
                    throw new error_manager_1.ErrorManager("BAD_REQUEST", "Nombre del ejercicio duplicado");
                }
            }
            ;
            let borrarImg = false;
            let nombreImgAborrar = "";
            if (updateEjercicioBasicoDto.imagenLink && ejercicioGuardado.imagenLink &&
                updateEjercicioBasicoDto.imagenLink !== ejercicioGuardado.imagenLink) {
                nombreImgAborrar = ejercicioGuardado.imagenLink;
                borrarImg = true;
            }
            ;
            Object.assign(ejercicioGuardado, updateEjercicioBasicoDto);
            const ejercicioModif = await this.ejercicioBasicoRepository.save(ejercicioGuardado);
            if (!ejercicioModif) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `No se pudo guardar la modificacion del ejercicio id ${id}`);
            }
            if (borrarImg) {
                const imgBorrada = await this.fileImgService.borrarImagen(nombreImgAborrar, "ejercicios");
                if (imgBorrada) {
                    console.log(`se borro la imagen del ejercicio ${id}, ${ejercicioGuardado.imagenLink}`);
                }
                else {
                    console.log(`No existe la imagen ${ejercicioGuardado.imagenLink}`);
                }
            }
            return (0, class_transformer_1.plainToInstance)(rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto, ejercicioModif, { excludeExtraneousValues: true });
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
};
exports.EjercicioBasicoService = EjercicioBasicoService;
exports.EjercicioBasicoService = EjercicioBasicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ejercicio_basico_entity_1.EjercicioBasicoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        file_img_service_1.FileImgService])
], EjercicioBasicoService);
//# sourceMappingURL=ejercicio-basico.service.js.map