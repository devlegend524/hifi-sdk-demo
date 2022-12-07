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
        apiKey="5f1d15201ccbb89806ad05e69ffe55d6119677e05c9031564198145eda72d837"
        playerId="123456789"
      />
    </div>
  );
}

export default App;
