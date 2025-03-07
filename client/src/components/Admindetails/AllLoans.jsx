import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Unauthorized: Please log in.');
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:5000/api/users/loans', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then(response => {
        setLoans(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching loans:', error);
        setError('Failed to fetch loans. Please log in again.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All Loans</h2>
      {loading ? (
        <p>Loading loans...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
  {loans.map((loan) => (
    <tr key={loan._id}>
      <td>{loan.farm?.farmer?.firstName} {loan.farm?.farmer?.lastName}</td> {/* ✅ Display farmer name */}
      <td>{loan.amount}</td>
      <td>{loan.status}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default AllLoans;
