import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/Home.css'; 
const Home = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours`);
        const data = await response.json();

        if (data.success) {
          setTours(data.data); 
          console.log(data.data);
        } else {
          console.error('Failed to fetch tours:', data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <h2>Nase Ture</h2>
      <div className="tour-grid">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <div className="tour-card" key={tour._id}>
              <img src={tour.photo || '/img/sarajevo.jpg'} alt={tour.title || 'No name available'} className="tour-image" />
              <h3>{tour.title || 'No name available'}</h3>
              <p>{tour.desc ? tour.desc.substring(0, 100) + '...' : 'No description available'}</p>
              <Link to={`/tours/${tour._id}`} className="tour-link">
                Saznaj Vise
              </Link>
            </div>
          ))
        ) : (
          <p>No tours available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
