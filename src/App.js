import "./App.css";
import Main from "./Main";

function App() {
  return (
    <div className="App" style={{ marginTop: "50px" }}>
      <Main
        apiKey="4d30ef42c28719de1762c456181ee3cc6f25e704af2d04fd6dc25cdddf66510c"
        playerId="123456789"
      />
    </div>
  );
}

export default App;
