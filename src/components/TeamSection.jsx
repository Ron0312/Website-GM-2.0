import React from 'react';

const TeamSection = () => (
    <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-4">Unser Team</h2>
            <h3 className="text-3xl font-extrabold text-text">Gesichter hinter der Energie</h3>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {[
                { name: "Thomas Möller", role: "Geschäftsführer", img: "/images/team/thomas.jpg" },
                { name: "Hans Christian Möller", role: "Buchhaltung", img: "/images/team/hans.jpg" }
            ].map((member, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg bg-gray-200 w-full max-w-sm">
                    {/* Using div as placeholder if image fails or using the external one if needed. */}
                    <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} // Hide img and show fallback
                    />
                     <div className="absolute inset-0 hidden items-center justify-center bg-gray-300 text-gray-500 font-bold flex-col p-4 text-center" style={{ display: 'none' }}>
                        <span className="text-4xl mb-2 text-gray-400">?</span>
                        <span>{member.name}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <h4 className="text-white font-bold text-lg">{member.name}</h4>
                        <p className="text-gas-light text-sm">{member.role}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default TeamSection;
