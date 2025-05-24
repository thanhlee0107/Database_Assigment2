import { Route, Routes } from "react-router-dom";
// import "./App.css";
import HomePage from "./pages/HomePage";
import ShowTimePage from "./pages/ShowTimePage";
import UpdateShowTimePage from "./pages/UpdateShowTimePage";
import FindMoviesPage from "./pages/ShowMovieList";
import FormShowTimePage from "./pages/form";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showTime" element={<ShowTimePage />} />
        <Route path="/updateShowTime" element={<UpdateShowTimePage />} />
        <Route path="/findMovies" element={<FindMoviesPage />} />
        <Route path="/formShowTime" element={<FormShowTimePage/>}/>
      </Routes>
    </>
  );
}

export default App;
