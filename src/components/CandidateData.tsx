import Candidate from "../interfaces/Candidate.interface";
// candidatesData.ts
let candidateData: Candidate[] = [];

export const getCandidateData = () => candidateData;

export const setCandidateData = (data: Candidate[]) => {
candidateData = data;
};
