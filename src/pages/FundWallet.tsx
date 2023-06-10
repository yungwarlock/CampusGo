import React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";

enum Stage {
  collectInfo,
  confirmation,
  Success,
  Failure,
}

const FundWallet = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = React.useState<Stage>(Stage.collectInfo);

  const goBack = () => navigate(-1);

  const formik = useFormik({

    initialValues: {
      amount: "",
      customerId: "",
      verifcationToken: "",
    },

    onSubmit: (value) => {
      console.log(value);
      setCurrentStage(Stage.confirmation);
    }

  });

  const onClickOption = (option: "yes" | "no") => {
    switch (option) {
      case "yes":
        console.log("Continue paying");
        setCurrentStage(Stage.Success);
        break;
      case "no":
        console.log("Cancel payment");
        setCurrentStage(Stage.collectInfo);
        break;
    }
  };

  const AreYouSure = (
    <Grid container gap="1rem" alignItems="center" pt="4rem" flexDirection="column">
      <Typography sx={{fontSize: "21px"}}>Are you sure you want to continue?</Typography>
      <Grid container justifyContent="space-between" px="5rem" width="100%">
        <Button onClick={() => onClickOption("yes")} sx={{fontSize: "18px"}}>Yes</Button>
        <Button onClick={() => onClickOption("no")} sx={{fontSize: "18px"}}>No</Button>
      </Grid>
    </Grid>
  );

  const Failure = (
    <Grid container gap="1rem" alignItems="center" pt="4rem" flexDirection="column">
      <Typography>Failure</Typography>
    </Grid>
  );
  const Success = (
    <Grid container gap="1rem" alignItems="center" pt="4rem" flexDirection="column">
      <Typography>Success</Typography>
    </Grid>
  );

  const Main = (
    <Grid container component="form" onSubmit={formik.handleSubmit} gap="1rem" alignItems="end" flexDirection="column">
      <TextField id="customerId" fullWidth label="Customer ID" value={formik.values.customerId} onChange={formik.handleChange} variant="outlined" />
      <TextField id="amount" fullWidth label="Amount" value={formik.values.amount} onChange={formik.handleChange} variant="outlined" />
      <TextField id="verifcationToken" fullWidth label="Verification Token" value={formik.values.verifcationToken} onChange={formik.handleChange} variant="outlined" />
      <Grid py="1rem">
        <Button type="submit" variant="contained">Continue</Button>
      </Grid>
    </Grid>
  );

  const Stages = {
    [Stage.Success]: Success,
    [Stage.Failure]: Failure,
    [Stage.collectInfo]: Main,
    [Stage.confirmation]: AreYouSure,
  };

  return (
    <Grid>
      <Grid container px="1rem" py="1rem" justifyContent="space-between">
        <IconButton sx={{p: 0}} onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>

      <Grid container gap="1.5rem" px="1rem" pt="2rem">
        <Typography variant="h5">Fund my Wallet</Typography>

        {Stages[currentStage]}
      </Grid>
    </Grid>
  );
};


export default FundWallet;
