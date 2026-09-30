
import {Route, Routes} from "react-router";
import {DevPage} from "./pages/DevPage.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {AdminProductPage} from "./pages/AdminProductPage.tsx";
import {AdminProductEditPage} from "./pages/AdminProductEditPage.tsx";
import {UserPage} from "./pages/UserPage.tsx";
import {LogPage} from "./pages/LogPage.tsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/dev" element={<DevPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/log" element={<LogPage/>}/>
          <Route path="/product" element={<AdminProductPage/>}/>
          <Route path="/product/:productId" element={<AdminProductEditPage />} />
      </Routes>
  )
}

export default App
