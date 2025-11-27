import { CreateSemanaDto } from './dto/create-semana.dto';
import { UpdateSemanaDto } from './dto/update-semana.dto';
export declare class SemanaService {
    create(createSemanaDto: CreateSemanaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSemanaDto: UpdateSemanaDto): string;
    remove(id: number): string;
}
