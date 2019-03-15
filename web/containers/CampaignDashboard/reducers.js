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

import { generateUID } from "../../utils";

const initialState = {
  campaignList: {},
  success: false,
  error: null,
  isFetching: false
};

const createNewCampaign = (type, campaignData) => {
  const campaignId = generateUID();
  const campaignAction = {
    type,
    actionBy: campaignData.createdBy,
    actionDesc: "Campaign Created",
    actionText: ""
  };
  const campaign = {
    name: campaignData.name,
    createdBy: campaignData.createdBy,
    createdOn: campaignData.createdOn,
    actionsHistory: []
  };
  campaign.actionsHistory.push(campaignAction);
  return { [campaignId]: campaign };
};

const getUpdateCampaign = (type, campaignData, targetCampaign) => {
  let actionDesc = "";
  let actionText = "";
  switch (type) {
    case RENAME_CAMPAIGN:
      actionDesc = "Campaign Renamed";
      actionText = `from ${targetCampaign.name} to ${campaignData.name}`;
      targetCampaign.name = campaignData.name;
      break;
    case COMMENT_CAMPAIGN:
      actionDesc = "Comment Added";
      actionText = campaignData.comment;
      break;
    case PAUSE_CAMPAIGN:
      actionDesc = "Campaign Paused";
      break;
    default:
      break;
  }
  const campaignAction = {
    type,
    actionBy: campaignData.actionBy,
    actionDesc,
    actionText
  };
  targetCampaign.actionsHistory.push(campaignAction);
  return { [campaignData.campaignId]: targetCampaign };
};

export default function appReducer(
  state = initialState,
  { type, isFetching, result, error, campaignData }
) {
  switch (type) {
    case FETCH_CAMPAIGN_LIST:
      return { ...state, isFetching: isFetching };
    case FETCH_CAMPAIGN_LIST_SUCCESS:
      return { ...state, campaignList: result.data.campaigns, success: true };
    case FETCH_CAMPAIGN_LIST_ERROR:
      return { ...state, campaignList: {}, success: false, error: error };
    case CREATE_CAMPAIGN:
      const campaign = createNewCampaign(type, campaignData);
      return { ...state, campaignList: { ...campaign, ...state.campaignList } };
    case RENAME_CAMPAIGN:
    case COMMENT_CAMPAIGN:
    case PAUSE_CAMPAIGN:
      const campaignToUpdate = Object.assign(
        {},
        state.campaignList[campaignData.campaignId]
      );
      const updatedCampaign = getUpdateCampaign(
        type,
        campaignData,
        campaignToUpdate
      );
      return {
        ...state,
        campaignList: { ...state.campaignList, ...updatedCampaign }
      };
    case REMOVE_CAMPAIGN:
      const campaignList = Object.assign({}, state.campaignList);
      delete campaignList[campaignData.campaignId];
      return {
        ...state,
        campaignList
      };
    default:
      return state;
  }
}
