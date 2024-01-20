// dependencies
import PropTypes from "prop-types";

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
