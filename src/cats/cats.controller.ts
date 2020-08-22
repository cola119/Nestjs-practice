import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { AuthGuard } from 'src/auth.guard';

@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  fildAll(): Cat[] {
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
    return 'hod';
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    return this.catsService.create(createCatDto);
  }
}
