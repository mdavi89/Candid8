//import { useState, useEffect } from 'react';
import { searchGithub} from '../api/API';

const CandidateSearch = () => {
  const selectUser = searchGithub()
  console.log(selectUser);
  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
