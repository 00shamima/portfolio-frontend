import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, User } from "lucide-react";
import apiService from "../api/apiService"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await apiService.post('/contact', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (response.status === 201 || response.status === 200) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-[#1A1423]">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Get In <span className="text-[#FF00FF]">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM SECTION */}
          <motion.form 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="relative">
              <User className="absolute left-3 top-4 text-[#FF00FF]" size={18} />
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#2A2130] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-[#FF00FF]"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-4 text-[#FF00FF]" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#2A2130] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-[#FF00FF]"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your Message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-[#2A2130] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-[#FF00FF]"
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 rounded-lg font-bold bg-[#FF00FF] text-[#1A1423] hover:opacity-90 transition-all flex justify-center items-center gap-2"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>

            {status === "success" && (
              <p className="text-[#FF00FF] text-center font-bold">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center">Failed to send. Try again.</p>
            )}
          </motion.form>

          {/* INFO SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-lg bg-[#2A2130] flex items-center gap-4 border border-gray-800 hover:border-[#FF00FF]/50 transition-colors">
              <Mail className="text-[#FF00FF]" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-white font-semibold">shamima2802@gmail.com</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#2A2130] flex items-center gap-4 border border-gray-800 hover:border-[#FF00FF]/50 transition-colors">
              <MapPin className="text-[#FF00FF]" />
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-white font-semibold">Erode, Tamil Nadu</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;