import { createRoot } from "react-dom/client";
import Form from "./Form";
import './tailwind.css';
createRoot(document.getElementById("root"))
    .render(
        <div>
            <Form/>
        </div>
)
export default App;