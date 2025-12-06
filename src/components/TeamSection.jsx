import React from 'react';

const TeamSection = () => (
    <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-4">Unser Team</h2>
            <h3 className="text-3xl font-extrabold text-text">Gesichter hinter der Energie</h3>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {[
                { name: "Thomas Möller", role: "Geschäftsführung", img: "/images/team/thomas.jpg" },
                { name: "Hans Christian Möller", role: "Buchhaltung", img: "/images/team/hans.jpg" }
            ].map((member, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg bg-gray-200 w-full max-w-sm">
                    {/* Using div as placeholder if image fails or using the external one if needed, but I should use local.
                        I'll assume images are in /public/images/team/ for now.
                        Since I cannot download external images easily to public folder, I'll use a placeholder div if img fails.
                     */}
                    <img
                        src={member.img}
                        alt={member.name}
                        width="300" height="400"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} // Hide img and show fallback
                    />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 text-gray-500 hidden gap-2">
                         <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
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
