import { getData } from "../../utils";

import {
  FETCH_CAMPAIGN_LIST,
  FETCH_CAMPAIGN_LIST_SUCCESS,
  FETCH_CAMPAIGN_LIST_ERROR,
  CREATE_CAMPAIGN,
  RENAME_CAMPAIGN,
  COMMENT_CAMPAIGN,
  PAUSE_CAMPAIGN,
  REMOVE_CAMPAIGN
} from "./actionTypes";

/* Action creators */
export function fetchCampaignsData() {
  return function(dispatch) {
    dispatch(initiateRequest());
    return fetchCampaignListFromServer().then(
      result => dispatch(fetchCampaignListSuccess(result)),
      error => dispatch(fetchCampaignListError(error))
    );
  };
}

export function initiateRequest() {
  return {
    type: FETCH_CAMPAIGN_LIST,
    isFetching: true
  };
}

export function fetchCampaignListSuccess(result) {
  return {
    type: FETCH_CAMPAIGN_LIST_SUCCESS,
    result
  };
}

export function fetchCampaignListError(error) {
  return {
    type: FETCH_CAMPAIGN_LIST_ERROR,
    error
  };
}

export function addCampaignToList(campaignData) {
  return {
    type: CREATE_CAMPAIGN,
    campaignData
  };
}

export function updateCampaignInList(campaignData) {
  return {
    type: campaignData.type,
    campaignData
  };
}

export function removeCampaignFromList(campaignData) {
  return {
    type: REMOVE_CAMPAIGN,
    campaignData
  };
}

export function fetchCampaignListFromServer() {
  return getData("/data");
}
