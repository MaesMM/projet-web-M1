import { GenreId } from 'library-api/src/entities';

export type GenreModel = {
  id: GenreId;
  name: string;
};

export type GenreListModel = GenreModel[];

export function createGenreModel(id: GenreId, name: string): GenreModel {
  return { id, name };
}

export function pushGenreModel(targetArray: GenreListModel, item: GenreModel): GenreListModel {
  return [...targetArray, item];
}
