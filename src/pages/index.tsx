// pages/index.tsx
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Home: React.FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const submitCaptcha = async () => {
    if (captchaValue) {
      try {
        const response = await axios.post(
          "http://localhost:8000/test",
          {
            captcha: captchaValue,
          },
          {
            headers: {
              "Content-Type": `application/json`,
            },
          }
        );
        alert(JSON.stringify(response.data));
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form.");
      }
    } else {
      alert("Please verify that you are not a robot.");
    }
  };

  return (
    <div>
      <h1>reCAPTCHA Example</h1>
      <ReCAPTCHA
        sitekey="6LcsSiYpAAAAAFVC66NvM2g3o1aaSTBwObeQMv__"
        onChange={onCaptchaChange}
      />
      <button onClick={submitCaptcha}>Submit Form</button>
    </div>
  );
};

export default Home;
