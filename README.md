# Running the frontend of Just Us

### Requirements

One of the following versions of [Node.js](https://nodejs.org/en/download/) must be installed to run **`npm`**:

* `14.x.x` >= `14.15.0`
* `16.0.0` or higher

You can use the following command to check your version:

```bash
node -v
```

You also need a mobile device to run the application on, whether this is a physical phone or an emulated one. [Android Studio](https://developer.android.com/studio)'s Emulator is the Android Emulator that has been used to develop and test this application. 

### Installation

One has to clone the frontend branch of the repository

This application is based on [Expo CLI](https://docs.expo.dev/workflow/expo-cli/), which needs to be installed with the following command:

```bash
npm install -g expo-cli
```

### Running the application

When in the just-us folder, one has to use the following command to start the local server of the application: 
```bash
npm start
```

Then if you are going to use an Mobile Device Emulator, you have to press **`r`** to connect to the device. It is also helpful to know the **`r`** to reload the application if it enters an unexpected crash. 
