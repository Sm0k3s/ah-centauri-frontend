import {api} from '../services/Api';
import {
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  PROFILE_LOADING_PROGRESS,
  UPDATE_MY_PROFILE_ERROR,
  UPDATE_MY_PROFILE_SUCCESS,
} from './types';
import {loadingMessage} from './authActions';
import getResponseErrors from '../utils/errorMessage';

export function successMessage(responseData, type = GET_MY_PROFILE_SUCCESS) {
  return { type, payload: responseData };
}

export function failureMessage(error, type = GET_MY_PROFILE_ERROR) {
  return { type, payload: error };
}


export const getMyProfileAction = () => (dispatch, getState) => {
  dispatch(loadingMessage(PROFILE_LOADING_PROGRESS));
  return api.profile.getMyProfile()
    .then((response) => {
      dispatch(successMessage(response.data));
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage(responseErrorsObject));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when fetching your profile.' }));
      }
    });
};

export const updateMyProfileAction = profileFormData => (dispatch) => {
  dispatch(loadingMessage(PROFILE_LOADING_PROGRESS));
  return api.profile.updateMyProfile(profileFormData)
    .then((response) => {
      dispatch(successMessage(response.data, UPDATE_MY_PROFILE_SUCCESS));
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage(responseErrorsObject, UPDATE_MY_PROFILE_ERROR));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when updating your profile.' }, UPDATE_MY_PROFILE_ERROR));
      }
    });
};
