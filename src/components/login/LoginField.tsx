"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../authentication/AuthProvider";
import withAuth from "../authentication/withAuth";
import { AxiosWithOutAuthInstance } from "@/config/withoutAuth.axios";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/^(?=.*[A-Za-z])/, "Must contain at least one letter")
    .matches(/(?=.*\d)/, "Must contain at least one number"),
});

const LoginField = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const authInfo = useAuth();

  //   useLayoutEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token && authInfo.isAuthed) {
  //       router.push("/dashboard");
  //     }
  //   }, [authInfo.isAuthed]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    AxiosWithOutAuthInstance.post("/login", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.data.token) {
          console.log("response", response);
          localStorage.setItem("token", response.data.token);
          authInfo.setAuthInfo({
            isAuthed: true,
            token: response.data.token,
          });
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.data.error === "Unauthorized") {
          localStorage.setItem("token", "");
          authInfo.setAuthInfo({
            isAuthed: false,
            token: "",
          });
          setErrorMsg(error.response.data.error);
          handleOpen();
        }
      });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      //   noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <FormControl>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          {errors.email && (
            <small style={{ color: "#bc0202" }}>{errors.email.message}</small>
          )}
        </Stack>
        <TextField
          type="email"
          {...register("email")}
          //   name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          //   required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        />
      </FormControl>
      <FormControl>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          {errors.password && (
            <small style={{ color: "#bc0202" }}>
              {errors.password.message}
            </small>
          )}
        </Stack>

        <TextField
          placeholder="••••••"
          type="password"
          {...register("password")}
          id="password"
          autoComplete="current-password"
          //   required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" onClick={() => {}}>
        Sign in
      </Button>
      <Link
        component="button"
        type="button"
        onClick={() => {}}
        variant="body2"
        sx={{ alignSelf: "center" }}
      >
        Forgot your password?
      </Link>
    </Box>
  );
};

export default withAuth(LoginField);
