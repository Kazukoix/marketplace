import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages_components/Home_Ribbon";
import Shoes from "./pages_components/Shoes";
import Add from "./pages_components/Add";
import Ribbon from "./pages_components/Ribbon";
import Update from "./pages_components/Update";
import Register from "./pages_components/Sign-in";
import "./css/styles.css";
import ShowCase from "./pages_components/Front.ad";
import TopPicks from "./pages_components/Top-picks.comp";


function App() {
  return (
    <>
    <Ribbon/>
    <NavBar/>
    <ShowCase/>
    <TopPicks/>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Shoes/>}> </Route>
          <Route path = "/add" element = {<Add/>}> </Route>
          <Route path = "/update/:id" element = {<Update/>}> </Route>
          <Route path = "/register" element = {<Register/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>

  );
}

export default App;
