import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookId, UserId } from 'library-api/src/entities';


export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  lastName: string;
 
}

export class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  firstName: string;
  
  @ApiProperty({ type: String })
  @IsString()
  lastName: string;
 
  @ApiProperty({ type: String, format: 'uuid'})
  @IsString()
  favoriteBook: BookId;

  @ApiProperty({ type: String, format: 'uuid'})
  @IsString()
  userBook: BookId[];
}