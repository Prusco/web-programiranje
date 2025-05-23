import React from 'react';
import { Link } from 'react-router-dom';

const tours = [
  { id: 1, title: "Pariz - Romantična Tura" },
  { id: 2, title: "Rim - Povijesna Avantura" },
  { id: 3, title: "Tokio - Moderni Grad" },
];

function Tours() {
  return (
    <div>
      <h2>Dostupne Ture</h2>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tours;
