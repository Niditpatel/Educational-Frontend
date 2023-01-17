import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Fallback from "./components/common/Fallback";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";
import ErrorPage from "./components/common/ErrorPage/ErrorPage";
const LandingPage = lazy(() => import("./components/Landingpage/LandingPage"));
const LandingPageContent = lazy(
  () => import("./components/Landingpage/LandingPageContant")
);
const Login = lazy(() => import("./components/Login/Login"));
const Signup = lazy(() => import("./components/Signup/signup"));

const ResetPassword = lazy(
  () => import("./components/common/ResetPassword/ResetPassowrd")
);
const ForgotPassword = lazy(() => import("./components/common/ForgotPassword"));
const Administration = lazy(() => import("./components/Admin/Adminitration"));
const Class = lazy(() => import("./components/Class/Class"));
const Assets = lazy(() => import("./components/Assets/Assets"));
const Institutes = lazy(() => import("./components/Institutes/Institutes"));
const Users = lazy(() => import("./components/Users/users"));
const ActiveAccount = lazy(
  () => import("./components/common/ActiveAccount/Index")
);
const VerifyAccount = lazy(() => import("./components/common/VerifyAccount"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Fallback />}>
              <LandingPage />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<Fallback />}>
                <LandingPageContent />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Fallback />}>
                <Login />
              </Suspense>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Fallback />}>
                <Signup />
              </Suspense>
            }
          ></Route>
          <Route
            path="/forgotpassword"
            element={
              <Suspense fallback={<Fallback />}>
                <ForgotPassword />
              </Suspense>
            }
          ></Route>
          <Route
            path="/resetpassword/:token"
            element={
              <Suspense fallback={<Fallback />}>
                <ResetPassword />
              </Suspense>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <RouteGuard>
                <Suspense fallback={<Fallback />}>
                  <Administration />
                </Suspense>
              </RouteGuard>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <Suspense fallback={<Fallback />}>
                <Users />
              </Suspense>
            }
          ></Route>
          <Route
            path="/institutes"
            element={
              <Suspense fallback={<Fallback />}>
                <Institutes />
              </Suspense>
            }
          ></Route>
          <Route
            path="/assets"
            element={
              <Suspense fallback={<Fallback />}>
                <Assets />
              </Suspense>
            }
          ></Route>
          <Route
            path="/classes"
            element={
              <Suspense fallback={<Fallback />}>
                <Class />
              </Suspense>
            }
          ></Route>
          <Route
            path="/verifyaccount/:token"
            element={
              <Suspense fallback={<Fallback />}>
                <VerifyAccount />
              </Suspense>
            }
          />
          <Route
            path="/activeaccount/:token"
            element={
              <Suspense fallback={<Fallback />}>
                <ActiveAccount />
              </Suspense>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
