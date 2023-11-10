import { IsString, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ type: String, format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  authorId: AuthorId;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty()
  genres: string[];
}

export class UpdateBookDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsDate()
  writtenOn: Date;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsString()
  authorId: AuthorId;

  @ApiProperty({ type: [String] })
  @IsArray()
  genres: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  userBook: string[];
}
