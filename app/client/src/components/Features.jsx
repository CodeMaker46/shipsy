import React from 'react';
import { motion } from 'framer-motion';

export default function Features() {
    return (
        <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
            <div className="fixed inset-0 w-full h-full -z-10">
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
            </div>

            <section className="relative pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Features</h1>
                        <p className="mt-4 text-gray-400 text-lg">Everything you need to scale your logistics</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Lightning Fast", desc: "Create, price, and dispatch shipments in under a minute with streamlined forms and smart defaults." },
                            { title: "Real-time Tracking", desc: "Every milestone is recorded instantly. Share secure tracking links with customers and teammates." },
                            { title: "Secure & Safe", desc: "Enterprise-grade authentication, encrypted data at rest and in transit, and granular access controls." },
                            { title: "Best Rates", desc: "Automatic carrier negotiation and dynamic rate selection saves an average of 30–40% per shipment." },
                            { title: "Smart Assistant", desc: "Ask natural-language questions like ‘show delayed orders in NY today’ and get answers, not reports." },
                            { title: "Analytics", desc: "Actionable dashboards for cost per kg, on-time percentage, exceptions, and SLA adherence." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
                            >
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-6">
                        {[
                            {
                                heading: "Create",
                                body: "Start with a clear, minimal form. Defaults are pre-filled from your last shipment and business rules to reduce friction.",
                            },
                            {
                                heading: "Track",
                                body: "Automatic event ingestion from carriers updates your timeline in real time. Subscribers receive non-intrusive updates.",
                            },
                            {
                                heading: "Learn",
                                body: "Post-shipment analytics highlight anomalies, surface savings opportunities, and recommend process fixes.",
                            },
                        ].map((step, idx) => (
                            <motion.div
                                key={step.heading}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                                className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
                            >
                                <div className="text-sm uppercase tracking-wide text-blue-300/90 mb-2">Step {idx + 1}</div>
                                <div className="text-xl font-semibold mb-2">{step.heading}</div>
                                <p className="text-gray-400 leading-relaxed">{step.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}


