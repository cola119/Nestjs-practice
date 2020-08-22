import {
  Controller,
  Get,
  Param,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { AuthGuard } from 'src/auth.guard';
import { Cat } from './entity/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  fildAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    console.log(id);
    return 'TODO';
  }

  @Post('add')
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    const name = createCatDto.name;
    if (await this.catsService.findByName(name)) {
      throw new ConflictException(`${name} is already exist.`);
    }
    try {
      await this.catsService.create(createCatDto);
    } catch (e) {
      throw new InternalServerErrorException(e, 'Internal server error');
    }
    return;
  }
}

// curl -X POST -H "Content-Type: application/json" -d '{"name":"hello3", "age":"1", "aa": "aa"}' localhost:3000/cats/add
