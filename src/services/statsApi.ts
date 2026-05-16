import axios from "axios";

export async function fetchGeneralStats() {
  const [feedbackRes, historyRes, usersRes] = await Promise.allSettled([
    axios.get("https://transguideapi.runasp.net/api/UserFeedbacks/GetFeedbacksCount"),
    axios.get("https://transguideapi.runasp.net/api/History/GetTripsCount"),
    axios.get("https://transguideapi.runasp.net/api/Auth/UsersCount"),
  ]);

  const getValue = (res: any) => (res.status === "fulfilled" ? res.value.data?.count ?? 0 : 0);

  return {
    feedback: getValue(feedbackRes),
    history: getValue(historyRes),
    users: getValue(usersRes),
  };
}
