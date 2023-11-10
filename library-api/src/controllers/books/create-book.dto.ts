import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { AuthorId } from 'library-api/src/entities';

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  writtenOn: Date;

  @IsString()
  @IsNotEmpty()
  authorId: AuthorId;

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