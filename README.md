# Make It Out The Group Chat (MIOTGC)

Make It Out The Group Chat, also known as MIOTGC, is a React Native application designed for both iOS and Android platforms. This app generates customized itineraries for users using the powerful GPT-3.5 API. In its current state, the application is fully functional, but there's room for improvement and additional features, particularly in the areas of front-end enhancements and social features.

You can run MIOTGC on your mobile device using the Expo Go app for both iOS and Android. If you have a macOS device, you can also simulate it using XCode for iOS.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

Here's an overview of the project's directory structure and key files:

- **android**: Contains Android-specific files.
- **assets**: Resources and assets used in the app.
- **components**: React Native components used throughout the app.
- **constants**: Constants used in the project.
- **ios**: iOS-specific files.
- **models**: Data models and structures used in the app.
- **screens**: React Native screens that make up the user interface.
- **util**: Utility functions and modules.

## Installation

To get started with MIOTGC on your local development environment, follow these steps:

1. Clone the repository to your machine:

   ```bash
   git clone https://github.com/briantyutyunik/miotgc-frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd miotgc-frontend
   ```

3. Install project dependencies using either npm or yarn:

   ```bash
   npm install
   # OR
   yarn install
   ```

4. Set up Firebase and obtain the necessary API keys and configuration files as described in `firebase.js`.

5. Configure the necessary environment variables (API keys, etc.) as needed.

## Usage

### Running the App

You can run the MIOTGC app in several ways:

- **Expo Go**: Use the Expo Go app on your mobile device. Scan the QR code generated by Expo after running the following command:

  ```bash
  npx expo start
  ```

- **XCode**: If you have a macOS device, you can simulate the app using XCode for iOS. Follow the instructions for iOS simulation in the Expo documentation.

### Features

MIOTGC currently offers the following features:

- Customized itinerary generation using GPT-3.5 API.
- Ability to invite other users to your trips.
- Option of creating several AI generated trips.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.