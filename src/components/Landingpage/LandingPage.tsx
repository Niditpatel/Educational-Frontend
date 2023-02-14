import { useState } from "react";
import { Outlet } from "react-router-dom";
import Fallback from "../common/Fallback";

import Footer from "../common/Footer";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
import { LogUserContextProvider } from "../Login/LogUserContext";

import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function LandingPage() {
  const [Loguser, setLoguser] = useState(null);
  const [Loading, setLoading] = useState(false);

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <div className="relative ">
      <div
        className="border flex flex-col h-screen overflow-auto scrollbar-none "
        id="LandingPage"
      >
        <LogUserContextProvider value={Loguser}>
          <Navbar />
          <Header />
          <TransitionGroup>
            <CSSTransition timeout={800} classNames="page" unmountOnExit>
              <div className="my-5 ">
                <Outlet context={{ setLoguser, handleLoading }} />
              </div>
            </CSSTransition>
          </TransitionGroup>
          <div className="border self-bottom mt-auto  py-4  bg-primary ">
            <Footer />
          </div>
        </LogUserContextProvider>
      </div>
      {Loading === true && <Fallback />}
    </div>
  );
}
