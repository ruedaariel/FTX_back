import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
export declare class AccessLevelGuard implements CanActivate {
    private readonly reflector;
    private readonly usuarioRepository;
    constructor(reflector: Reflector, usuarioRepository: Repository<UsuarioEntity>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
