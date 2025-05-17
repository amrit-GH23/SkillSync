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
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/createProfile");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
            maxWidth: 380,
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
                <LockOutlinedIcon fontSize="inherit" />
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
                Login to your account
              </Typography>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ mb: 2, fontWeight: 500 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
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
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  fullWidth
                  autoComplete="current-password"
                  InputProps={{
                    sx: { borderRadius: 3, fontSize: "1.05rem" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPwd((show) => !show)}
                          edge="end"
                        >
                          {showPwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
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
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </Stack>
            </form>

            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don’t have an account?{" "}
                <Link to="/signup" style={{ color: "#6366f1", fontWeight: 500 }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Login;
