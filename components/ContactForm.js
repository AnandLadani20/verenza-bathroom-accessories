"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./motion/MagneticButton";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-editorial" onSubmit={handleSubmit}>
      <div className="f-row">
        <div className="f-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" className="f-input" placeholder="Your name" required />
        </div>
        <div className="f-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="f-input" placeholder="Your phone number" required />
        </div>
      </div>
      <div className="f-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" className="f-input" placeholder="you@example.com" required />
      </div>
      <div className="f-group">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" className="f-input" placeholder="How can we help?" />
      </div>
      <div className="f-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" className="f-input" placeholder="Write your message..." required></textarea>
      </div>
      <MagneticButton type="submit" className="btn-fill" disabled={submitting}>
        <span>{submitting ? "Sending..." : "Send Message"}</span>
      </MagneticButton>
      {error && (
        <div style={{ marginTop: "22px", padding: "16px 20px", background: "rgba(200,60,60,0.1)", color: "#a83c3c", borderRadius: "var(--radius)", fontSize: "14px" }}>
          <i className="fa-solid fa-circle-exclamation"></i>&nbsp; {error}
        </div>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div
            className="inquiry-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              className="inquiry-popup"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="inquiry-popup-close"
                aria-label="Close"
                onClick={() => setSubmitted(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="inquiry-popup-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3>Your Inquiry Submitted</h3>
              <p>Thank you for reaching out. Our team has received your message and will get back to you soon.</p>
              <button type="button" className="btn-fill" onClick={() => setSubmitted(false)}>
                <span>Close</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
