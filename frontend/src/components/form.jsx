import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const ReferEarn = () => {
  const [open, setOpen] = useState(false); // Controls modal visibility
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
    courseName: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.referrerName.trim()) tempErrors.referrerName = "Referrer Name is required";
    if (!formData.referrerEmail || !/\S+@\S+\.\S+/.test(formData.referrerEmail))
      tempErrors.referrerEmail = "Valid Email is required";
    if (!formData.refereeName.trim()) tempErrors.refereeName = "Referee Name is required";
    if (!formData.refereeEmail || !/\S+@\S+\.\S+/.test(formData.refereeEmail))
      tempErrors.refereeEmail = "Valid Email is required";
    if (!formData.courseName.trim()) tempErrors.courseName = "Course Name is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/referrals", formData);
      setSubmitted(true);
      setSnackbarMessage("Referral submitted successfully!");
      setSnackbarOpen(true);
      setOpen(false); // Close modal after successful submission
      setFormData({
        referrerName: "",
        referrerEmail: "",
        refereeName: "",
        refereeEmail: "",
        courseName: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting referral:", error);
      setSnackbarMessage("Failed to submit. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Refer & Earn Button */}
      {!open && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        >
          Refer & Earn
        </Button>
      )}

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Refer a Friend</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Referrer Name"
              name="referrerName"
              fullWidth
              margin="normal"
              value={formData.referrerName}
              onChange={handleChange}
              error={!!errors.referrerName}
              helperText={errors.referrerName}
            />
            <TextField
              label="Referrer Email"
              name="referrerEmail"
              type="email"
              fullWidth
              margin="normal"
              value={formData.referrerEmail}
              onChange={handleChange}
              error={!!errors.referrerEmail}
              helperText={errors.referrerEmail}
            />
            <TextField
              label="Referee Name"
              name="refereeName"
              fullWidth
              margin="normal"
              value={formData.refereeName}
              onChange={handleChange}
              error={!!errors.refereeName}
              helperText={errors.refereeName}
            />
            <TextField
              label="Referee Email"
              name="refereeEmail"
              type="email"
              fullWidth
              margin="normal"
              value={formData.refereeEmail}
              onChange={handleChange}
              error={!!errors.refereeEmail}
              helperText={errors.refereeEmail}
            />
            <TextField
              label="Course Name"
              name="courseName"
              fullWidth
              margin="normal"
              value={formData.courseName}
              onChange={handleChange}
              error={!!errors.courseName}
              helperText={errors.courseName}
            />
            <TextField
              label="Message (Optional)"
              name="message"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={formData.message}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Referral"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={submitted ? "success" : "error"} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReferEarn;
