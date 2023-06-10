import React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import QRCode from "react-qr-code";

enum Stage {
  collectInfo,
  generateToken,
}

const CreateAccount = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = React.useState<Stage>(Stage.collectInfo);

  const goBack = () => navigate(-1);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },

    onSubmit: (value) => {
      console.log(value);
      setCurrentStage(Stage.generateToken);
    }
  });

  const GenerateToken = (
    <Grid container gap="1.5rem" px="1rem" pt="1rem">
      <Typography variant="h5">Generate Token</Typography>

      <Grid container component="form" onSubmit={formik.handleSubmit} gap="1rem" alignItems="center" flexDirection="column">
        <QRCode value="Hello Worlddd" />

        <Grid container alignItems="center" flexDirection="column">
          <Typography variant="h6">Scan QR Code</Typography>
          <Typography variant="body1">Scan using Authy app or Google Authenticator</Typography>
        </Grid>

        <Grid>
          <Typography variant="h6" textAlign="center">ID Token</Typography>
          <Typography variant="body1" textAlign="center">129378</Typography>
        </Grid>

      </Grid>
    </Grid>
  );

  const CreateAccount = (
    <Grid container gap="1.5rem" px="1rem" pt="1rem">
      <Typography variant="h5">Create Account</Typography>

      <Grid container component="form" onSubmit={formik.handleSubmit} gap="1rem" alignItems="end" flexDirection="column">
        <TextField id="name" fullWidth label="Name" value={formik.values.name} onChange={formik.handleChange} variant="outlined" />
        <TextField id="phone" fullWidth label="Phone number" value={formik.values.phone} onChange={formik.handleChange} variant="outlined" />
        <Grid py="1rem">
          <Button type="submit" variant="contained">Continue</Button>
        </Grid>
      </Grid>

    </Grid>
  );

  const Stages = {
    [Stage.collectInfo]: CreateAccount,
    [Stage.generateToken]: GenerateToken,
  };

  return (
    <Grid>
      <Grid container px="1rem" py="1rem" justifyContent="space-between">
        <IconButton sx={{p: 0}} onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>

      {Stages[currentStage]}
    </Grid>
  );
};


export default CreateAccount;
