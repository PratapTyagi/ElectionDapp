import "./Body.css";
import { useState } from "react";
const Body = ({ presentCandidates, castVote, currentAccount }) => {
  const [candidate, setCandidate] = useState("");
  const candidateSelection = (e) => {
    setCandidate(e.target.value);
  };

  const selectCandidate = (e) => {
    e.preventDefault();
    if (candidate !== "0") {
      castVote(Number(candidate));
    } else window.alert("Error submitting");
  };

  return (
    <div className="body">
      <h3>Election Results</h3>
      <table className="table border">
        <thead className="thead">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Votes Count</th>
          </tr>
        </thead>
        <tbody>
          {presentCandidates.map((candidate) => (
            <tr key={candidate._id}>
              <th scope="row">{candidate._id}</th>
              <td>{candidate.name}</td>
              <td>{candidate.votesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Cast Vote</h3>
      <form onSubmit={selectCandidate}>
        <select name="candidate" onChange={candidateSelection}>
          <option value="0">Choose</option>
          {presentCandidates.map((candidate) => (
            <option key={candidate._id} value={`${candidate._id}`}>
              {candidate.name}
            </option>
          ))}
        </select>
        <button type="submit">VOTE</button>
      </form>
      <p>
        Your address: <strong>{currentAccount}</strong>
      </p>
    </div>
  );
};

export default Body;
