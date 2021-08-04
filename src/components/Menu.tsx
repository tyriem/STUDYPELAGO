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
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  calendarOutline,
  calendarSharp,
  timeOutline,
  timeSharp,
  compassOutline,
  compassSharp,
  heartOutline,
  heartSharp,
  homeOutline,
  homeSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  manOutline,
  manSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  nutritionSharp,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./Menu.css";
import { firebaseAuth } from "../store/firebase";

// import img
import iconImg from "../assets/img/user-icon.png";

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
    title: "Study Island",
    url: "/tabs/study-island",
    iosIcon: compassOutline,
    mdIcon: compassSharp,
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
          <IonList id="labels-list">
            <IonListHeader>BOOKMARKS</IonListHeader>
            <IonItem>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel> Study Islands </IonLabel>
            </IonItem>
            <p></p>
            <IonButton routerLink={"/study-island"} size="small">
              BGCSE MATH WITH TUTOR: TYRIE MOSS
            </IonButton>
            <p></p>

            <IonItem>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel> Assignments </IonLabel>
            </IonItem>
            <p></p>
            <IonButton routerLink={"/assignment"} size="small">
              BGCSE MATH - Section 1 - MULTIPLE CHOICE
            </IonButton>
            <p></p>
            <IonItem>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel> Reminders </IonLabel>
            </IonItem>
            <h6>
              Assignment: BGCSE MATH - Section 1 - MULTIPLE CHOICE is due Monday
            </h6>
          </IonList>
        </IonContent>
      </IonMenu>
    ) : null
  );
};

export default Menu;
