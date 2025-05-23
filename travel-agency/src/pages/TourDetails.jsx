import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext'; 
import '../styles/TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); 
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours/${id}`);
        const data = await response.json();
        setTour(data.data);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    };

    fetchTourDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      username: user.username, 
      reviewText,
      rating,
    };

    if (!user) {
      alert('Morate biti prijavljeni da biste ostavili komentar.');
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();

      if (data.success) {
        
        setTour((prev) => ({
          ...prev,
          reviews: [...prev.reviews, data.data],
        }));
        setReviewText('');
        setRating(5); 
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tour-details-container">
      <h2>{tour.title}</h2>
      <img 
        src={tour.photo || '/img/sarajevo.jpg'}
        alt={tour.title || 'No name available'}
        className="tour-image"
      />
      <p>{tour.desc}</p>
      <p><strong>Cijena:</strong> {tour.price} KM</p>
      <p><strong>Velicina grupe:</strong> {tour.maxGroupSize}</p>
      <p><strong>Grad:</strong> {tour.city}</p>

      <hr />
      <h3>Komentari</h3>
      {tour.reviews && tour.reviews.length > 0 ? (
        tour.reviews.map((review) => (
          <div key={review._id} className="review-card">
            <strong>{review.username || 'Gost'}</strong> – Ocjena: {review.rating}/5
            <p>{review.reviewText}</p>
          </div>
        ))
      ) : (
        <p>Još nema komentara.</p>
      )}

      <hr />
      <h3>Dodaj komentar</h3>
      {user ? (
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            placeholder="Tvoje ime"
            value={user.username}
            disabled
          />
          <textarea
            placeholder="Tvoj komentar..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num} ★</option>
            ))}
          </select>
          <button type="submit">Pošaljite komentar</button>
        </form>
      ) : (
        <p>Morate biti prijavljeni da biste ostavili komentar.</p>
      )}
    </div>
  );
};

export default TourDetails;
