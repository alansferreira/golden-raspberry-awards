import { MovieEntity } from './movies.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
export declare class MoviesService {
    private entityRepository;
    constructor(entityRepository: Repository<MovieEntity>);
    findAll(): Promise<MovieEntity[]>;
    create(entity: MovieEntity): Promise<MovieEntity>;
    update(entity: MovieEntity): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
}
