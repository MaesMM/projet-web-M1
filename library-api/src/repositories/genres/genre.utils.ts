import { GenreId } from 'library-api/src/entities';

export type PlainGenreModel = {
    id: GenreId;
    name: string;
};

export const adaptGenreEntityToGenreModel = (
    genre: PlainGenreModel,
): PlainGenreModel => ({
    ...genre,
});


export const stringToGenreId = (id: string): GenreId => {
    return id as GenreId;
  };
  
