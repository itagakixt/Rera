# Rera

A grocery list app built with React Native and Firebase Realtime Database.

## Features

- Add and remove grocery items synced in real time via Firebase
- Works on iOS and Android

## Tech Stack

- React Native 0.85 (TypeScript)
- @react-native-firebase/database

## Getting Started

### Prerequisites

- Node.js 22+
- Xcode (iOS) or Android Studio (Android)
- A Firebase project with Realtime Database enabled

### Firebase Setup

- iOS: add your `GoogleService-Info.plist` to `ios/Rera/`
- Android: add your `google-services.json` to `android/app/`

### Install

```sh
npm install
cd ios && pod install
```

### Run

Start the Metro bundler:

```sh
npm start
```

Then in a separate terminal:

```sh
# iOS
npm run ios

# Android
npm run android
```
