import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import KYCform from "./components/KYCform.jsx";
const LazyCamppaign = React.lazy(() =>
  import("./pages/create-campaign/CreateCampaign.jsx")
);
const LazyExplore = React.lazy(() => import("./pages/explore/Explore.jsx"));
const LazyGoods = React.lazy(() => import("./pages/goods/ExploreGoods.jsx"));
const LazyDonateGoods = React.lazy(() =>
  import("./pages/donate-goods/DonateGoods.jsx")
);
const LazyUserProfile = React.lazy(() =>
  import("./pages/profile/UserProfile.jsx")
);
const LazyLogin = React.lazy(() => import("./pages/login/Login.jsx"));
const LazySignup = React.lazy(() => import("./pages/signup/Signup.jsx"));
const LazyCamppaignForm = React.lazy(() =>
  import("./components/CampaignForm.jsx")
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      {/* <Route
        path="/create-campaign"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyCamppaign />
          </Suspense>
        }
      /> */}
      <Route
        path="/create-campaign"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyCamppaign />
          </Suspense>
        }
      >
        <Route path="/create-campaign/kyc-verification" element={<KYCform />} />
        <Route
          path="/create-campaign/campaign-form"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <LazyCamppaignForm />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/explore-campaign"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyExplore />
          </Suspense>
        }
      />
      <Route
        path="/explore-goods"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyGoods />
          </Suspense>
        }
      />
      <Route
        path="/donate-goods"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyDonateGoods />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyLogin />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazySignup />
          </Suspense>
        }
      />
      <Route
        path="/user-profile"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyUserProfile />
          </Suspense>
        }
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);