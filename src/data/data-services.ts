
/// FIREBASE STUFF
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// THIS HOLDS THE DATA
const data = [];


export const initializeFirebase = () => {

  //INITIALIZE FIREBASE
  var firebaseConfig = {

  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  });
  }
}
initializeFirebase();


// SAVE IMAGE
//

// path where data is stored in firebase storage
const STORAGE_FILE_PATH = "images/tutors";

// main collection name
const COLLECTION_NAME_TUTOR = "tutor-listing";

// main collection name
const COLLECTION_NAME_COURSE = "course-listing";

/**
 * Saves the image to the database and returns either an error or information
 * about the object that you just saved
 * 
 * @param imageData - File
 * @returns 
 */
export const saveImage = async (imageData: any) => {

  // we need the function to be async so we wrap the whole thing in a 
  // promise. We return result using the resolve parameter and an error
  // using the reject parameter
  return new Promise<any>((resolve, reject) => {

    // get a reference to our storage in the database
    const storageRef = firebase.storage().ref();

    // create a unique path name for the image
    let uniquePathName =
      new Date().getTime() +
      "-" +
      imageData.name;

    // get the reference that includes path in database plus the 
    // unique name we used for the image we are saving
    let ref = storageRef.child(STORAGE_FILE_PATH + uniquePathName);

    // start the upload process, we are also including the file type 
    // with the upload...
    let uploadTask = ref.put(imageData, {
      contentType: imageData.type
    });

    // here we listen for specific events and take action when needed
    // error - we reject the promise and return the error we got
    // complete - we need to get the download url and then gather other pieces
    //   of data we want to return to the user, create an object and resolve
    //   the promise with the data
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      'next': (s) => null,
      'error': (error) => {
        console.log(error);
        reject(error);
      },
      'complete': async () => {
        console.log('upload complete!');

        let downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
        let data = {
          //   metaData: uploadTask.snapshot.metadata,
          downloadUrl,
          name: uploadTask.snapshot.metadata.name,
          image: {
            ref: uploadTask.snapshot.ref.fullPath,
            size: uploadTask.snapshot.metadata.size,
            contentType: uploadTask.snapshot.metadata.contentType,
            timeCreated: uploadTask.snapshot.metadata.timeCreated
          }
        };
        resolve({ data });
      }
    });
  });

}


// READ DATA
// https://firebase.google.com/docs/firestore/query-data/get-data
export const getTutorData = async () => {


  // get firebase firestore database
  const db = firebase.firestore();

  const results: any = [];
  // --
  // GET ALL THE DOCUMENTS
  const querySnapshot = await db.collection(COLLECTION_NAME_TUTOR).get();

  // loop through documents
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    results.push({
      id: doc.id,
      ...doc.data(), // <- JAVASCRIPT DESTRUCTURING
    })
  });
  console.log(results);
  return results;
};


// READ DATA
// https://firebase.google.com/docs/firestore/query-data/get-data
export const getCourseData = async () => {


  // get firebase firestore database
  const db = firebase.firestore();

  const results: any = [];
  // --
  // GET ALL THE DOCUMENTS
  const querySnapshot = await db.collection(COLLECTION_NAME_COURSE).get();

  // loop through ocuments
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    results.push({
      id: doc.id,
      ...doc.data(), // <- JAVASCRIPT DESTRUCTURING
    })
  });
  console.log(results);
  return results;
};


/**
 * 
 * @param tutorData 
 * @returns 
 */
export const updateTutor = async (tutorData: any) => {
  // get firebase firestore database
  const db = firebase.firestore();

  try {
    const data = await db.collection(COLLECTION_NAME_TUTOR).doc().set(tutorData)
    return {
      data,
      error: null
    }
  } catch (error) {
    return { data: null, error }
  }
}
/**
 * 
 * @param id 
 */
export const getDataByTutorId = (id: string) => {

  // get firebase firestore database
  const db = firebase.firestore();

  // get a reference to a specific document
  const docRef = db.collection(COLLECTION_NAME_TUTOR).doc(id);
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return {
          id: doc.id,
          ...doc.data()
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });


}

/**
 * 
 * @param courseData 
 * @returns 
 */
 export const updateCourse = async (courseData: any) => {
  // get firebase firestore database
  const db = firebase.firestore();

  try {
    const data = await db.collection(COLLECTION_NAME_COURSE).doc().set(courseData)
    return {
      data,
      error: null
    }
  } catch (error) {
    return { data: null, error }
  }
}
/**
 * 
 * @param id 
 */
export const getDataByCourseId = (id: string) => {

  // get firebase firestore database
  const db = firebase.firestore();

  // get a reference to a specific document
  const docRef = db.collection(COLLECTION_NAME_COURSE).doc(id);
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data: ", doc.data());
        return {
          id: doc.id,
          ...doc.data()
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document: ", error);
    });


}


export const firebaseAuth = firebase.auth();
export const firebaseApp = firebase;
export const firebaseStorage = firebase.storage;
