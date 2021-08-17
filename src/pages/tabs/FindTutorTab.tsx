import { useEffect, useState } from "react";
import {
  firebaseApp,
  firebaseAuth,
  getDataByTutorId,
} from "../../data/data-services";
import { getTutorData } from "../../data/data-services";
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
import { Redirect, Route, useParams } from "react-router";
import { PopupButton } from "react-calendly";
import { home, calendar, pencil, compass, search, star } from "ionicons/icons";

// IMPORT TABS
import TabT from "./TimelineTab";
import TabTC from "./TutorCenterTab";
import TabCC from "./CourseCenterTab";
import TabSI from "./StudyIslandTab";
import TabFT from "./FindTutorTab";

import { updateTutor, updateReview, saveImage } from "../../data/data-services";

function FindTutorTab() {
  const [message, setMessage] = useState<any>();
  const params = useParams<any>();
  const [userProfile, setUserProfile] = useState<any>(null);

  // hold the comments data after retrieved from database
  const [comments, setComments] = useState<any>();

  // holds the messageText when creating new commments
  const [messageText, setMessageText] = useState<any>();

  const loadTutorReviews = async () => {
    const dataReviews = await firebaseApp
      .firestore()
      .collection("tutor-review")
      .doc(params.productId)
      .get();

    // SET THE USER DATA FROM DOCUMENT
    setComments(dataReviews.data());
    console.log("THE REVIEW DATA IS: ", dataReviews.data);
  };

  useEffect(() => {
    (async () => {
      const msg = await getTutorData();
      setMessage(msg);
      console.log("The MSG IS:", msg);
    })();

    loadTutorReviews();

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
  }, [params.productId]);

  // SAVE THE COMMENT TO THE LIST - save the information to database and
  // reload the comments before you are done.
  const doSaveComment = async () => {
    const { data, error } = await updateReview({
      product_id: params.productId,
      message: messageText,
      user_id: firebaseAuth.currentUser?.uid,
    });
    // clear out message
    setMessageText("");

    await loadTutorReviews();
  };

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>FIND A TUTOR</IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
              color="secondary"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <IonItem>
            <div>
              {message.map((id: any, index: string) => {
                return (
                  <div key={index} style={{ width: "100%", margin: "auto" }}>
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
                            <div>
                              <h2>Tutor Type: {id.subject}</h2>
                            </div>
                            <div>
                              <h3>Tutor Description: {id.description}</h3>
                            </div>

                            <div style={{ width: "100%" }}>
                              <IonImg src={id.imageData?.downloadUrl} />
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
                  </div>
                );
              })}
            </div>
          </IonItem>
        ) : (
          <div>NO TUTORS FOUND</div>
        )}

        {comments ? (
          comments?.map((c: any) => <CommentItem comment={c} key={c.id} />)
        ) : (
          <h2> NO TUTOR REVIEWS FOUND</h2>
        )}
      </IonContent>
      <IonFooter style={{ padding: 10 }}>
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
}

export default FindTutorTab;

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
