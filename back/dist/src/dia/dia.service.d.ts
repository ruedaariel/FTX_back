import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
export declare class DiaService {
    create(createDiaDto: CreateDiaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDiaDto: UpdateDiaDto): string;
    remove(id: number): string;
}
