import React from "react";

export default class Campaign extends React.PureComponent {
  state = {
    selectedCampaignActions: []
  };
  pauseCampaign = () => {
    this.props.pauseCampaign(this.props.id, "Ashutosh Mahto");
  };
  renameCampaign = () => {
    const campaignId = this.props.id;
    const name = "Renamed " + this.props.details.name;
    this.props.renameCampaign(campaignId, name, "Ashutosh Mahto");
  };
  commentOnCampaign = () => {
    this.props.commentOnCampaign(
      this.props.id,
      "Ashutosh Mahto",
      "Test Comment"
    );
  };
  removeCampaign = event => {
    event.stopPropagation();
    event.preventDefault();
    this.props.removeCampaign(this.props.id);
  };

  showHistory = () => {
    this.props.showCampaignHistory(this.props.id);
  };

  iconStyle = {
    backgroundColor: "#007bff",
    padding: "10px",
    borderRadius: "15px",
    color: "#fff",
    fontSize: "12px",
    lineHeight: "12px"
  };
  render() {
    return (
      <div
        className="row"
        id={"campaign_" + this.props.id}
        onClick={this.showHistory}
      >
        <div className="col-lg-8">
          <p>
            <strong>{this.props.details.name}</strong>
          </p>
          <p>Created at {this.props.details.createdOn}</p>
        </div>
        <div className="col-lg-1">
          <button type="button" className="btn" onClick={this.pauseCampaign}>
            <i className="fas fa-pause" style={this.iconStyle} />
          </button>
        </div>
        <div className="col-lg-1">
          <button type="button" className="btn" onClick={this.renameCampaign}>
            <i className="fas fa-pen" style={this.iconStyle} />
          </button>
        </div>
        <div className="col-lg-1">
          <button
            type="button"
            className="btn"
            onClick={this.commentOnCampaign}
          >
            <i className="fas fa-comment-alt" style={this.iconStyle} />
          </button>
        </div>
        <div className="col-lg-1">
          <button type="button" className="btn" onClick={this.removeCampaign}>
            <i className="fas fa-trash-alt" style={this.iconStyle} />
          </button>
        </div>
        <hr />
      </div>
    );
  }
}
