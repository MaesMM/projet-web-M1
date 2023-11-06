import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Authors")
@Controller('authors')
export class AuthorController {}
