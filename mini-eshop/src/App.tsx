import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListPage from "./pages/List";
import DetailPage from "./pages/Detail";
import CartPage from "./pages/Cart";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
