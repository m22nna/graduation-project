import axios from "axios";

export interface FeedbackPayload {
    fullName: string;
    email: string;
    phoneNumber: string;
    reason: string;
    timeSlot: string;
    message: string;
    comment: string;
    ratingId: number;
    userProfileId: number;
    routeId: number;
    tripStatusId: number;
}

export async function submitFeedback(payload: FeedbackPayload) {
    console.log("Submitting Feedback Payload:", payload);
    const response = await axios.post(
        "https://transguideapi.runasp.net/api/UserFeedbacks/SubmitFeedack",
        payload
    );
    console.log("Feedback API Response:", response.data);
    return response.data;
}
