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



### Cloning the repository

To clone the repository you have to run the following command where you want your cloned repository:

```bash
git clone --branch frontend https://github.com/link/to/repo
```



### Installation

This application is based on [Expo CLI](https://docs.expo.dev/workflow/expo-cli/), which needs to be installed with the following command:

```bash
npm install -g expo-cli
```



### Connection with the API

To make the application send the API calls to the right endpoint address, you have to change the value of the global address variable.
This file is found in \frontend\assets\globalVariable.js. This file has one line, with one variable that have to be changed to fit your setup. 

If you run it on ubuntu, you just have to change it to "localhost". 
If you run the server on wsl you have to find the ip address associated with the wsl 2 distribution with the following command: 

```bash
wsl -- ip -o -4 -json addr list eth0 `
| ConvertFrom-Json `
| %{ $_.addr_info.local } `
| ?{ $_ }
```
The backend server needs to be running for the API calls to work. The setup for the backend server is found [here](https://github.com/lars-and-anders-bachelor-thesis/just-us).


### Running the application

When in the just-us folder, one has to use the following command to start the local server of the application: 
```bash
npm start
```

Then if you are going to use an Mobile Device Emulator, you have to press **`r`** to connect to the device. It is also helpful to know the **`r`** to reload the application if it enters an unexpected crash. 
