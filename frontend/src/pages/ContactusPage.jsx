import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const sendContactForm = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/messageSubmission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to send message');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await sendContactForm(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 pt-10 pb-20">
                {/* Header */}
                <motion.div
                    className="text-center mb-8 mt-[110px]"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl font-bold text-orange-600 pb-3">Get in Touch</h1>
                    <p className="mt-2 text-lg text-slate-600">
                        We're excited to hear from you. Fill out the form below and let's connect!
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Status Messages */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                            Thank you for your message! We will get back to you soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <motion.div
                            className="flex flex-col"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label className="text-black font-medium" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="Enter your name" />
                        </motion.div>

                        {/* Email Input */}
                        <motion.div
                            className="flex flex-col"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label className="text-black font-medium" htmlFor="email">
                                Your Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="Enter your email" />
                        </motion.div>

                        {/* Message Input */}
                        <motion.div
                            className="flex flex-col"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label className="text-black font-medium" htmlFor="message">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="Enter your message"
                            ></textarea>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-all disabled:bg-orange-300 disabled:cursor-not-allowed"
                            whileHover={{ scale: loading ? 1 : 1.05 }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    className="mt-12 text-center text-orange-700"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="mb-4 text-lg">Or connect with us through:</p>
                    <div className="flex justify-center space-x-6">
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-orange-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="mt-2 text-sm">support@website.com</span>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-orange-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="mt-2 text-sm">+1 (555) 123-4567</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUsPage;