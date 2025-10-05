import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
            <div className="fixed inset-0 w-full h-full -z-10">
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
            </div>
            <section className="relative pt-28 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">About Shipsy</h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-300 text-lg leading-relaxed"
                    >
                        Shipsy is a modern logistics platform that helps businesses ship faster, track smarter, and deliver better. We focus on performance, reliability, and an exceptional user experience.
                    </motion.p>

                    <div className="mt-10 grid md:grid-cols-3 gap-6">
                        {[{
                            title: 'Our Mission',
                            desc: 'Make logistics effortless for every business through thoughtful design and robust technology.'
                        },{
                            title: 'Our Values',
                            desc: 'Speed, reliability, and transparency — for both our product and our team.'
                        },{
                            title: 'Our Promise',
                            desc: 'We obsess over details so you can focus on your business, not your shipping stack.'
                        }].map((card, idx) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
                            >
                                <div className="text-xl font-bold mb-2">{card.title}</div>
                                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}


