import React from "react";

const styles = {
  timeline: {
    minHeight: "100px",
    height: "auto",
    width: "200px",
    borderLeft: "2px solid #cfcfcf",
    position: "relative",
    marginLeft: "20px",
    paddingLeft: "20px"
  },
  timelinePointer: {
    position: "absolute",
    top: "-12px",
    left: "-12px",
    backgroundColor: "#007bff",
    padding: "5px 5px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px"
  },
  timelineText: {
    top: "-15px",
    position: "absolute"
  },
  isLast: {
    borderLeft: "0px"
  }
};
const iconType = {
  Create: "fa-plus",
  Rename: "fa-pen",
  Comment: "fa-comment-alt",
  Pause: "fa-pause",
  Remove: "fa-trash-alt"
};
const CampaignAction = props => {
  const timeLineStyle = props.isLastItem
    ? { ...styles.timeline, ...styles.isLast }
    : styles.timeline;
  return (
    <div style={timeLineStyle}>
      <i
        className={`fa ${iconType[props.type]}`}
        style={styles.timelinePointer}
      />
      <div style={styles.timelineText}>
        {`${props.actionDesc} by ${props.actionBy} ${props.actionText}`}
      </div>
    </div>
  );
};

export default CampaignAction;
