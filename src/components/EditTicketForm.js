import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const EditTicketForm = () => {
  const baseUrl = "http://localhost:8000/tickets";
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${ticketId}`);
        setTicket(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/${ticketId}`, ticket);
      if (response.status === 200) {
        alert("Ticket has been updated successfully!");
        navigate('/');
      } else {
        setError(`Failed to update ticket. Status: ${response.status}`);
        alert(`Failed to update ticket. Status: ${response.status}`);
      }
    } catch (err) {
      setError(err.message);
      alert("An error occurred during update. Please check the console.");
      console.error("Error updating ticket:", err);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center">Error: {error}</div>;
  }

  return (
    <div className="col-md-8 offset-sm-2 mt-2">
      <div className="card">
        <div className="card-header">
          <h4>Edit Ticket</h4>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ticket Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                placeholder="Enter Ticket Title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ticket Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={ticket.description}
                onChange={handleChange}
                placeholder="Enter Ticket Description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={ticket.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={ticket.status}
                onChange={handleChange}
                required
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit" className="me-2">
              Update Ticket
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditTicketForm;