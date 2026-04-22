// Primary email where demo requests are received
const BUSINESS_EMAIL = "mitraj.g@mvclouds.com";
const CC_EMAIL = "rachit.s@mvclouds.com";

export const sendDemoRequest = async (formData: {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  city?: string;
  state?: string;
}): Promise<boolean> => {
  try {
    const formSubmitUrl = `https://formsubmit.co/${BUSINESS_EMAIL}`;

    const data = new FormData();

    data.append("name", `${formData.first_name} ${formData.last_name}`);
    data.append("email", formData.email);
    data.append("company", formData.company);
    data.append("city", formData.city || "Not provided");
    data.append("state", formData.state || "Not provided");

    // FormSubmit settings
    data.append("_captcha", "false");
    data.append("_template", "table");
    data.append(
      "_subject",
      `WBConnect+ Demo Request from ${formData.first_name} ${formData.last_name}`
    );
    // Second recipient via CC
    data.append("_cc", CC_EMAIL);

    const response = await fetch(formSubmitUrl, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      console.log("Email sent successfully via FormSubmit");
      return true;
    } else {
      console.error("FormSubmit error:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
