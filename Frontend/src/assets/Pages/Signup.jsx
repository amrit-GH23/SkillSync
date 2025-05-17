import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Fade,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
     const response=await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        username,
        password,
      });
      console.log(response.data)
      localStorage.setItem("access",response.data.access)
      localStorage.setItem("refresh",response.data.refresh)
      navigate("/createProfile");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.username?.[0] ||
          error.response?.data?.email?.[0] ||
          "Signup failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(120deg, #e0e7ff 0%, #f0abfc 100%)",
        p: 2,
      }}
    >
      <Fade in>
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            borderRadius: 5,
            boxShadow: 10,
            p: { xs: 2, sm: 4 },
            overflow: "visible",
            position: "relative",
          }}
        >
          <CardContent>
            <Stack alignItems="center" spacing={2} mb={2}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 64,
                  height: 64,
                  boxShadow: 3,
                  mt: -7,
                  mb: 1,
                  fontSize: 40,
                }}
              >
                <PersonAddAlt1Icon fontSize="inherit" />
              </Avatar>
              <Typography
                variant="h5"
                fontWeight={700}
                color="primary"
                textAlign="center"
                letterSpacing={1}
              >
                SkillSync
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Create your account
              </Typography>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ mb: 2, fontWeight: 500 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSignup}>
              <Stack spacing={3}>
                <TextField
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  fullWidth
                  autoComplete="username"
                  InputProps={{
                    sx: { borderRadius: 3, fontSize: "1.05rem" },
                  }}
                />

                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  fullWidth
                  autoComplete="email"
                  InputProps={{
                    sx: { borderRadius: 3, fontSize: "1.05rem" },
                  }}
                />

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  fullWidth
                  autoComplete="new-password"
                  InputProps={{
                    sx: { borderRadius: 3, fontSize: "1.05rem" },
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  fullWidth
                  autoComplete="new-password"
                  InputProps={{
                    sx: { borderRadius: 3, fontSize: "1.05rem" },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    py: 1.5,
                    boxShadow: 4,
                    letterSpacing: 0.5,
                    textTransform: "none",
                  }}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </Stack>
            </form>

            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#6366f1", fontWeight: 500 }}>
                  Log in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Signup;
