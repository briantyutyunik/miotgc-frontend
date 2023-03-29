import * as ImagePicker from "expo-image-picker";

export async function pickImageFromLibrary() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All, // We can
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1, // 0 means compress for small size, 1 means
  });

  return result;
}

// const [status, requestPermission] = ImagePicker.useCameraPermissions();
export async function pickImageFromCamera() {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    // change to better ui
    alert("You've refused to allow this app to access your photos!");
  } else {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // 0 means compress for small size, 1 means
    });

    console.log(result);

    return result;
  }
}

export async function getBlobFromUri(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
}
