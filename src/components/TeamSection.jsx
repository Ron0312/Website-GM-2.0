import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamSection = () => (
    <div className="py-24 bg-white">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto px-4 text-center mb-16"
        >
            <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-4">Unser Team</h2>
            <h3 className="text-3xl font-extrabold text-text">Gesichter hinter der Energie</h3>
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {[
                { name: "Anja Möller", role: "Gründerin & Inhaberin", img: "/images/team/anja.jpg" },
                { name: "Thomas Möller", role: "Geschäftsführung & Sachkundiger", img: "/images/team/thomas-moeller-lkw.webp", phone: "+49 176 416 84 326" },
                { name: "Hans Christian Möller", role: "Logistik & Büro", img: "/images/team/hans.jpg", phone: "+49 1525 1771994" }
            ].map((member, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg bg-gray-200 w-full max-w-sm"
                >
                    <img
                        src={member.img}
                        alt={member.name}
                        width="300" height="400"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}}
                    />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 text-gray-500 hidden gap-2">
                         <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <h4 className="text-white font-bold text-lg">{member.name}</h4>
                        <p className="text-gas-light text-sm mb-2">{member.role}</p>
                        {member.phone && (
                            <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="flex items-center text-white/90 hover:text-white transition-colors text-sm font-semibold mt-1">
                                <Phone size={14} className="mr-2" /> {member.phone}
                            </a>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

export default TeamSection;
