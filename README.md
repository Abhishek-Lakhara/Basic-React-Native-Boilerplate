This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## State and API architecture

This project uses feature-first architecture with Redux Toolkit for client state and RTK Query for server state:

- `src/app/` contains app navigation and global providers.
- `src/features/` contains domain screens, endpoint definitions, and feature behavior.
- `src/components/`, `src/hooks/`, and `src/utils/` contain shared UI and utilities.
- `src/store/index.ts` configures the typed store and `redux-persist`.
- Feature state lives beside its feature; `src/store/slices/` contains shared theme and general state.
- `src/services/` owns cross-feature API, config, and socket services.
- `src/services/api/baseApi.ts` owns API headers and 401 token refresh.
- RTK Query cache is intentionally not persisted; it is invalidated or refetched as needed.

Example feature layout:

```text
src/features/auth/
  screens/
  authApi.ts
  authSlice.ts
src/features/home/
  screens/
src/app/
  navigation/
  providers/
```

Use typed Redux hooks in components:

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAuth } from '@/store/selectors';
import { setUserRole } from '@/features/auth/authSlice';

const auth = useAppSelector(selectAuth);
const dispatch = useAppDispatch();
dispatch(setUserRole('seeker'));
```

Use generated RTK Query hooks for API calls:

```tsx
import { useSendOtpMutation } from '@/features/auth/authApi';

const [sendOtp, { isLoading, error }] = useSendOtpMutation();
await sendOtp({ phone: '+919999999999', countryCode: '91' }).unwrap();
```

Do not put server responses into Redux slices manually. Add an endpoint to the relevant feature API and use its query/mutation hook. Auth tokens are persisted through Redux; production deployments should move sensitive token storage to Keychain/Keystore-backed storage.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
