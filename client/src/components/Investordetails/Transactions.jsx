import { useEffect, useState } from "react";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorDetails, setErrorDetails] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/transactions/my-transactions", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch transactions.");
                return res.json();
            })
            .then((data) => {
                setTransactions(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const fetchTransactionDetails = (id) => {
        setSelectedTransaction(null);
        setErrorDetails(null);

        const token = localStorage.getItem("token");

        fetch(`http://localhost:5000/api/transactions/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSelectedTransaction(data);
            })
            .catch((err) => {
                setErrorDetails(err.message);
            });
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };

    if (loading) return <p className="loading-text">Loading transactions...</p>;
    if (error) return <p className="error-text">Error: {error}</p>;

    return (
        <div className="transactions-container">
            <h2>My Transactions</h2>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Sent At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx._id}>
                            <td>{tx._id}</td>
                            <td>{tx.type}</td>
                            <td>RS-{tx.amount}</td>
                            <td className={tx.status === "Completed" ? "status-completed" : "status-pending"}>
                                {tx.status}
                            </td>
                            <td>{new Date(tx.createdAt).toLocaleString()}</td>
                            <td>
                                <button className="details-btn" onClick={() => fetchTransactionDetails(tx._id)}>
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedTransaction && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Transaction Details</h3>
                        <p><strong>Type:</strong> {selectedTransaction.type}</p>
                        <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                        <p><strong>Status:</strong> <span className={selectedTransaction.status === "Completed" ? "status-completed" : "status-pending"}>{selectedTransaction.status}</span></p>
                        <p><strong>Sent At:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>

                        <h3>Sender Details</h3>
                        <p><strong>Name:</strong> {selectedTransaction.from ? `${selectedTransaction.from.firstName} ${selectedTransaction.from.lastName}` : "N/A"}</p>
                        <p><strong>Email:</strong> {selectedTransaction.from?.email || "N/A"}</p>

                        <h3>Receiver Details</h3>
                        <p><strong>Name:</strong> {selectedTransaction.to ? `${selectedTransaction.to.firstName} ${selectedTransaction.to.lastName}` : "N/A"}</p>
                        <p><strong>Email:</strong> {selectedTransaction.to?.email || "N/A"}</p>

                        <button className="close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;
