import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { AuthorId } from 'library-api/src/entities';
import { Auth } from 'typeorm';

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  name: string;



  @ApiProperty({ type: Date })
  @IsDate()
  @IsNotEmpty()
  writtenOn: Date;


  @ApiProperty({ type: String, format: 'uuid'})
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
  name: string;

  @IsDate()
  writtenOn: Date;

  @IsString()
  authorId: AuthorId;

  @ApiProperty({ type: [String] })
  @IsArray()
  genres: string[];


  @ApiProperty({ type: [String] })
  @IsArray()
  userBook: String[];

}