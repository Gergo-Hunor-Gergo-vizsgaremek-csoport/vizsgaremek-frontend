
import {Route, Routes} from "react-router";
import {DevPage} from "./pages/DevPage.tsx";
import {TypeSearchPage} from "./pages/TypeSearchPage.tsx";
import {AdminProductPage} from "./pages/AdminProductPage.tsx";
import {AdminProductEditPage} from "./pages/AdminProductEditPage.tsx";
import {UserAdminPage} from "./pages/UserAdminPage.tsx";
import {LogPage} from "./pages/LogPage.tsx";
import {TypePage} from "./pages/TypePage.tsx";
import {PeldanyPage} from "./pages/PeldanyPage.tsx";
import {SinglePeldanyPage} from "./pages/SinglePeldanyPage.tsx";
import {UserPage} from "./pages/UserPage.tsx";
import {RendelesPage} from "./pages/RendelesPage.tsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<TypeSearchPage/>} />
          <Route path="/type/:typeId" element={<TypePage/>} />
          <Route path="/peldany/by-type/:peldanyTypeId" element={<PeldanyPage/>} />
          <Route path="/single/:peldanyId" element={<SinglePeldanyPage/>} />
          <Route path="/dev" element={<DevPage/>}/>
          <Route path="/useradmin" element={<UserAdminPage/>}/>
          <Route path="/user/:userId" element={<UserPage/>}/>
          <Route path="/rendeles/:rendelesId" element={<RendelesPage/>}/>
          <Route path="/log" element={<LogPage/>}/>
          <Route path="/product" element={<AdminProductPage/>}/>
          <Route path="/product/:productId" element={<AdminProductEditPage />} />
      </Routes>
  )
}

export default App
