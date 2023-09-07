import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    contactNumber: '',
    about: '',
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.match(/^[A-Za-z]+$/)) {
      newErrors.name = 'Name should contain alphabets only';
      valid = false;
    }

    if (formData.contactNumber.length !== 10 || !/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact should be 10 digits';
      valid = false;
    }

    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
      valid = false;
    }

    const today = new Date();
    const dob = new Date(formData.dob);
    if (dob > today) {
      newErrors.dob = 'Date of birth cannot be greater than today';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  return (
    <Container maxWidth="sm">
      <Card elevation={3} sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Information Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
            <Typography variant="subtitle1" gutterBottom style={{ textAlign: 'left' }}>
            <b>Name:</b>
              </Typography>
              <TextField
                label=""
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
              />
            </div>
            <div>
               <Typography variant="subtitle1" gutterBottom style={{ textAlign: 'left' }}>
               <b>Date of birth:</b>
              </Typography>
              <TextField
                label=""
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
                fullWidth
                required
              />
            </div>
            <div>
            <Typography variant="subtitle1" gutterBottom style={{ textAlign: 'left' }}>
            <b>Email:</b>
              </Typography>
              <TextField
                label=""
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
              />
            </div>
            <div>
            <Typography variant="subtitle1" gutterBottom style={{ textAlign: 'left' }}>
            <b>Contact Number:</b>
              </Typography>
              <TextField
                label=""
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                fullWidth
                required
              />
            </div>
            <div>
            <Typography variant="subtitle1" gutterBottom style={{ textAlign: 'left' }}>
                <b>Tell me about yourself:</b>
              </Typography>
              <TextField
                label=""
                name="about"
                multiline
                rows={4}
                value={formData.about}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      {submittedData && (
        <Card elevation={3} sx={{ marginTop: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Submitted User Information
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {submittedData.name}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {submittedData.dob}
            </Typography>
            <Typography variant="body1">
              <strong>Email Id:</strong> {submittedData.email}
            </Typography>
            <Typography variant="body1">
              <strong>Contact Number:</strong> {submittedData.contactNumber}
            </Typography>
            <Typography variant="body1">
              <strong>About:</strong> {submittedData.about}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default UserForm;
