import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shoes from "./pages/Shoes";
import Add from "./pages/AddingInsideShoes";
import Update from "./pages/UpdatingInsideShoes";

function App() {
  return (
    <div className="App">
      {/*BrowserRouter uses html5 history. It has functions like push, 
      replace, pubstate to keep our UI insych with the URL .*/}
      <BrowserRouter>
        {/*Inside here is where we will create routes */}

        <Routes>
          {/*The elements insides of each jsx route. */}
          <Route path = "/" element = {<Shoes/>}> </Route>
          <Route path = "/add" element = {<Add/>}> </Route>
          <Route path = "/update" element = {<Update/>}> </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
