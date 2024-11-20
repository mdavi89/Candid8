// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string,
    avatar_url: string,
    name: string,
    email: string,
    company: string,
    location: string,
    bio: string,
}

export default Candidate;
