import { PlainAuthorModel } from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type AuthorRepositoryOutput = PlainAuthorModel;
export interface CreateAuthorRepositoryInput {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  books?: string[];
}
