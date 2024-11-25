import Candidate from '../interfaces/Candidate.interface';
import { useEffect, useState } from 'react';

const SavedCandidates: React.FC = () => {
    // Retrieve initial candidates from localStorage
    const [candidates, setCandidates] = useState<Candidate[]>([]);
  
    useEffect(() => {
      const savedCandidates = JSON.parse(localStorage.getItem('Candidates') || '[]');
      setCandidates(savedCandidates);
    }, []);
  
    // Function to remove a candidate
    const handleRemoveCandidate = (login: string) => {
      const updatedCandidates = candidates.filter((candidate) => candidate.login !== login);
      setCandidates(updatedCandidates);
      localStorage.setItem('Candidates', JSON.stringify(updatedCandidates)); // Update localStorage
    };

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
  {candidates.length > 0 ? (
    candidates.map((candidate: Candidate) => (
      <tr key={candidate.login}>
        <td>
          <img
            className="avatar"
            src={candidate.avatar_url}
            alt="avatar"
            style={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </td>
        <td>{candidate.login}</td>
        <td>{candidate.name || 'N/A'}</td>
        <td>{candidate.email || 'N/A'}</td>
        <td>{candidate.company || 'N/A'}</td>
        <td>{candidate.location || 'N/A'}</td>
        <td>{candidate.bio || 'N/A'}</td>
        <td>
                  <button
                    onClick={() => handleRemoveCandidate(candidate.login)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7}>No saved candidates found.</td>
    </tr>
  )}
</tbody>
</table>
    </div>
  );
};

export default SavedCandidates;
