import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class undefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // controller 들어가기 전 부분의 코드는 이곳에 작성하면 됩니다.

    /* 
      controller 실행되고 난 후는 handle() 다음에 작성하면 됩니다.
      data는 controller에서 return해주는 데이터입니다.
      */

    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
