// dependencies
import PropTypes from "prop-types";

/* TODO: Add a paper overview page. I want it to include: paper name, 
code, year, semester, department, and description. I want there to be 
a toggle button where I can toggle edit mode, then either save or 
cancel changes. I'm still undecided if you should be able to change
 the code, year, and semester given the PK relies on those */
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
