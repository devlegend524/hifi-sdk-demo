import "./App.css";
import Main from "./Main";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ marginTop: "30px" }}>
      <div>
        <Link to="/readme">
          <span className="text-[20px] text-[white] ml-[300px] border border-[white] rounded px-[10px] py-[7px] transition hover:delay-150 hover:scale-150  hover:cursor-pointer hover:bg-[#d529f5]">
            Read Me
          </span>
        </Link>
      </div>
      <Main
        apiKey="4d30ef42c28719de1762c456181ee3cc6f25e704af2d04fd6dc25cdddf66510c"
        playerId="123456789"
      />
    </div>
  );
}

export default App;
