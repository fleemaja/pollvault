import axios from 'axios';
const api = 'http://localhost:5001';

export async function getPolls(category, searchQuery, sortType) {
  let params = `sort=${sortType}`;
  if (searchQuery !== '') {
    params = `sort=search&search=${searchQuery}`;
  }
  const response = await axios.get(`${api}/api/polls/${category}?${params}`)
  return response;
}

export async function getPollBySlug(slug) {
  // Only these show pages will work for now since they are hardcoded
  const response = await axios.get(`${api}/api/poll/${slug}`)
  return response;
}

export async function searchPolls(searchQuery) {
  const response = axios.get(`${api}/api/search?q=${searchQuery}`);
  return response;
}

export function deletePoll(id) {
  const response = axios.delete(`${api}/api/polls/${id}`);
  return response;
}

export const addPoll = async (poll) => {
  const response = await axios.post(`${api}/api/add`, {
    title: poll.title,
    category: poll.category,
    choices: [...poll.choices]
  })
  return response;
}

export const vote = async (pollId, choiceId) => {
  const response = await axios.post(`${api}/api/polls/${pollId}/vote`, {
    choiceId
  })
  return response;
}
