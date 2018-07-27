export const ERROR_FETCHING_DATA = "ERROR_FETCHING_DATA";
export function errorFetchingData(error) {
  return {
    type: ERROR_FETCHING_DATA,
    error
  };
}

export const ERROR_SENDING_DATA = "ERROR_SENDING_DATA";
export function errorSendingData(error) {
  return {
    type: ERROR_SENDING_DATA,
    error
  };
}
