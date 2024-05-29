import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CommentBoard from "./pages/CommentBoard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/comments" element={<CommentBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
