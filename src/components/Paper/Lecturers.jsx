// dependencies
import PropTypes from "prop-types";

// TODO: implement this component. Table of papers with name and email, delete option, add button, maybe a contact button to redirect to mailto:email
export default function Lecturers({ paper }) {
  return (
    <div>
      <h1>Lecturers</h1>
      {paper.lecturers.map((lecturer) => (
        <p key={lecturer.lecturerEmail}>{lecturer.lecturerName}</p>
      ))}
    </div>
  );
}

Lecturers.propTypes = {
  paper: PropTypes.object.isRequired,
};
