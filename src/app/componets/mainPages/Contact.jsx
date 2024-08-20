"use client";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaHandshake,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FlipWords } from "../ui/flip-words";

const words = ["Get_in_touch", "Reach_out_to_me", "Contact_me", "Connect_me", "Message_me"];

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch(
      "https://script.google.com/macros/s/AKfycbwr8TLDmqKd2I3BIMdK06Wwll2CQKnuF_-iMDuuVap4ULzxNudkHI743nvRiWZTSwFM/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        setMessage("Message sent successfully");
        setTimeout(() => {
          setMessage("");
          form.reset();
        }, 500);
      })
      .catch((error) => console.error("Error!", error.message));
  };

  return (
    <div id="contact" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video autoPlay loop muted className="w-full h-full object-cover opacity-70">
          <source src="/bgvideocontact.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative z-10  text-white pt-8">
        <h1 className="mb-6 text-center text-4xl md:text-6xl font-bold">Contact Me</h1>
        <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
          {/* Left side - Contact information */}
          <div className="w-full md:w-2/5 px-6 md:px-0">
            <div className="mt-8 md:mt-16">
              <div className="flex items-center mb-8">
                <FaEnvelope className="text-pink-500 mr-4 text-2xl" />
                <a
                  href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                  target="_blank"
                  className="text-green-500"
                >
                  monu.k23csai@nst.rishihood.edu.in
                </a>
              </div>
              <div className="flex items-center mb-8">
                <FaPhone className="text-pink-500 mr-4 text-2xl" />
                <a
                  href="https://contacts.google.com/"
                  target="_blank"
                  className="text-green-500"
                >
                  +917541062514
                </a>
              </div>
              <div className="flex items-center mb-8">
                <FaMapMarkerAlt className="text-pink-500 mr-4 text-2xl" />
                <a
                  href="https://www.google.com/maps/place/Rishihood+University/@28.982316,77.086808,13z/data=!4m6!3m5!1s0x390db1e3451de103:0xf3b49ff0baac646f!8m2!3d28.982316!4d77.0868077!16s%2Fg%2F11clt7jnsz?hl=en&entry=ttu"
                  target="_blank"
                  className="text-green-500"
                >
                  Sonipat Haryana
                </a>
              </div>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100063260070686&mibextid=ZbWKwL"
                  target="_blank"
                  className="text-gray-500 hover:text-pink-500 text-4xl hover:-translate-y-1 transition-transform"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-pink-500 text-4xl hover:-translate-y-1 transition-transform"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/_monu_rajj_?igsh=MXRsNWk5NDF0NjhqMQ=="
                  target="_blank"
                  className="text-gray-500 hover:text-pink-500 text-4xl hover:-translate-y-1 transition-transform"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.youtube.com/@naturalactors1554"
                  target="_blank"
                  className="text-gray-500 hover:text-pink-500 text-4xl hover:-translate-y-1 transition-transform"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.linkedin.com/in/monu-rajj-insta--monu-rajj-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  className="text-gray-500 hover:text-pink-500 text-4xl hover:-translate-y-1 transition-transform"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://leetcode.com/u/monurajj"
                  target="_blank"
                  className="text-gray-500 hover:text-pink-500 text-4xl hover:-translate-y-1 transition-transform"
                >
                  <SiLeetcode />
                </a>
              </div>
              <a
                href="assets/Screenshot 2024-01-13 at 1.25.52 AM.png"
                download="Monu's CV"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg shadow-lg border border-transparent hover:border-pink-600 transition duration-300 mt-8"
              >
                Download CV
              </a>
            </div>
          </div>
          {/* Right side - Form and Get in touch */}
          <div className="w-full md:w-3/5 px-6 md:px-0">
            <div className="get-in-touch flex items-center justify-center md:justify-start mt-8 md:mt-16">
              <FaHandshake className="text-pink-500 mr-2 text-2xl" />
              <h1 className="text-pink-500 font-bold"><FlipWords words={words} />!</h1>
              <FaHandshake className="ml-2 text-pink-500 text-2xl" />
            </div>
            <form
              name="submit-to-google-sheet"
              onSubmit={handleSubmit}
              className="mt-8 w-full"
            >
              <input
                type="text"
                name="Name"
                placeholder="Your Name *"
                required
                className="mb-4 p-4 w-full bg-gray-700 text-white rounded outline-none"
              />
              <input
                type="email"
                name="Email"
                placeholder="Your Email *"
                required
                className="mb-4 p-4 w-full bg-gray-700 text-white rounded outline-none"
              />
              <textarea
                name="Message"
                rows="6"
                placeholder="Your Message *"
                className="mb-4 p-4 w-full bg-gray-700 text-white rounded outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-10 text-lg rounded-lg shadow-lg border border-transparent hover:border-pink-600 cursor-pointer transition duration-300"
              >
                Submit
              </button>
            </form>
            <span id="msg" className="block mt-4 text-center text-pink-500">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
