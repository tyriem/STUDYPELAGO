
---
title: Media Capture
description: Capture audio, video, and images.
---
<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

- I updated this to work with latest version of android and ionic capacitor, resolves the permission error
- [full project sample](https://github.com/aaronksaunders/vue-media-capture-2)

```vue
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>MediaCapture Vue 3</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-button @click="takeVideo">TAKE VIDEO</ion-button>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import { MediaCapture } from "@ionic-native/media-capture";
import { ref } from "vue";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
export default {
  name: "Other",
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  setup() {
    const videoInfo = ref<any>(null);

    const takeVideo = async () => {
      try {
        console.log("start take video");
        const options = { limit: 1, duration: 30, quality: 1 };
        const result = await MediaCapture.captureVideo(options);
        videoInfo.value = (result as any)[0];

        console.log("videoInfo", JSON.stringify(videoInfo.value));

        // GET THE BLOB OF THE FILE...
        const blob = await fetch(
          Capacitor.convertFileSrc(videoInfo.value.fullPath)
        ).then(r => r.blob());
        console.log(videoInfo.value.fullPath, blob);

        // GET A LIST OF THE FILES STORED IN CACHE DIR ON ANDROID
        const files = await Filesystem.readdir({
          path: "",
          directory: Directory.Cache
        });
        console.log("files", JSON.stringify(files));
      } catch (error) {
        console.log("takeVideo error", error);
      }
    };

    return {
      takeVideo
    };
  }
};
</script>

<style scoped>
</style>
```


# cordova-plugin-media-capture

This plugin provides access to the device's audio, image, and video capture capabilities.

__WARNING__: Collection and use of images, video, or
audio from the device's camera or microphone raises important privacy
issues.  Your app's privacy policy should discuss how the app uses
such sensors and whether the data recorded is shared with any other
parties.  In addition, if the app's use of the camera or microphone is
not apparent in the user interface, you should provide a just-in-time
notice before the app accesses the camera or microphone (if the
device operating system doesn't do so already). That notice should
provide the same information noted above, as well as obtaining the
user's permission (e.g., by presenting choices for __OK__ and __No
Thanks__).  Note that some app marketplaces may require your app to
provide just-in-time notice and obtain permission from the user prior
to accessing the camera or microphone.  For more information, please
see the Privacy Guide.

