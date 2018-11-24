import UIkit from "uikit";

let configError = {
  status: "danger",
  timeout: 4000,
  pos: "top-right"
};

let configSuccess = {
  status: "success",
  timeout: 4000,
  pos: "top-right"
};

export function showSuccess({ message }) {
  UIkit.notification(message, configSuccess);
}

export function showError(error) {
  if (error.response && error.response.data.errors) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    UIkit.notification(error.response.data.errors.join(), configError);
  } else if (error.response && error.response.data.status_message) {
    UIkit.notification(error.response.data.status_message, configError);
  }

   else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    UIkit.notification(error.request, configError);
  } else {
    // Something happened in setting up the request that triggered an Error
    UIkit.notification(error.message, configError);
  }
}
