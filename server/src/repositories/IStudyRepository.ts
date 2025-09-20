import { Study } from '../entities/Study'

export interface IStudyRepository {
    create(data: Study): Promise<Study>;
    findStudies(offset: number, limit: number): Promise<{ studies: Study[]; length: number }>;
    findById(id: string): Promise<Study | null>;
    updateById(id:string, data: Partial<Study>): Promise<Study>;
    deleteById(id: string): Promise<void>;
}