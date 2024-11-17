import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import axios from 'axios';

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {

    try {
      await axios.delete(`http://localhost:8000/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(contacts) && contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>

                <Button onClick={() => handleDelete(contact._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );
};

export default ContactsTable;
