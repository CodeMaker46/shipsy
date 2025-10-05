import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/config';

const ShipsyLanding = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUsername("");
        setPassword("");
        setIsSubmitting(false);
    };

    const handleToggleMode = (loginMode) => {
        setIsLogin(loginMode);
        setUsername("");
        setPassword("");
        setIsSubmitting(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const url = isLogin ? '/auth/login' : '/auth/signup';
        try {
            const response = await api.post(url, { username, password });
            const data = response.data;
            if (response.status === 200 || response.status === 201) {
                if (isLogin) {
                    localStorage.setItem('token', data.token);
                    toast.success('Login successful!');
                    navigate('/dashboard');
                } else {
                    toast.success('Signup successful! Please login.');
                    setIsLogin(true);
                }
            } else {
                toast.error(data.message || 'An error occurred.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to connect to the server.');
        } finally {
            setIsSubmitting(false);
            if (!isLogin) {
                setUsername("");
                setPassword("");
            } else {
                handleCloseModal();
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 w-full h-full -z-10">
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
            </div>

            {/* Floating Navigation */}
            <motion.nav 
                className="fixed top-4 left-0 right-0 z-50 px-6"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-full px-8 py-4 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Shipsy</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <button onClick={() => navigate('/features')} className="hover:text-white transition-colors cursor-pointer">Features</button>
                        <button onClick={() => navigate('/pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</button>
                        <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer">About</button>
                    </div>

                    <motion.button
                        onClick={handleOpenModal}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-36 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-blue-400 font-medium">Trusted by 10,000+ businesses</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Logistics Made</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Effortless</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                                Ship faster, track smarter, deliver better. The modern logistics platform built for growth.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.button
                                    onClick={handleOpenModal}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Shipping Today
                                </motion.button>
                                <motion.button
                                    className="bg-slate-800/50 border border-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Watch Demo
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent blur-3xl"></div>
                        <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="bg-slate-800/50 px-6 py-4 flex items-center gap-2 border-b border-slate-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="flex-1 text-center text-sm text-gray-500">shipsy.app/dashboard</div>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
                                    <p className="text-gray-400">Track every shipment with precision</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Shipsy?</h2>
                        <p className="text-xl text-gray-400">Everything you need to scale your logistics</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: "⚡", title: "Lightning Fast", desc: "Ship in minutes, not hours" },
                            { icon: "📍", title: "Real-time Tracking", desc: "Know where your packages are, always" },
                            { icon: "🛡️", title: "Secure & Safe", desc: "Insurance on every shipment" },
                            { icon: "💰", title: "Best Rates", desc: "Save up to 40% on shipping costs" },
                            { icon: "🤖", title: "AI Assistant", desc: "Gemini-powered chatbot for instant help" },
                            { icon: "📊", title: "Analytics", desc: "Data-driven insights for growth" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Assistant Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                        
                        <div className="relative grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                                    <span className="text-2xl">🤖</span>
                                    <span className="text-sm text-blue-400 font-semibold">AI-POWERED</span>
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Meet Your AI
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Shipping Assistant
                                    </span>
                                </h2>
                                
                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    Powered by Gemini AI, our intelligent chatbot helps you manage shipments, track packages, and get instant answers 24/7.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Instant shipment status updates",
                                        "Smart route optimization suggestions",
                                        "Automated problem resolution",
                                        "Natural language queries"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-bold">Shipsy AI Assistant</div>
                                            <div className="text-sm text-green-400 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                Online
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                                            <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                                                <p className="text-sm text-gray-200">Hi! How can I help you today?</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 justify-end">
                                            <div className="bg-blue-600 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                                                <p className="text-sm text-white">Where is my shipment #SH12345?</p>
                                            </div>
                                            <div className="w-8 h-8 bg-slate-700 rounded-full flex-shrink-0"></div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                                            <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                                                <p className="text-sm text-gray-200">Your shipment is currently in transit and will arrive tomorrow by 2 PM. Would you like real-time updates?</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-700">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>Powered by Gemini AI</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <div className="text-6xl text-blue-400 mb-6">"</div>
                            <p className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                                Shipsy transformed our entire supply chain. We've reduced delivery times by 40% and our customers couldn't be happier.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                                <div>
                                    <div className="font-bold text-xl">Dean Kresh</div>
                                    <div className="text-gray-400">Operations Manager, TechCo</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-6">
                            Ready to Ship?
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 mb-12">
                            Join thousands of businesses shipping smarter.
                        </p>
                        <motion.button
                            onClick={handleOpenModal}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started Free
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                        <span className="text-xl font-bold">Shipsy</span>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-400">
                        <a href="https://github.com/shikshakkumar/shipsy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                    <div className="text-sm text-gray-400">
                        Created by <a href="https://github.com/shikshakkumar" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Shikshak</a>
                    </div>
                </div>
            </footer>

            {/* Login/Signup Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}></div>
                        
                        <motion.div
                            className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Join Shipsy"}</h2>
                                <p className="text-gray-400">{isLogin ? "Sign in to continue" : "Create your account"}</p>
                            </div>

                            <div className="flex bg-slate-800 rounded-xl p-1 mb-6">
                                <button
                                    onClick={() => handleToggleMode(true)}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${isLogin ? "bg-blue-500 text-white" : "text-gray-400"}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleToggleMode(false)}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${!isLogin ? "bg-blue-500 text-white" : "text-gray-400"}`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Username</label>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white disabled:opacity-50"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white disabled:opacity-50"
                                        placeholder="Enter password"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl font-bold disabled:opacity-70 flex items-center justify-center gap-2"
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    {isSubmitting && (
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {isSubmitting ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShipsyLanding;