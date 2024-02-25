import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { MainRoute } from "./routes/mainRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="sm:mx-[10%]">
      <BrowserRouter>
        <MainRoute />

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
