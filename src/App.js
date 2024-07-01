import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import {store, persistor} from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import systemRoutes from "./routers";

function App() {
  return (
    <Provider store={store}>
		<PersistGate persistor={persistor}>
    <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
    <Navbar/>
    <Routes>
            {
							systemRoutes.map((route, index)=>
								<Route key={index} path={route.path} element={<route.element/>}/>
							)
						}
    </Routes>
    <Footer/>
    </div>
    </BrowserRouter>
    </PersistGate>
		</Provider>
  );
}

export default App;
