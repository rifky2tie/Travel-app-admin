import { useState } from "react";
import React from "react";
import "./assets/Tailwind.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";

// Lazy load pages
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Destinasi = React.lazy(() => import("./pages/Destinasi"));
const Testi = React.lazy(() => import("./pages/Testi"));
const Service = React.lazy(() => import("./pages/Service"));
const Travelers = React.lazy(() => import("./pages/Travelers"));
const Guides = React.lazy(() => import("./pages/Guides"));
const Bookings = React.lazy(() => import("./pages/Bookings"));
const Message = React.lazy(() => import("./pages/Message"));
const Gallery = React.lazy(() => import("./pages/Gallery"));

const Loginn = React.lazy(() => import("./pages/auth/Loginn"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));



function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="Destinasi" element={<Destinasi />} />
          <Route path="Testi" element={<Testi />} />
          <Route path="Service" element={<Service />} />
          <Route path="Travelers" element={<Travelers />} />
          <Route path="guides" element={<Guides />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="messages" element={<Message />} />
          <Route path="gallery" element={<Gallery />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          {/* <Route path="/Gallery" element={<Gallery />} /> */}
          {/* <Route path="/Message" element={<Message />} /> */}
          {/* <Route path="/AddOrders" element={<AddOrders />} /> */}
          {/* <Route path="/AddCustomer" element={<AddCustomer />} /> */}
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/loginn" element={<Loginn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
        <Route path="/Error400" element={<ErrorPage errorCode="400" />} />
        <Route path="/Error401" element={<ErrorPage errorCode="401" />} />
        <Route path="/Error403" element={<ErrorPage errorCode="403" />} />
        <Route path="*" element={<ErrorPage errorCode="404" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
