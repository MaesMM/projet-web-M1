import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { AuthorId } from 'library-api/src/entities';

export class CreateBookDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsDate()
  @IsNotEmpty()
  writtenOn: Date;

  @ApiProperty({ type: String })
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
