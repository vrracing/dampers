import HorizontalNonLinearStepper from "./Stepper";

import logo from "./logo.svg";
import "./App.css";

function App() {
  console.error("RESTARTING APP");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HorizontalNonLinearStepper />
      </header>
    </div>
  );
}

export default App;
