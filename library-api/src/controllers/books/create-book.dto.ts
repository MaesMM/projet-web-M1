import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  writtenOn: Date;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty()
  genres: string[];

}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  @IsString()
  authorId: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  genres: string[];

}