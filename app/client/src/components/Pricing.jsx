import React from 'react';
import { motion } from 'framer-motion';

export default function Pricing() {
    const tiers = [
        { name: 'Starter', price: '$0', features: ['Up to 50 shipments/mo', 'Basic tracking', 'Email support'] },
        { name: 'Pro', price: '$49', features: ['Up to 5k shipments/mo', 'Real-time tracking', 'Priority support'] },
        { name: 'Enterprise', price: 'Contact', features: ['Unlimited shipments', 'Custom SLAs', 'Dedicated manager'] },
    ];
    return (
        <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
            <div className="fixed inset-0 w-full h-full -z-10">
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
            </div>
            <section className="relative pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Pricing</h1>
                    <p className="mt-4 text-gray-400 text-lg">Simple plans that grow with you</p>
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        {tiers.map((t, idx) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
                            >
                                <div className="text-2xl font-bold mb-2">{t.name}</div>
                                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">{t.price}</div>
                                <ul className="text-gray-300 space-y-2 mb-6 text-left">
                                    {t.features.map((f) => (<li key={f}>• {f}</li>))}
                                </ul>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl font-bold">Choose</button>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-16 max-w-3xl mx-auto text-gray-300"
                    >
                        <p>
                            All plans include secure authentication, responsive support, and access to our shipment analytics.
                            Upgrade or downgrade anytime. Enterprise plans come with custom SLAs, SSO integration, and a dedicated manager.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}


