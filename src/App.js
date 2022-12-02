
import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartContextProvider } from "./components/CartContext";
import CartView from "./components/CartView";
import CheckoutOrder from "./components/CheckoutOrder";





function App() {
  
  return (
    
    <div className="App">
      {/* 5. Importamos y renderizamos el Provider */}
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryid"
              element={<ItemListContainer />}
            />
            <Route path="/detalle/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartView />} />
            <Route
              path="/checkout/:orderid"
              element={<CheckoutOrder/>}
            />

            <Route path="*" element={<h1>404: Ruta no encontrada</h1>} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
     
    </div>
  );
}

export default App;





/*

import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryid" element={<ItemListContainer />} />
          <Route path="/detalle/:id" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
*/