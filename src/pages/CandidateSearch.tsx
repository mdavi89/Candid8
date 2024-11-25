import React, { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API';
import { setCandidateData } from '../components/CandidateData';

  const CandidateSearch: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const fetchCandidates = async () => {
        try {
          const users = await searchGithub();
          const fetchedCandidates: Candidate[] = await Promise.all(
            users.map((user) => searchGithubUser(user.login))
          );
  
          setCandidates(fetchedCandidates); // Update local state// Update global data
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
  
      fetchCandidates();
    }, []);

  const handleAddCandidate = () => {
    const candidate = candidates[currentIndex];
    // Avoid duplicates in the selected list
    if (!selectedCandidates.some((c) => c.login === candidate.login)) {
      setSelectedCandidates((prev) => [...prev, candidate]);
      setCandidateData([...selectedCandidates, candidate])
    }
    localStorage.setItem('Candidates', JSON.stringify(selectedCandidates));
    handleNextCandidate();
    
  };

  const handleNextCandidate = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < candidates.length - 1 ? prevIndex + 1 : 0
    );
  };

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
    </div>
  );
};

export default CandidateSearch;



