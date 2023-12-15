import { IsBoolean } from 'class-validator';

export class RecommandDto {
  @IsBoolean()
  type: boolean;
}
