import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Genres")
@Controller('genres')
export class GenreController {}
