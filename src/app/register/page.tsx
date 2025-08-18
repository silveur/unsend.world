"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", email: "" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(responseData.error);
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnter = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSubmitStatus("idle");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.landing}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <img src="/bannernew.svg" alt="Logo" className={styles.logo} />{" "}
            </Link>
          </div>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Enter your first name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.submitButton} button`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            {submitStatus === "success" && (
              <p className={styles.successMessage}>
                Thank you for registering!
              </p>
            )}

            {submitStatus === "error" && (
              <p className={styles.successMessage}>
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
