export interface DemoRequestData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  city: string;
  state: string;
}

export const sendDemoRequest = async (data: DemoRequestData) => {
  // TODO: Replace with your actual email sending logic or API call
  console.log("Internal email notification triggered:", data);
  
  // Example fetch call (uncomment and update URL when ready):
  /*
  try {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to send email notification", error);
  }
  */
};
