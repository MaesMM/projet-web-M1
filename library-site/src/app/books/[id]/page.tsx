import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<{
    name: string;
    author: { name: string };
    genres: string[];
  } | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
        );
        setBookDetails(response.data);
      } catch (error) {
        console.error('Erreur de chargement des détails du livre', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const deleteBook = async (bookId: string | undefined) => {
    if (bookId) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`);
        // Gérer la réussite de la suppression, par exemple, rediriger l'utilisateur ou mettre à jour la liste des livres
      } catch (error) {
        console.error('Erreur lors de la suppression du livre', error);
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      }
    }
  };

  return (
    <>
      <h1>Book Details</h1>
      {bookDetails ? (
        <div>
          <p>ID du livre : {id}</p>
          <p>Titre du livre : {bookDetails.name}</p>
          <p>Auteur : {bookDetails.author.name}</p>
          <p>Genres : {bookDetails.genres.join(', ')}</p>
          <button onClick={() => deleteBook(id)}>Supprimer ce livre</button>
        </div>
      ) : (
        <p>Chargement des détails du livre...</p>
      )}
      <Link to="/books">Retour à la liste des livres</Link>
    </>
  );
};

export default BookDetailsPage;
