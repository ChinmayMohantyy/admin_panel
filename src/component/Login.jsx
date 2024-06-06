"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    password: ""

  });
  const [bottonDisabled, setBottonDisabled] = React.useState(false);
  const login = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/signin", user);
      toast.success("Login Sucess");
      router.push("/dashboard");
    } catch (error) {
      console.log(error, "error signup failed...");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (user.username && user.password) {
      setBottonDisabled(false);
    } else {
      setBottonDisabled(true);
    }

  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {bottonDisabled ?
              (<Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled
              >
                Sign In
              </Button>) : (<Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Sign In
              </Button>)
            }

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}