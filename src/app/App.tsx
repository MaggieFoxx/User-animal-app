import { Navbar } from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import Animals from "./Animals";
import HomePage from "./HomePage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/animals" element={<Animals />} />
      </Routes>
    </>
  );
};

export default App;
