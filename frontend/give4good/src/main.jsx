import React, { Suspense } from "react";
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
import UserProfile from "./pages/profile/UserProfile.jsx";
import { FundRaisingCard } from "./components/FundRaiserCard.jsx";
import { MyGoodDonatedCard } from "./components/MyGoodDonatedCard.jsx";
import { ObtainedGoodCard } from "./components/ObtainedGoodCard.jsx";
const LazyCamppaign = React.lazy(() =>
  import("./pages/create-campaign/CreateCampaign.jsx")
);
const LazyMyCampaignPage = React.lazy(() =>
  import("./components/MyCampaignPage.jsx")
);
const LazyCampaignPage = React.lazy(() =>
  import("./components/CampaignPage.jsx")
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
const LazyProductPage = React.lazy(() =>
  import("./components/ProductPage.jsx")
);
const LazyMyProductPage = React.lazy(() =>
  import("./components/MyProductPage.jsx")
);
const LazyObtainedGoodPage = React.lazy(() =>
  import("./components/ObtainedGoodPage.jsx")
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
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
        path="/campaign-page"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <LazyCampaignPage />
          </Suspense>
        }
      />

      <Route
        path="/product-page"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <LazyProductPage />
          </Suspense>
        }
      />
      <Route
        path="/my-product-page"
        element={
          <Suspense fallback={<div>loading...</div>}>
            <LazyMyProductPage />
          </Suspense>
        }
      />
      <Route
        path="/obtained-goods-page"
        element={
          <Suspense fallback={<div>...loading</div>}>
            <LazyObtainedGoodPage />
          </Suspense>
        }
      />
      <Route
        path="/my-campaign-page"
        element={
          <Suspense fallback={<div>...loading</div>}>
            <LazyMyCampaignPage />
          </Suspense>
        }
      />
      <Route
        path="/user-profile/profile"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <LazyUserProfile />
          </Suspense>
        }
      >
        <Route path="/user-profile/profile" element={<UserProfile />} />
        <Route
          path="/user-profile/profile/my-campaigns"
          element={<FundRaisingCard />}
        >
          <Route
            path="/user-profile/profile/my-campaigns/page"
            element={
              <Suspense fallback={<div>loading...</div>}>
                <LazyMyCampaignPage />
              </Suspense>
            }
          />
        </Route>
        {/* <Route path="/user-profile/donation-history" /> */}
        <Route
          path="/user-profile/profile/donated-goods"
          element={<MyGoodDonatedCard />}
        />
        <Route
          path="/user-profile/profile/obtained-goods"
          element={<ObtainedGoodCard />}
        />

        <Route path="/user-profile/profile/delete-account" />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
