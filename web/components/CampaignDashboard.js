import React from "react";
import Campaign from "./Campaign";
import CampaignAction from "./CampaignAction";
import { getCurrentTime } from "../utils";

const styles = {
  header: {
    fontSize: "16px",
    marginBottom: "20px"
  },
  campaignList: {
    padding: "0",
    margin: "0",
    border: "1px solid #cfcfcf"
  },
  campaignListItems: {
    padding: "10px",
    borderBottom: "1px solid #cfcfcf",
    backgroundColor: "#efefef"
  }
};

class CampaignDashboard extends React.PureComponent {
  state = {
    selectedCampaignId: null
  };
  createCampaign = () => {
    this.props.createCampaign("test campaign", "ashutosh", getCurrentTime());
    this.setState({ selectedCampaignId: null });
  };

  renderCampaignList = () => {
    const {
      campaignList,
      pauseCampaign,
      renameCampaign,
      addComment,
      deleteCampaign
    } = this.props;
    const campainIds = Object.keys(campaignList);
    return (
      <ul className="container" style={styles.campaignList}>
        {campainIds.map(item => {
          return (
            <li className="row" id={item} style={styles.campaignListItems}>
              <Campaign
                key={item}
                id={item}
                details={campaignList[item]}
                pauseCampaign={pauseCampaign}
                renameCampaign={renameCampaign}
                commentOnCampaign={addComment}
                removeCampaign={deleteCampaign}
                showCampaignHistory={this.showCampaignHistory}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  showCampaignHistory = selectedCampaignId => {
    this.setState({ selectedCampaignId: selectedCampaignId });
  };

  renderCampaignHistory = () => {
    const { selectedCampaignId } = this.state;
    if (!this.props.campaignList[selectedCampaignId]) {
      this.setState({ selectedCampaignId: null });
      return null;
    }
    if (selectedCampaignId) {
      const selectedCampaign = this.props.campaignList[selectedCampaignId];
      const actionsCount = selectedCampaign.actionsHistory.length;
      return selectedCampaign.actionsHistory.map((item, index) => {
        const props = item;
        return (
          <CampaignAction {...props} isLastItem={actionsCount === index + 1} />
        );
      });
    }
    return null;
  };
  render() {
    return (
      <div className="container">
        <div className="row" style={styles.header}>
          <h1 className="col-lg-12">
            <div class="row">
              <span className="col-lg-4">Campaign List</span>
              <span className="col-lg-8">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.createCampaign}
                >
                  <i className="fas fa-plus" />
                  Create New
                </button>
              </span>
            </div>
          </h1>
        </div>
        <div className="row">
          <div className="col-lg-8">{this.renderCampaignList()}</div>
          <div className="col-lg-4">{this.renderCampaignHistory()}</div>
        </div>
      </div>
    );
  }
}

export default CampaignDashboard;
