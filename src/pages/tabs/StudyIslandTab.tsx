import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab.css";
import VideoCallFrame from "../../components/VideoCallFrame";

// IMPORT TABS
import TabT from "./TimelineTab";
import TabTC from "./TutorCenterTab";
import TabCC from "./CourseCenterTab";
import TabSI from "./StudyIslandTab";
import TabFT from "./FindTutorTab";

// IMPORT: USE LIBs
import { useEffect, useState } from "react";
import { home, calendar, pencil, compass, search } from "ionicons/icons";
import { Redirect, Route } from "react-router";

// IMPORT DATA SERVICES
import {
  firebaseAuth,
  firebaseApp,
  updateTutor,
  updateReview,
  saveImage,
  getSpTutorData,
} from "../../data/data-services";

// IMPORT: CHAT COMPONENTS
import ActiveChats from "../../components/imActiveChats.js";
import ChatWindow from "../../components/imChatWindow.js";
import Connect from "../../components/imConnect.js";
import CreateChat from "../../components/imCreateChat.js";
import { PopupButton } from "react-calendly";

const StudyIslandTab: React.FC = () => {
  const [message, setMessage] = useState<any>();

  const [userProfile, setUserProfile] = useState<any>(null);

  // holds the messageText when creating new commments
  const [reviewText, setReviewText] = useState<any>();

  // hold the comments data after retrieved from database
  const [comments, setComments] = useState<any>();

  // holds the messageText when creating new commments
  const [messageText, setMessageText] = useState<any>();

  const loadTutorReviews = async () => {
    const dataReviews = await firebaseApp
      .firestore()
      .collection("tutor-review")
      .doc()
      .get();

    // SET THE USER DATA FROM DOCUMENT
    setComments(dataReviews.data());
    console.log("THE REVIEW DATA IS: ", dataReviews.data);
  };

  // GET DOCUMENT "USERS"
  useEffect(() => {
    (async () => {
      const msg = await getSpTutorData();
      setMessage(msg);
      console.log("The MSG IS:", msg);
    })();

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

    loadTutorReviews();
  }, []);

  // SAVE THE COMMENT TO THE LIST - save the information to database and
  // reload the comments before you are done.
  const doSaveComment = async () => {
    const { data, error } = await updateReview({
      product_id: 1, //params.productId, FIXME
      message: messageText,
      user_id: firebaseAuth.currentUser?.uid,
    });
    // clear out message
    setMessageText("");
    await loadTutorReviews();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>STUDY ISLAND</IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
              color="secondary"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* TUTOR LISTINGS */}
        {message ? (
          <div>
            {message.map((id: any, index: string) => {
              return (
                <div key={index} style={{ width: "100%", margin: "auto" }}>
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" offset="0">
                          <IonCard color="secondary">
                            <IonCardHeader>
                              <IonThumbnail slot="start"></IonThumbnail>

                              <IonCardTitle>
                                <strong>{id.timelineTitle}</strong>
                              </IonCardTitle>
                              <IonChip>
                                {/* ION-IMG: Render Image */}
                                <IonAvatar>
                                  <img src="https://en.gravatar.com/userimage/37371217/fc40b48729e7d16a37d340e00c96618e.png" />
                                </IonAvatar>

                                <IonLabel>Tutor Name: {id.name}</IonLabel>
                              </IonChip>
                            </IonCardHeader>
                            <div style={{ padding: 5 }}>
                              <h2>Tutor Type: {id.subject}</h2>
                            </div>
                            <div style={{ width: "100%", margin: "auto" }}>
                              <IonButton size="default">
                                <PopupButton
                                  text="Request a Session with this Tutor"
                                  url="https://calendly.com/studypelago"
                                />
                              </IonButton>
                            </div>
                          </IonCard>
                        </IonCol>
                      </IonRow>
                    </IonGrid>

                    <br></br>
                  </IonItem>
                </div>
              );
            })}
          </div>
        ) : (
          <div>NO TUTORS FOUND</div>
        )}

        {/* TUTOR REVIEWS */}
        {comments ? (
          comments?.map((c: any) => <CommentItem comment={c} key={c.id} />)
        ) : (
          <h2> NO TUTOR REVIEWS FOUND</h2>
        )}
        <IonTextarea
          rows={3}
          value={messageText}
          style={{ background: "lightGrey" }}
          onIonChange={(event: any) => setMessageText(event.target.value)}
        />
        <IonButton
          size="small"
          onClick={doSaveComment}
          disabled={messageText?.length < 10}
        >
          SEND REVIEW
        </IonButton>
      </IonContent>
      <IonFooter style={{ padding: 1 }}>
        <IonToolbar>
          {/* TABS BY ROLE */}
          {/* TERNARY OP: ROLE = TUTOR */}
          {userProfile?.role === "Tutor" ? (
            <IonTabs>
              <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/timeline" />
                {/*
          NB: Render - Cuts down on # of renders
              Component Prop - component depends on the RouterComponentProps passed in automatically.
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
                  <IonLabel>Home</IonLabel>
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
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default StudyIslandTab;

/**
 * Simple helper functional component to render a comment entry
 * @param param0
 * @returns
 */
const CommentItem = ({ comment }: any) => {
  var formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(comment.inserted_at));
  return (
    <IonItem>
      <IonLabel>
        <div>{comment.message}</div>
        <p>{comment.username}</p>
        <p>{formatted}</p>
      </IonLabel>
    </IonItem>
  );
};
