import { HttpException, HttpStatus } from '@nestjs/common';

export function exceptionErr(error: Error) {
  if (error.name === 'QueryFailedError') {
    throw new HttpException(
      '데이터베이스 처리 중 오류 발생',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  } else {
    throw new HttpException(
      '알 수 없는 서버 오류',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
