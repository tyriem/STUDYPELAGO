import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import {
  home,
  ellipse,
  square,
  triangle,
  calendar,
  compass,
  personCircle,
  pencil,
  search,
  map,
  informationCircle,
} from "ionicons/icons";
import { Route, Redirect, useHistory } from "react-router";
import "./Page.css";

import TabT from "./tabs/TimelineTab";
import TabTC from "./tabs/TutorCenterTab";
import TabCC from "./tabs/CourseCenterTab";
import TabSI from "./tabs/StudyIslandTab";
import TabFT from "./tabs/FindTutorTab";

import { firebaseAuth, firebaseApp } from "../store/firebase";
import { useEffect, useState } from "react";

// import img
import welcomeImg from "../assets/img/welcome.jpg";

const HomePage: React.FC = () => {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<any>(null);

  // used to render platform specific alerts
  const [present] = useIonAlert();

  // get user profile information
  useEffect(() => {
    const loadUserProfile = async () => {
      const userId = firebaseAuth.currentUser?.uid;
      console.log("User ID: ", userId);
      const dataResponse = await firebaseApp
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      // get the user data
      setUserProfile(dataResponse.data());
      console.log("Data Response: ", dataResponse.data);
    };

    console.log("get user profile information...");
    loadUserProfile();
  }, []);

  // END FIRST RUN PROTOCOL
  var doEndFirstRun = async () => {
    try {
      firebaseApp
        .firestore()
        .collection("users")
        .doc(firebaseAuth.currentUser?.uid)
        .update({ firstRun: 0 });

      // if no error, then render home page
      history.replace("/tabs/");
    } catch (error: any) {
      // error check for ending first run...
      if (error) {
        present({
          header: "Error Ending First Run",
          message: error?.message,
          buttons: ["OK"],
        });
        return;
      }
    }
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="light" />
          </IonButtons>
          <IonTitle>STUDYPELAGO</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonButton routerLink={"/profile"} color="light">
          Profile
        </IonButton>
        <pre>
          Welcome, {userProfile?.firstName} {userProfile?.lastName}
        </pre>
        <h6>Role: {userProfile?.role}</h6>
        {userProfile?.firstRun ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>New User</IonCardTitle>
              <IonCardSubtitle>
                Thank you for joining Studypelago, New User:{" "}
                {userProfile?.firstName} {userProfile?.lastName}
              </IonCardSubtitle>
            </IonCardHeader>
            {/* ION-IMG: Render Image */}
            <IonImg src={welcomeImg}></IonImg>

            <IonCardContent>
              <h4>
                We at Studypelago would like to thank you for trying our
                service. <p></p>
                Would you like to find a tutor immediately or have a quick tour
                of our app?
              </h4>
              <IonButton routerLink={"/product/product"}>
                FIND A TUTOR
              </IonButton>
              <IonButton onClick={() => doEndFirstRun()}>
                TOUR STUDYPELAGO
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : null}

        {/* use firebase auth api to get current user, and
         render the json response */}
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>

        {/* TERNARY OP: ROLE = TUTOR */}
        {userProfile?.role === "Tutor" ? (
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/tabs" to="/tabs/timeline" />
              {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
              <Route
                path="/tabs/TimelineTab"
                render={() => <TabT />}
                exact={true}
              />
              <Route
                path="/tabs/TutorCenterTab"
                render={() => <TabTC />}
                exact={true}
              />
              <Route
                path="/tabs/CourseCenterTab"
                render={() => <TabCC />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="TimelineTab" href="/tabs/timeline">
                <IonIcon icon={home} />
                <IonLabel>Timeline</IonLabel>
              </IonTabButton>

              <IonTabButton tab="TutorCenterTab" href="/tabs/tutor-center">
                <IonIcon icon={calendar} />
                <IonLabel>Tutor Center</IonLabel>
              </IonTabButton>
              <IonTabButton tab="CourseCenterTab" href="/tabs/course-center">
                <IonIcon icon={pencil} />
                <IonLabel>Course Center</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          /* TERNARY OP: ROLE = STUDENT OR PARENT */
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/tabs" to="/tabs/timeline" />
              {/*
      Using the render method prop cuts down the number of renders your components will have due to route changes.
      Use the component prop when your component depends on the RouterComponentProps passed in automatically.
    */}
              <Route
                path="/tabs/TimelineTab"
                render={() => <TabT />}
                exact={true}
              />
              <Route
                path="/tabs/StudyIslandTab"
                render={() => <TabSI />}
                exact={true}
              />
              <Route
                path="/tabs/FindTutorTab"
                render={() => <TabFT />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="TimelineTab" href="/tabs/timeline">
                <IonIcon icon={home} />
                <IonLabel>Timeline</IonLabel>
              </IonTabButton>

              <IonTabButton tab="StudyIslandTab" href="/tabs/study-island">
                <IonIcon icon={compass} />
                <IonLabel>Study Island</IonLabel>
              </IonTabButton>
              <IonTabButton tab="FindTutorTab" href="/tabs/find-tutor">
                <IonIcon icon={search} />
                <IonLabel>Find A Tutor</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
