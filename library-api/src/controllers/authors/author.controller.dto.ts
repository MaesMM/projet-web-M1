import { IsString, IsDate, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsDate()
  @IsNotEmpty()
  lastName: string;
}

export class CreateAuthorDto {
   @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsDate()
  @IsNotEmpty()
  lastName: string;

}