
import {Route, Routes} from "react-router";
import {DevPage} from "./pages/DevPage.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {AdminProductPage} from "./pages/AdminProductPage.tsx";
import {AdminProductEditPage} from "./pages/AdminProductEditPage.tsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/dev" element={<DevPage/>}/>
          <Route path="/product" element={<AdminProductPage/>}/>
          <Route path="/product/:productId" element={<AdminProductEditPage />} />
      </Routes>
  )
}

export default App
