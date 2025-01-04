import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import NavBar from "./pages_components/NavBar";
import Ribbon from "./pages_components/Ribbon";
import Shoes from "./pages/Shoes";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Mens from "./pages/Mens";
import ShoePage from "./pages/ShoePage";
import StickyLayout from "./pages_components/StickyLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/AccountPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Ribbon />
        <NavBar />
        <Routes>
          <Route path="/" element={<StickyLayout><Shoes /></StickyLayout>} />
          <Route path="/add" element={<StickyLayout><Add /></StickyLayout>} />
          <Route path="/update/:id" element={<StickyLayout><Update /></StickyLayout>} />
          <Route path="/register" element={<StickyLayout><Register /></StickyLayout>} />
          <Route path="/login" element={<StickyLayout><Login /></StickyLayout>} />
          <Route path="/account" element={<StickyLayout><Account /></StickyLayout>} />
          <Route path="/mens" element={<StickyLayout><Mens /></StickyLayout>} />
          <Route path="/shoe/mens/:id" element={<StickyLayout><ShoePage /></StickyLayout>} />
          <Route path="/account/create" element={<StickyLayout><Register /></StickyLayout>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
