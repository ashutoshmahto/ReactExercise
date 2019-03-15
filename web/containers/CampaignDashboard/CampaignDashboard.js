import React from "react";
import { connect } from "react-redux";
import CampaignDashboardComponent from "../../components/CampaignDashboard";
import {
  fetchCampaignsData,
  addCampaignToList,
  updateCampaignInList,
  removeCampaignFromList
} from "./actions";

export class CampaignDashboard extends React.Component {
  componentWillMount() {
    this.props.fetchCampaignList();
  }

  render() {
    return (
      <section id="campaignListWrapper">
        <CampaignDashboardComponent {...this.props} />
      </section>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    campaignList: state.campaignList
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchCampaignList: () => {
      dispatch(fetchCampaignsData());
    },
    createCampaign: (name, createdBy, createdOn) => {
      dispatch(addCampaignToList({ name, createdBy, createdOn }));
    },
    renameCampaign: (campaignId, name, actionBy) => {
      dispatch(
        updateCampaignInList({ type: "Rename", campaignId, actionBy, name })
      );
    },
    pauseCampaign: (campaignId, actionBy) => {
      dispatch(updateCampaignInList({ type: "Pause", campaignId, actionBy }));
    },
    addComment: (campaignId, actionBy, comment) => {
      dispatch(
        updateCampaignInList({ type: "Comment", campaignId, actionBy, comment })
      );
    },
    deleteCampaign: campaignId => {
      dispatch(removeCampaignFromList({ campaignId }));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDashboard);
