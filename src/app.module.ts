import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'db-server',
  port: 3306,
  username: 'develop',
  password: 'password',
  database: 'develop',
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
});

@Module({
  imports: [CatsModule, typeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
