import { createRoot, CreateRoot } from "react-dom/client";
import "./login.css";
import Containerl from "./Containerl";
import Login from "./Login";

createRoot(document.getElementById("root")).render(
  <div>
      <Containerl>
            <Login />
          </Containerl>
  </div>
);