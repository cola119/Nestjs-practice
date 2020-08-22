import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entity/cat.entity';
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  findByName(name: string): Promise<Cat> {
    return this.catRepository.findOne({ where: { name } });
  }

  create(cat: Omit<Cat, 'id'>): Promise<InsertResult> {
    return this.catRepository.insert(cat);
  }
}
