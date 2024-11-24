import { getCandidateData } from '../components/CandidateData';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const candidates = getCandidateData();

  return (
    <div>
      <h1>Candidate List</h1>
      <ul>
        {candidates.map((candidate: Candidate) => (
          <li key={candidate.login}>
            {candidate.name || candidate.login} ({candidate.location || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
