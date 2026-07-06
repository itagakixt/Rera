# Rera

A grocery list app built with React Native and Firebase Realtime Database. Items are added/removed and synced live across devices via Firebase.

## Tech Stack

- React Native 0.85 (new `@react-native-community/cli`, no Expo)
- TypeScript
- `@react-native-firebase/app` + `@react-native-firebase/database` for realtime sync
- Jest + `react-test-renderer` for tests
- ESLint (`@react-native` config) + Prettier

## Structure

```
App.tsx              # single screen: list + add/remove flow, owns all Firebase reads/writes
components/
  ActionButton.tsx    # bottom "Add" bar that opens the modal
  ListItem.tsx        # single row in the FlatList
  StatusBar.tsx       # fake status bar + nav title header
__tests__/App.test.tsx # smoke test: renders <App/> without crashing
index.js             # RN entry point, registers App via app.json's displayName
android/, ios/        # native projects (standard RN layout, not app logic)
```

There is no navigation library, no state management library, and no backend other than Firebase — all app state lives in `App.tsx`'s `useState`/`useEffect`. Keep it that way unless the app's scope actually grows; don't introduce Redux/Zustand/React Navigation for a single-screen app.

## Data model

Firebase Realtime Database, single `items` node:

```
items/
  <push-id>: { title: string }
```

`App.tsx` subscribes with `database().ref('items').on('value', ...)` and turns the snapshot into `Item[]` (`{ title, _key }`, where `_key` is the Firebase push key). Adds use `.push({ title })`; removals use `.remove()` on `items/<key>` after an `Alert.alert` confirmation (the confirm dialog's affirmative button is labeled "Complete", matching the grocery-list "mark done" mental model — don't relabel it to "Delete" without checking with the user).

## Firebase config

- iOS config lives at `ios/GoogleService-Info.plist` — already checked into the repo.
- Android config would be `android/app/google-services.json` — not currently present; add it there if Android builds need it.
- These are client config files (not server secrets) but still treat them as environment-specific — don't regenerate or overwrite them unless the user is deliberately switching Firebase projects.

## Development workflow

```sh
npm install
cd ios && pod install    # iOS only, after any native dependency change

npm start                # Metro bundler, keep running in its own terminal
npm run ios              # or: npm run android
```

- `npm run lint` — ESLint via `@react-native` config (`.eslintrc.js`)
- `npm test` — Jest via `@react-native/jest-preset` (`jest.config.js`)
- Prettier config is in `.prettierrc.js` (single quotes, trailing commas, `arrowParens: avoid`) — match existing style, don't reformat unrelated code.
- No CI is configured in this repo; lint/test/build locally before considering a change done.

## Conventions

- Components are function components with named prop `type`s inline above the component, not separate interface files.
- Styles are colocated per-component via `StyleSheet.create` at the bottom of the file — don't extract a shared theme/style file unless asked.
- The accent color `#24CE84` is repeated in `ActionButton.tsx` and `App.tsx`'s dialog button; if it needs to change, update both.
- Keep everything in this app single-screen and dependency-light — this is intentionally a small utility app, not a platform to extend speculatively.
