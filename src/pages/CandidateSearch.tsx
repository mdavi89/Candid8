import React, { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const users = await searchGithub();
        const candidateData: Candidate[] = [];

        for (const user of users) {
          const userDetails = await searchGithubUser(user.login);
          candidateData.push(userDetails as Candidate);
        }

        setCandidates(candidateData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCandidates();
  }, []);

  const handleAddCandidate = () => {
    const candidate = candidates[currentIndex];
    // Avoid duplicates in the selected list
    if (!selectedCandidates.some((c) => c.login === candidate.login)) {
      setSelectedCandidates((prev) => [...prev, candidate]);
    }
    handleNextCandidate();
  };

  const handleNextCandidate = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < candidates.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (candidates.length === 0) {
    return <div>No candidates found.</div>;
  }

  const candidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className="card">
        <img
          src={candidate.avatar_url}
          className="card-img-top"
          alt={`${candidate.name || candidate.login}'s avatar`}
        />
        <div className="card-body">
          <p className="card-text">
            <strong>{candidate.name || candidate.login}</strong> <br />
            Location: {candidate.location || 'N/A'} <br />
            Email: {candidate.email || 'N/A'} <br />
            Company: {candidate.company || 'N/A'} <br />
            Bio: {candidate.bio || 'N/A'}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <button
          onClick={handleAddCandidate}
          className="btn btn-success me-2"
        >
          +
        </button>
        <button
          onClick={handleNextCandidate}
          className="btn btn-primary"
        >
          -
        </button>
      </div>
      <h2 className="mt-4">Selected Candidates</h2>
      {selectedCandidates.length > 0 ? (
        <ul>
          {selectedCandidates.map((selected) => (
            <li key={selected.login}>
              {selected.name || selected.login} ({selected.location || 'N/A'})
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates selected yet.</p>
      )}
    </div>
  );
};

export default CandidateSearch;



