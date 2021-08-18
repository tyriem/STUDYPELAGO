import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  useIonAlert,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  bookmarkOutline,
  calendarOutline,
  calendarSharp,
  homeOutline,
  homeSharp,
  manOutline,
  manSharp,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./Menu.css";
import { firebaseApp, firebaseAuth } from "../store/firebase";

// import img
import iconImg from "../assets/img/user-icon.png";
import { useEffect, useState } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: manOutline,
    mdIcon: manSharp,
  },
  {
    title: "Schedule",
    url: "/schedule",
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
  },
];

const labels = ["Tutors", "Assignments", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<any>(null);

  // GET DOCUMENT "USERS"
  useEffect(() => {
    const loadUserProfile = async () => {
      const userId = firebaseAuth.currentUser?.uid;
      console.log("User ID: ", userId);
      const dataResponse = await firebaseApp
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      // SET THE USER DATA FROM DOCUMENT
      setUserProfile(dataResponse.data());
      console.log("Data Response: ", dataResponse.data);
    };

    console.log("get user profile information...");
    loadUserProfile();
  }, []);

  // used to render platform specific alerts
  const [present] = useIonAlert();

  /**
   *
   * @returns
   */
  const doLogout = async () => {
    try {
      await firebaseAuth.signOut();

      // after logout, go back to login page
      history.replace("/auth/login");
    } catch (error: any) {
      // error check for creating user...
      if (error) {
        present({
          header: "Error Logging Out",
          message: error?.message,
          buttons: ["OK"],
        });
        return;
      }
    }
  };
  const isAuth = firebaseAuth.currentUser;

  return (
    // TERNARY OPERATOR -> IF I HAVE USER SHOW | IF NOT NULL
    // NB: TERNARY OP OF FORMAT (condition ? exprIfTrue : exprIfFalse) TO RENDER MENU OR NOT BASED ON LOGIN STATUS
    isAuth ? (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>
              {/* TODO: CODE PROFILE IMAGE REPLACEMENT */}
              <IonImg src={iconImg}>Profile</IonImg>
            </IonListHeader>
            {/* DISPLAY EMAIL  */}
            <IonNote>
              <IonButton routerLink={"/profile"} color="light">
                <h6>{firebaseAuth.currentUser?.email}</h6>
              </IonButton>
              <IonButton onClick={() => doLogout()} color="light">
                SIGN OUT
              </IonButton>
            </IonNote>{" "}
            {/* ELVIS OP OPTION  */}
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
          {/* MAP TO PRINT ALL LABELS
          <IonList id="labels-list">
            <IonListHeader>BOOKMARKS</IonListHeader>
            
            {labels.map((label, index) => (
              <IonItem lines="none" key={index}>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel>{label}</IonLabel>
                MAP TO PRINT ALL LABELS
              </IonItem>
            ))}
          </IonList> */}

          {/* TABS BY ROLE */}
          {/* TERNARY OP: ROLE = TUTOR */}
          {userProfile?.role === "Student" ? (
            <IonList id="labels-list">
              <IonListHeader>BOOKMARKS</IonListHeader>
              <IonItem>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel> Study Islands </IonLabel>
              </IonItem>
              <p></p>
              <p></p>

              <IonItem>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel> Assignments </IonLabel>
              </IonItem>
              <p></p>
              <p></p>
              <IonItem>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel> Reminders </IonLabel>
              </IonItem>
            </IonList>
          ) : (
            <IonList id="labels-list">
              <IonListHeader>BOOKMARKS</IonListHeader>
              <p></p>
              <IonItem>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel> Reminders </IonLabel>
              </IonItem>
            </IonList>
          )}
        </IonContent>
      </IonMenu>
    ) : null
  );
};

export default Menu;
