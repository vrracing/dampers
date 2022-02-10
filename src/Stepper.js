import * as React from "react";
import { useReducer } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { stepperReducer } from "./Reducer";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function HorizontalNonLinearStepper() {
  console.info("RENDERING STEPPER");

  // Setup Reducer and Initial State
  const [state, dispatch] = useReducer(stepperReducer, {
    field1: "",
    field2: "",
    field3: "",
  });
  const { field1, field2, field3 } = state;

  // Initialize Data
  React.useEffect(() => {
    dispatch({ type: "initialize" });
  }, []);

  // Persist to Database When Step is Changed
  React.useEffect(() => {
    return function persistStageToDB() {
      console.log("STEPPER UNMOUNTING - SAVE! SAVE! SAVE!");
      dispatch({ type: "persist" });
    };
  }, []);

  // MUI Demo Stepper State & Handlers
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  // Persist to Database When Step is Changed
  React.useEffect(() => {
    console.log("STEP CHANGED - SAVE! SAVE! SAVE!");
    dispatch({ type: "persist" });
  }, [activeStep]);

  function totalSteps() {
    return steps.length;
  }
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    dispatch({ type: "persist" });
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // Create Input Fields
  const inputField = (num) => {
    switch (num) {
      case 0:
        return (
          <TextField
            id="field1"
            label="Filled"
            variant="filled"
            value={field1}
            onChange={(e) =>
              dispatch({ type: "updateField1", payload: e.target.value })
            }
          />
        );
      case 1:
        return (
          <TextField
            id="field2"
            label="Filled"
            variant="filled"
            value={field2}
            onChange={(e) =>
              dispatch({ type: "updateField2", payload: e.target.value })
            }
          />
        );
      case 2:
        return (
          <TextField
            id="field3"
            label="Filled"
            variant="filled"
            value={field3}
            onChange={(e) =>
              dispatch({ type: "updateField3", payload: e.target.value })
            }
          />
        );
      default:
        return <Typography>OH NO!</Typography>;
    }
  };

  // JSX
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {inputField(activeStep)}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
