import { ApiProperty } from '@nestjs/swagger';
import { GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';

export class GenrePresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: GenreId;

  @ApiProperty({ type: String })
  name: string;

  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}
