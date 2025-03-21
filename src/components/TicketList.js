import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const TicketList = () => {
  const baseUrl = 'http://localhost:8000/';
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchTickets = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search') || '';
        const response = await axios.get(
          `${baseUrl}tickets?page=${page}&search=${searchTerm}`
        );
        setTickets(response.data);
        setCurrentPage(page);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, location.search]
  );

  useEffect(() => {
    fetchTickets(1);
  }, [fetchTickets]);

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Confirm ticket deletion?')) return;

    try {
      await axios.delete(`${baseUrl}tickets/${ticketId}`);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
      alert('Ticket deleted successfully!');
      fetchTickets(currentPage);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchTickets(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const pageButtons = [];

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={currentPage === i ? 'primary' : 'secondary'}
          onClick={() => handlePageChange(i)}
          disabled={loading}
        >
          {i}
        </Button>
      );
    }
    return pageButtons;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tickets.length);
  const displayedTickets = tickets.slice(startIndex, endIndex);

  if (loading) {
    return <div className="text-center">Loading Tickets...</div>;
  }

  if (error) {
    return <div className="text-danger text-center">Error: {error}</div>;
  }

  return (
    <div className="container mt-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {displayedTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>
                <Link to={`update/${ticket.id}`} className="btn btn-info btn-sm m-2">
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(ticket.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-2">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default TicketList;