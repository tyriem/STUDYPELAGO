import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// IMPORT FIREBASE
import { initializeFirebase } from "./data/data-services";
import { firebaseAuth } from "./data/data-services";

//IMPORT SIDE MENU
import Menu from "./components/Menu";

//IMPORT HOME PAGE
import HomePage from "./pages/HomePage";

import TabT from "./pages/tabs/TimelineTab";
import TabTC from "./pages/tabs/TutorCenterTab";
import TabCC from "./pages/tabs/CourseCenterTab";
import TabSI from "./pages/tabs/StudyIslandTab";
import TabFT from "./pages/tabs/FindTutorTab";

import LoginPage from "./pages/auth/LoginPage";
import CreateAccountPage from "./pages/auth/CreateAccountPage";
import { useEffect, useState } from "react";

import DetailPage from "./pages/ProfilePage";
import PaymentPage from "./pages/commerce/PaymentPage";

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    console.log("start up");
    setSession(firebaseAuth.currentUser);

    firebaseAuth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged");
      //USER IS SIGNED IN
      if (user) {
        var uid = user.uid;
        setSession(user);
        console.log("USER: ", user);
      }

      setLoading(false);
    });

    console.log("SESSION: ", session);
  }, []);

  initializeFirebase();

  // if we have't checked for session yet, then display loading screen
  if (loading)
    return (
      <IonApp>
        <IonLoading isOpen={loading} />
      </IonApp>
    );

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <PrivateRoute
              path="/home"
              exact={true}
              component={HomePage}
            ></PrivateRoute>
            <Route path="/auth/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/auth/create-account" exact={true}>
              <CreateAccountPage />
            </Route>
            <Route path="/profile" exact={true}>
              <DetailPage />
            </Route>
            <Route path="/tabs/timeline" exact={true} component={TabT}>
              <HomePage />
            </Route>
            <Route path="/tabs/tutor-center" exact={true} component={TabTC}>
              <TabTC />
            </Route>
            <Route path="/tabs/course-center" exact={true} component={TabCC}>
              <TabCC />
            </Route>
            <Route path="/tabs/study-island" exact={true} component={TabSI}>
              <TabSI />
            </Route>
            <Route path="/tabs/find-tutor" exact={true} component={TabFT}>
              <TabFT />
            </Route>
            <Route
              path="/commerce/payment"
              exact={true}
              component={PaymentPage}
            >
              <PaymentPage />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

/**
 *
 * @param param0
 * @returns
 */
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  // useAuth is some custom hook to get the current user's auth state
  const isAuth = firebaseAuth.currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};
