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
exports.UsuarioService = void 0;
exports.clonarRutinaParaUsuario = clonarRutinaParaUsuario;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const error_manager_1 = require("../../config/error.manager");
const datos_personales_entity_1 = require("../../usuario-datos-personales/entities/datos-personales.entity");
const datos_fisicos_entity_1 = require("../../usuario-datos-fisicos/entities/datos-fisicos.entity");
const plan_service_1 = require("../../plan/services/plan.service");
const estado_enum_1 = require("../../constantes/estado.enum");
const rutina_entity_1 = require("../../rutina/entities/rutina.entity");
const bcrypt = require("bcrypt");
const email_service_1 = require("../../shared/email/email.service");
const random_password_1 = require("../../utils/random-password");
const usuario_rta_dto_1 = require("../dto/usuario-rta.dto");
const class_transformer_1 = require("class-transformer");
const file_img_service_1 = require("../../shared/file-img/file-img.service");
const transformar_fecha_1 = require("../../utils/transformar-fecha");
const usuario_datos_completos_rta_dto_1 = require("../dto/usuario-datos-completos-rta.dto");
const plan_entity_1 = require("../../plan/entities/plan.entity");
const rol_1 = require("../../constantes/rol");
const pago_entity_1 = require("../../pagos/entity/pago.entity");
const semana_entity_1 = require("../../semana/entities/semana.entity");
const dia_entity_1 = require("../../dia/entities/dia.entity");
const ejercicio_rutina_entity_1 = require("../../ejercicio-rutina/entities/ejercicio-rutina.entity");
const levels_plan_1 = require("../../constantes/levels-plan");
let UsuarioService = class UsuarioService {
    usuarioRepository;
    entityManager;
    dataSource;
    emailService;
    planService;
    fileImgService;
    constructor(usuarioRepository, entityManager, dataSource, emailService, planService, fileImgService) {
        this.usuarioRepository = usuarioRepository;
        this.entityManager = entityManager;
        this.dataSource = dataSource;
        this.emailService = emailService;
        this.planService = planService;
        this.fileImgService = fileImgService;
    }
    async createUsuario(body) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let unPlan = null;
            if (body.datosPersonales) {
                if (body.datosPersonales.idPlan) {
                    unPlan = await this.planService.findOneById(body.datosPersonales.idPlan);
                    if (!unPlan) {
                        throw new error_manager_1.ErrorManager("NOT_FOUND", `No existe el plan ${body.datosPersonales.idPlan}`);
                    }
                }
            }
            const usuarioExistente = await this.findUsuarioByMail(body.datosBasicos.email);
            if (usuarioExistente) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `Mail existente no se puede crear el usuario. Estado de usuario: ${usuarioExistente.estado}`);
            }
            const contrasenaGenerada = (0, random_password_1.generateRandomPassword)();
            const contrasenaHasheada = await bcrypt.hash(contrasenaGenerada, +process.env.HASH_SALT);
            const usuarioBasico = this.usuarioRepository.create({ ...body.datosBasicos, password: contrasenaHasheada });
            const usuarioCreado = await queryRunner.manager.save(usuario_entity_1.UsuarioEntity, usuarioBasico);
            if (usuarioCreado.rol === rol_1.ROL.USUARIO) {
                if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
                    const datosPersonales = new datos_personales_entity_1.DatosPersonalesEntity();
                    datosPersonales.id = usuarioCreado.id;
                    if (body.datosPersonales.fNacimiento) {
                        datosPersonales.fNacimiento = (0, transformar_fecha_1.transformarFecha)(body.datosPersonales.fNacimiento);
                    }
                    const { idPlan, fNacimiento, ...restoDatos } = body.datosPersonales;
                    Object.assign(datosPersonales, restoDatos);
                    datosPersonales.plan = unPlan;
                    usuarioCreado.datosPersonales = datosPersonales;
                }
                if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
                    const datosFisicos = new datos_fisicos_entity_1.DatosFisicosEntity();
                    datosFisicos.id = usuarioCreado.id;
                    Object.assign(datosFisicos, body.datosFisicos);
                    usuarioCreado.datosFisicos = datosFisicos;
                }
                const usuarioFinal = await queryRunner.manager.save(usuario_entity_1.UsuarioEntity, usuarioCreado);
                if (unPlan?.idPlan === 1) {
                    const usuarioSinRelaciones = await queryRunner.manager.findOneBy(usuario_entity_1.UsuarioEntity, { id: usuarioFinal.id });
                    const hoy = new Date();
                    const fechaVencimiento = new Date(hoy);
                    fechaVencimiento.setDate(fechaVencimiento.getDate() + 15);
                    if (!usuarioSinRelaciones) {
                        throw new error_manager_1.ErrorManager("BAD_REQUEST", "No se creo el usuario");
                    }
                    const pago = queryRunner.manager.create(pago_entity_1.PagoEntity, {
                        fechaPago: hoy,
                        fechaVencimiento: fechaVencimiento,
                        estado: 'approved',
                        diasAdicionales: 0,
                        metodoDePago: pago_entity_1.METODODEPAGO.EFECTIVO,
                        monto: 0,
                        referencia: 'plan gratis',
                        usuario: usuarioSinRelaciones,
                    });
                    await queryRunner.manager.save(pago_entity_1.PagoEntity, pago);
                    let rutinaBasica = await queryRunner.manager.findOne(rutina_entity_1.RutinaEntity, {
                        where: { nombreRutina: 'Rutina Basica' },
                        relations: ['semanas', 'semanas.dias', 'semanas.dias.ejerciciosRutina', 'semanas.dias.ejerciciosRutina.ejercicioBasico']
                    });
                    if (!rutinaBasica) {
                        rutinaBasica = await queryRunner.manager.findOne(rutina_entity_1.RutinaEntity, {
                            where: { usuario: (0, typeorm_2.IsNull)() },
                            relations: ['semanas', 'semanas.dias', 'semanas.dias.ejerciciosRutina']
                        });
                    }
                    console.log("usuario sin relaciones ------> ", usuarioSinRelaciones);
                    if (!rutinaBasica) {
                        throw new error_manager_1.ErrorManager("CONFLICT", "No se encontró la rutina \n Contactate con tu trainer");
                    }
                    console.log("antes de entrar a rutina gratis", rutinaBasica);
                    const nuevaRutina = await clonarRutinaParaUsuario(rutinaBasica, `Rutina Básica // ${usuarioFinal.id}`, usuarioSinRelaciones, queryRunner.manager);
                    console.log("nuevaRutina", nuevaRutina);
                }
                await queryRunner.commitTransaction();
                const usuarioRtaDto = (0, class_transformer_1.plainToInstance)(usuario_rta_dto_1.UsuarioRtaDto, usuarioFinal);
                setImmediate(async () => {
                    try {
                        await this.emailService.enviarCredenciales(usuarioFinal.email, contrasenaGenerada);
                    }
                    catch (error) {
                        console.error("Error enviando mail:", error.message);
                    }
                });
                return usuarioRtaDto;
            }
            else {
                await queryRunner.commitTransaction();
                const usuarioRtaDto = (0, class_transformer_1.plainToInstance)(usuario_rta_dto_1.UsuarioRtaDto, usuarioCreado);
                setImmediate(async () => {
                    try {
                        await this.emailService.enviarCredenciales(usuarioCreado.email, contrasenaGenerada);
                    }
                    catch (error) {
                        console.error("Error enviando mail:", error.message);
                    }
                });
                return usuarioRtaDto;
            }
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error_manager_1.ErrorManager.handle(error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllUsuarios() {
        try {
            const usuarios = await this.usuarioRepository.find({
                relations: ['datosPersonales', 'datosPersonales.plan', 'datosFisicos'],
            });
            if (usuarios.length === 0) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "No se encontró usuarios");
            }
            const usuariosDto = (0, class_transformer_1.plainToInstance)(usuario_datos_completos_rta_dto_1.UsuarioDatosCompletosRtaDto, usuarios);
            return usuariosDto;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findUsuarioById(id) {
        try {
            const unUsuario = await this.usuarioRepository.findOne({
                where: { id: id },
                relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan']
            });
            if (!unUsuario) {
                throw new error_manager_1.ErrorManager("NOT_FOUND", `Usuario con id ${id} no encontrado`);
            }
            return unUsuario;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findUsuarioByMail(mail) {
        try {
            const unUsuario = await this.usuarioRepository.findOneBy({ email: mail });
            return unUsuario;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async findRutinasxId(id) {
        const unUsuario = await this.usuarioRepository.findOneBy({ id: id });
        if (!unUsuario || unUsuario.estado === estado_enum_1.ESTADO.ARCHIVADO) {
            throw new error_manager_1.ErrorManager("BAD_REQUEST", `No existe el usuario ${id} `);
        }
        ;
        const usuarioConRutinas = await this.usuarioRepository.find({
            where: { id: id },
            relations: ['rutinas']
        });
        if (usuarioConRutinas && usuarioConRutinas.length > 0 && usuarioConRutinas[0].rutinas) {
            const rutinasDto = usuarioConRutinas[0].rutinas.map((r) => ({
                idUsuario: id,
                idRutina: r.idRutina,
                nombreRutina: r.nombreRutina,
                estadoRutina: r.estadoRutina
            }));
            return rutinasDto;
        }
        else
            return null;
    }
    async updateUsuario(id, body) {
        try {
            const usuarioGuardado = await this.usuarioRepository.findOne({
                where: { id },
                relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan'],
            });
            if (!usuarioGuardado) {
                throw new error_manager_1.ErrorManager("NOT_FOUND", "No se encontro usuario");
            }
            if (usuarioGuardado.estado == estado_enum_1.ESTADO.ARCHIVADO) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "El usuario esta dado de baja");
            }
            if (body.datosBasicos && Object.keys(body.datosBasicos).length > 0) {
                if (body.datosBasicos.password) {
                    usuarioGuardado.password = await bcrypt.hash(body.datosBasicos.password, +process.env.HASH_SALT);
                    usuarioGuardado.passwordChangedAt = new Date();
                    delete body.datosBasicos.password;
                    const direccionEmail = usuarioGuardado.email;
                    setImmediate(async () => {
                        try {
                            await this.emailService.enviarCambioContrasena(direccionEmail);
                        }
                        catch (error) {
                            console.error("Error enviando mail:", error.message);
                        }
                    });
                    if (usuarioGuardado.level === 0) {
                        usuarioGuardado.level = usuarioGuardado.datosPersonales?.plan?.level ?? levels_plan_1.PLAN_MENOR_LEVEL;
                    }
                }
                Object.assign(usuarioGuardado, body.datosBasicos);
            }
            if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
                if (!usuarioGuardado.datosPersonales) {
                    usuarioGuardado.datosPersonales = new datos_personales_entity_1.DatosPersonalesEntity;
                }
                if (body.datosPersonales.fNacimiento) {
                    usuarioGuardado.datosPersonales.fNacimiento = (0, transformar_fecha_1.transformarFecha)(body.datosPersonales.fNacimiento);
                }
                if (body.datosPersonales.idPlan) {
                    const planActualizado = await this.planService.findOneById(body.datosPersonales.idPlan);
                    if (!planActualizado) {
                        throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encontro el plan ${body.datosPersonales.idPlan}`);
                    }
                    usuarioGuardado.datosPersonales.plan = planActualizado;
                    delete body.datosPersonales.idPlan;
                }
                Object.assign(usuarioGuardado.datosPersonales, body.datosPersonales);
            }
            if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
                if (!usuarioGuardado.datosFisicos) {
                    usuarioGuardado.datosFisicos = new datos_fisicos_entity_1.DatosFisicosEntity;
                }
                Object.assign(usuarioGuardado.datosFisicos, body.datosFisicos);
            }
            const usuarioUpdate = await this.usuarioRepository.save(usuarioGuardado);
            console.log("CONTROLAR USUARIO ANTES DE SALIR... ver lo que queda guardado", usuarioUpdate);
            if (!usuarioUpdate) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `No se pudo actualizar los datos del usuario ${usuarioGuardado.datosPersonales?.apellido.trim()}+${usuarioGuardado.datosPersonales?.nombre.trim()} `);
            }
            return true;
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async updateImagenPerfil(id, fileName) {
        try {
            let imagenVieja = "";
            const usuarioGuardado = await this.usuarioRepository.findOne({
                where: { id },
                relations: ['datosPersonales'],
            });
            if (!usuarioGuardado) {
                throw new error_manager_1.ErrorManager("NOT_FOUND", "No se encontro usuario");
            }
            if (!usuarioGuardado.datosPersonales) {
                throw new error_manager_1.ErrorManager("NOT_FOUND", "El usuario no tiene datos personales guardados");
            }
            if (usuarioGuardado.datosPersonales.imagenPerfil && usuarioGuardado.datosPersonales.imagenPerfil !== "usuario.png") {
                imagenVieja = usuarioGuardado.datosPersonales.imagenPerfil;
            }
            usuarioGuardado.datosPersonales.imagenPerfil = fileName;
            const usuarioUpdate = await this.usuarioRepository.save(usuarioGuardado);
            if (!usuarioUpdate) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", `No se pudo actualizar los datos del usuario ${usuarioGuardado.id} `);
            }
            if (imagenVieja) {
                const imgBorrada = await this.fileImgService.borrarImagen(imagenVieja, "perfiles");
                if (imgBorrada) {
                    console.log(`se borro la imagen de perfil anterior del usuario ${id}`);
                }
                else {
                    console.log(`No existe la imagende perfil anterior del usuario ${id}`);
                }
            }
            return true;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async updateUsuarioBasico(id, body) {
        try {
            return await this.entityManager.transaction(async (transaccion) => {
                const usuarioGuardado = await transaccion.findOne(usuario_entity_1.UsuarioEntity, {
                    where: { id },
                    relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan', 'rutinas'],
                });
                if (!usuarioGuardado) {
                    throw new error_manager_1.ErrorManager("NOT_FOUND", "No se encontro usuario");
                }
                if (body && Object.keys(body).length > 0) {
                    if (body.email) {
                        const unUsuario = await transaccion.findOne(usuario_entity_1.UsuarioEntity, { where: { email: body.email } });
                        if (unUsuario) {
                            throw new error_manager_1.ErrorManager("CONFLICT", `${body.email} ya existe en la base de datos`);
                        }
                        usuarioGuardado.email = body.email;
                    }
                    if (body.idPlan) {
                        const unPlan = await transaccion.findOneBy(plan_entity_1.PlanEntity, { idPlan: body.idPlan });
                        if (!unPlan) {
                            throw new error_manager_1.ErrorManager("BAD_REQUEST", `El plan ${body.idPlan} no existe`);
                        }
                        if (usuarioGuardado.datosPersonales) {
                            usuarioGuardado.datosPersonales.plan = unPlan;
                        }
                    }
                    if (body.estado) {
                        if (usuarioGuardado.datosPersonales) {
                            usuarioGuardado.datosPersonales.estado = body.estado;
                        }
                        if (usuarioGuardado.datosFisicos) {
                            usuarioGuardado.datosFisicos.estado = body.estado;
                        }
                        if (usuarioGuardado.estado === estado_enum_1.ESTADO.ARCHIVADO && body.estado !== estado_enum_1.ESTADO.ARCHIVADO) {
                            usuarioGuardado.fBaja = null;
                        }
                        if (body.estado === estado_enum_1.ESTADO.ARCHIVADO && usuarioGuardado.estado !== estado_enum_1.ESTADO.ARCHIVADO) {
                            throw new error_manager_1.ErrorManager("BAD_REQUEST", "El nuevo estado no puede ser ARCHIVADO. \n Para eliminar, ingresar por la opcion 'Eliminar'");
                        }
                        usuarioGuardado.estado = body.estado;
                    }
                    const usuarioUpdate = await transaccion.save(usuarioGuardado);
                    return {
                        id: usuarioUpdate.id,
                        email: usuarioUpdate.email,
                        estado: usuarioUpdate.estado,
                        idPlan: usuarioUpdate.datosPersonales?.plan?.idPlan
                    };
                }
                else {
                    throw new error_manager_1.ErrorManager("BAD_REQUEST", "No se reciben datos para modificar usuario");
                }
            });
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async deleteUsuario(id) {
        try {
            return await this.entityManager.transaction(async (transaccion) => {
                const usuarioGuardado = await transaccion.findOne(usuario_entity_1.UsuarioEntity, {
                    where: { id },
                    relations: ['datosPersonales', 'datosFisicos', 'rutinas']
                });
                if (!usuarioGuardado) {
                    throw new error_manager_1.ErrorManager("NOT_FOUND", `No se encontro usuario ${id}`);
                }
                usuarioGuardado.estado = estado_enum_1.ESTADO.ARCHIVADO;
                usuarioGuardado.fBaja = new Date();
                if (usuarioGuardado.rol === rol_1.ROL.USUARIO) {
                    if (!usuarioGuardado.datosPersonales) {
                        throw new error_manager_1.ErrorManager("NOT_FOUND", `El usuario ${id} no tiene datos personales`);
                    }
                    usuarioGuardado.datosPersonales.estado = estado_enum_1.ESTADO.ARCHIVADO;
                    if (!usuarioGuardado.datosFisicos) {
                        throw new error_manager_1.ErrorManager("NOT_FOUND", `El usuario ${id} no tiene datos fisicos`);
                    }
                    usuarioGuardado.datosFisicos.estado = estado_enum_1.ESTADO.ARCHIVADO;
                }
                if (usuarioGuardado.rutinas && usuarioGuardado.rutinas.length > 0) {
                    await transaccion.remove(rutina_entity_1.RutinaEntity, usuarioGuardado.rutinas);
                }
                await transaccion.save(usuarioGuardado);
                return true;
            });
        }
        catch (err) {
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource,
        email_service_1.EmailService,
        plan_service_1.PlanService,
        file_img_service_1.FileImgService])
], UsuarioService);
async function clonarRutinaParaUsuario(rutinaBasica, nuevoNombre, usuarioFinal, manager) {
    const nuevaRutina = manager.create(rutina_entity_1.RutinaEntity, {
        nombreRutina: nuevoNombre,
        estadoRutina: rutinaBasica.estadoRutina,
        fCreacionRutina: new Date(),
        fUltimoAccesoRutina: new Date(),
        fBajaRutina: null,
        usuario: usuarioFinal,
        semanas: []
    });
    if (rutinaBasica.semanas && rutinaBasica.semanas.length > 0) {
        nuevaRutina.semanas = rutinaBasica.semanas.map((semanaOriginal) => {
            const { idSemana, dias, rutina, ...propsSemana } = semanaOriginal;
            const nuevaSemana = manager.create(semana_entity_1.SemanaEntity, {
                ...propsSemana,
                dias: []
            });
            if (dias && dias.length > 0) {
                nuevaSemana.dias = dias.map((diaOriginal) => {
                    const { idDia, semana, ejerciciosRutina, ...propsDia } = diaOriginal;
                    const nuevoDia = manager.create(dia_entity_1.DiaEntity, {
                        ...propsDia,
                        ejerciciosRutina: []
                    });
                    if (ejerciciosRutina && ejerciciosRutina.length > 0) {
                        nuevoDia.ejerciciosRutina = ejerciciosRutina.map((ejercicioOriginal) => {
                            const { idEjercicioRutina, dia, ...propsEjercicio } = ejercicioOriginal;
                            const nuevoEjercicio = manager.create(ejercicio_rutina_entity_1.EjercicioRutinaEntity, {
                                ...propsEjercicio,
                                ejercicioHecho: false,
                            });
                            return nuevoEjercicio;
                        });
                    }
                    return nuevoDia;
                });
            }
            return nuevaSemana;
        });
    }
    console.log("Estructura clonada lista para guardar (sin IDs viejos):", nuevaRutina);
    const rutinaGuardada = await manager.save(rutina_entity_1.RutinaEntity, nuevaRutina);
    return rutinaGuardada;
}
//# sourceMappingURL=usuario.service.js.map