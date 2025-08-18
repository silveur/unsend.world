"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
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
            <img src="/bannernew.svg" alt="Logo" className={styles.logo} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/subscribe">
            <button
              className={`${styles.enterButton} button`}
              onClick={handleEnter}
            >
              register
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
