import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ onContactAdded }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/contacts', contact);
      
      onContactAdded(response.data);
      setContact({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
    } catch (error) {
      console.error("There was an error adding the contact!", error);
    }
   window.location.reload();
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="First Name" name="firstName" value={contact.firstName} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Last Name" name="lastName" value={contact.lastName} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" value={contact.email} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone Number" name="phone" value={contact.phone} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Company" name="company" value={contact.company} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Job Title" name="jobTitle" value={contact.jobTitle} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Add Contact</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;