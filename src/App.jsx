import { useState } from "react";
import React from "react";
import "./assets/tailwind.css";
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
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Lowongan = React.lazy(() => import("./pages/Lowongan"));
const Tim = React.lazy(() => import("./pages/Tim"));
const Artikell = React.lazy(() => import("./pages/Artikell"));
const Users = React.lazy(() => import("./pages/Users"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const TiketDestinasii = React.lazy(() => import("./pages/TiketDestinasii"));
const PesanTiket = React.lazy(() => import("./pages/PesanTiket"));
const Hotel = React.lazy(() => import("./pages/Hotel"));

const Detailguides = React.lazy(() => import("./pages/Detailguides"));
const Detailgallery = React.lazy(() => import("./pages/Detailgallery"));
const Detaildestinasi = React.lazy(() => import("./pages/Detaildestinasi"));
const Detailbooking = React.lazy(() => import("./pages/Detailbooking"));

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
          <Route path="/Detailguides/:id" element={<Detailguides />} /> 
          <Route path="/Detailgallery/:id" element={<Detailgallery />} />
          <Route path="/Detaildestinasi/:id" element={<Detaildestinasi />} />
          <Route path="/Detailbooking/:id" element={<Detailbooking />} />

          <Route path="bookings" element={<Bookings />} />
          <Route path="messages" element={<Message />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="Lowongan" element={<Lowongan />} />
          <Route path="Tim" element={<Tim />} />
          <Route path="artikel" element={<Artikell />} />
          <Route path="users" element={<Users />} />
          <Route path="Us" element={<AboutUs />} />
          <Route path="TiketDestinasi" element={<TiketDestinasii />} />
          <Route path="PesanTiket" element={<PesanTiket />} />
          <Route path="hotel" element={<Hotel />} />
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
