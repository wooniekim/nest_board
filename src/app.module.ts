import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeORMConfig } from './configs/typeorm.config';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        retryAttempts: 10, // 연결에 실패했을 경우, 연결 재시도 횟수를 의미합니다.
        type: 'mysql', // 어떤 DB를 사용할 것인지
        host: '127.0.0.1', // 우리는 본인 컴퓨터에 깔린 mysql을 사용할 예정이니, localhost로 해줍니다.
        port: 3306, // MySQL의 기본 포트는 3306 입니다.
        database: 'nest_board',
        username: 'root', // MySQL 설치시 설정한 유저네임을 입력하면 됩니다,
        password: 'Ekdns3295@', // MySQL 설치시 설정한 비밀번호를 입력하면 뒵니다.,
        entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
        synchronize: false, // 무조건 false로 해두세요.
        logging: true, // typeorm 쿼리 실행시, MySQL의 쿼리문을 터미널에 보여줍니다.
        timezone: 'local',
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
