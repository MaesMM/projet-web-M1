import { GenreId } from 'library-api/src/entities';

export class GenreModel {
  id: GenreId;
  name: string;

  private constructor(id: GenreId, name: string) {
    this.id = id;
    this.name = name;
  }

  static push(targetArray: GenreModel[], item: GenreModel): GenreModel[] {
    return [...targetArray, item];
  }
}
