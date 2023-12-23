export const handleApiError = (error) => {
  let message;

  if (error.response) {
    if (
      error.response.status === 409 ||
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 403 ||
      error.response.status === 500
    ) {
      // Use optional chaining to access error.response.data.message safely
      message = error.response.data?.message || "Unknown error";
    } else if (error.response.status === 401) {
      message = "Unauthorized. Please log in.";
    } else {
      message = "Something went wrong with the API request.";
    }
  } else if (error.request) {
    message = "No response received from the server.";
  } else {
    message = "An error occurred while processing the request.";
  }

  return message;
};
