import * as path from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql', // 어떤 DB를 사용할 것인지
  host: '127.0.0.1', // 우리는 본인 컴퓨터에 깔린 mysql을 사용할 예정이니, localhost로 해줍니다.
  port: 3306, // MySQL의 기본 포트는 3306 입니다.
  database: 'nest_board',
  username: 'root', // MySQL 설치시 설정한 유저네임을 입력하면 됩니다,
  password: 'Ekdns3295@', // MySQL 설치시 설정한 비밀번호를 입력하면 뒵니다.,
  entities: [
    // entity는 DB의 테이블을 지칭합니다. 따라서 어떤 테이블이 사용되는지. 테이블에 대한 정보를 가져오는 것.
    path.join(__dirname, 'src/entities/**/*.entity.ts'),
    path.join(__dirname, 'dist/entities/**/*.entity.js'),
  ],
  synchronize: false, // 이건 무조건 false로 해둡시다.
  logging: true, // typeorm 쿼리가 실행될 때, 터미널에 MySQL쿼리가 어떻게 짜여졌는지 보여줍니다.
});
