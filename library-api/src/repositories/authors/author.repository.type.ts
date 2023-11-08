import { PlainAuthorModel } from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type AuthorRepositoryOutput = PlainAuthorModel;
export interface CreateAuthorRepositoryInput {
    name: string; // ou d'autres propriétés requises pour créer un auteur
  }