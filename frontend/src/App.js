import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages_components/NavBar";
import Ribbon from "./pages_components/Ribbon";
import Shoes from "./pages/Shoes";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Mens from "./pages/Mens";
import ShoePage from "./pages/ShoePage";
import StickyLayout from "./pages_components/StickyLayout"; // Import the layout component
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Ribbon />
      <NavBar />
      <BrowserRouter>
        <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <StickyLayout>
                <Shoes />
              </StickyLayout>
            }
          />

          {/* Add New Shoe */}
          <Route
            path="/add"
            element={
              <StickyLayout>
                <Add />
              </StickyLayout>
            }
          />

          {/* Update Shoe */}
          <Route
            path="/update/:id"
            element={
              <StickyLayout>
                <Update />
              </StickyLayout>
            }
          />

          {/* User Registration */}
          <Route
            path="/register"
            element={
              <StickyLayout>
                <Register />
              </StickyLayout>
            }
          />

          {/* Mens Shoes */}
          <Route
            path="/mens"
            element={
              <StickyLayout>
                <Mens />
              </StickyLayout>
            }
          />

          {/* Individual Shoe Page */}
          <Route
            path="/shoe/mens/:id"
            element={
              <StickyLayout>
                <ShoePage />
              </StickyLayout>
            }
          />

          <Route
            path="/account/create"
            element={
              <StickyLayout>
                <Register />
              </StickyLayout>
            }
          />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
