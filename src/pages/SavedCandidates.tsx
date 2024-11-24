import { getCandidateData } from '../components/CandidateData';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const candidates = getCandidateData();

  return (
    <div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Avatar</th>
      <th scope="col">Login</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Company</th>
      <th scope="col">Location</th>
      <th scope="col">Bio</th>
    </tr>
  </thead>
  <tbody>
  {candidates.map((candidate: Candidate) => (
    <tr key={candidate.login}>
      <td>
        <img className="avatar" src={candidate.avatar_url} alt="avatar"style={{
      width: 50, // Set max width
      height: 50, // Set max height
      objectFit: 'cover', // Ensures the image fits the area
      borderRadius: '50%', // Makes it circular
    }} />
      </td>
      <td>{candidate.login}</td>
      <td>{candidate.name}</td>
      <td>{candidate.email}</td>
      <td>{candidate.company}</td>
      <td>{candidate.location}</td>
      <td>{candidate.bio}</td>
    </tr>
  ))}
  </tbody>
</table>
    </div>
  );
};

export default SavedCandidates;
