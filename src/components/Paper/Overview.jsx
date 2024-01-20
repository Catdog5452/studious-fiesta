// dependencies
import PropTypes from "prop-types";

export default function Overview({ paper }) {
  return (
    <div>
      <h1>Overview</h1>
      <p>Overview</p>
    </div>
  );
}

Overview.propTypes = {
  paper: PropTypes.object.isRequired,
};
