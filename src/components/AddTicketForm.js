import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTicketForm() {
  const baseUrl = "http://localhost:8000/tickets";
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(baseUrl, ticket);
      if (response.status === 201) {
        alert("Ticket has been added successfully!");
        navigate('/');
      } else {
        console.error("Failed to add ticket:", response);
        alert("Failed to add ticket. Please check console for details.");
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
      alert("An error occurred while adding the ticket. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="col-md-8 offset-sm-2 mt-2">
      <div className="card">
        <div className="card-header">
          <h4>Add Ticket</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Ticket Title</label>
              <input
                type="text"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                placeholder="Enter Ticket Title"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Ticket Description</label>
              <textarea
                name="description"
                value={ticket.description}
                onChange={handleChange}
                placeholder="Enter Ticket Description"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Priority</label>
              <select
                name="priority"
                value={ticket.priority}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <select
                name="status"
                value={ticket.status}
                onChange={handleChange}
                className="form-control"
                required>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-success me-2">
                Add Ticket
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-danger me-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTicketForm;