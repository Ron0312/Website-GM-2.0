import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

const DeliveryMap = () => {
    // Coordinates calculated based on Aspect Ratio 1.14 (N:55.05, S:52.80, W:8.20, E:12.50)
    const cities = [
        { name: 'Flensburg', x: 268.8, y: 94.0, align: 'start' },
        { name: 'Kiel', x: 367.5, y: 204.4, align: 'start' },
        { name: 'Elmshorn', x: 300.3, y: 340.9, align: 'end' }, // Left of Hamburg
        { name: 'Hamburg', x: 349.0, y: 389.7, align: 'start' },
        { name: 'Lüneburg', x: 408.8, y: 462.9, align: 'start' },
        { name: 'Lübeck', x: 448.2, y: 314.3, align: 'start' },
        { name: 'Schwerin', x: 550.4, y: 369.5, align: 'start' },
        { name: 'Rostock', x: 655.2, y: 260.4, align: 'start' },
    ];

    // Traced path from original map image
    const pathMap = `M 452.1 390.5 L 404.8 391.3 L 404.0 392.1 L 355.1 392.1 L 354.3 392.9 L 286.2 392.9 L 293.4 401.8 L 301.5 415.4 L 306.3 420.2 L 315.1 424.2 L 319.1 425.0 L 323.9 424.2 L 324.7 427.4 L 392.0 426.6 L 392.8 425.8 L 395.2 426.6 L 396.0 425.8 L 415.2 425.8 L 416.0 422.6 L 423.2 423.4 L 429.6 421.0 L 438.5 413.0 L 449.7 396.1 Z M 186.9 387.3 L 186.9 389.7 L 188.5 391.3 L 188.5 397.7 L 189.3 398.5 L 190.9 405.0 L 194.9 408.2 L 201.3 410.6 L 205.3 410.6 L 206.1 411.4 L 210.1 411.4 L 210.9 412.2 L 215.7 412.2 L 216.5 413.0 L 222.1 413.0 L 222.9 413.8 L 239.0 414.6 L 239.8 415.4 L 249.4 415.4 L 250.2 416.2 L 279.0 417.0 L 280.6 415.4 L 280.6 413.0 L 281.4 411.4 L 278.2 409.0 L 276.6 405.8 L 276.6 403.4 L 277.4 401.8 L 273.4 398.5 L 271.8 394.5 L 272.6 392.9 L 274.2 392.9 L 271.0 392.9 L 270.2 392.1 L 242.2 392.1 L 241.4 391.3 L 209.3 390.5 L 208.5 389.7 L 199.7 389.7 L 198.9 388.9 L 194.1 388.9 L 193.3 388.1 Z M 547.4 383.3 L 545.8 382.5 L 545.0 383.3 L 537.0 384.1 L 536.2 384.9 L 522.6 385.7 L 521.8 386.5 L 513.0 386.5 L 512.2 387.3 L 491.3 388.1 L 490.5 388.9 L 476.9 388.9 L 476.1 389.7 L 464.1 389.7 L 464.1 390.5 L 464.9 389.7 L 466.5 391.3 L 465.7 392.1 L 465.7 393.7 L 464.1 396.9 L 460.9 399.3 L 461.7 400.9 L 461.7 403.4 L 456.9 409.0 L 456.9 409.8 L 458.5 410.6 L 458.5 413.0 L 459.3 413.8 L 470.5 413.8 L 471.3 413.0 L 482.5 413.0 L 483.3 412.2 L 499.3 411.4 L 500.1 410.6 L 517.0 409.0 L 517.8 408.2 L 521.8 408.2 L 522.6 407.4 L 526.6 407.4 L 527.4 406.6 L 530.6 406.6 L 531.4 405.8 L 537.0 405.0 L 540.2 403.4 L 544.2 399.3 L 544.2 397.7 L 545.8 395.3 Z M 241.4 237.5 L 247.0 279.2 L 253.4 284.8 L 257.4 296.8 L 264.6 303.2 L 289.4 304.8 L 470.5 302.4 L 479.3 292.8 L 492.9 239.1 L 488.9 234.3 L 440.9 235.9 L 436.1 239.1 L 414.4 239.1 L 416.0 235.1 L 429.6 234.3 L 395.2 232.7 L 320.7 235.1 L 319.1 226.3 L 436.1 226.3 L 251.0 225.5 L 246.2 226.3 Z M 706.9 144.6 L 674.0 167.8 L 596.3 162.2 L 585.1 85.3 L 539.4 56.4 L 563.4 74.9 L 568.2 172.6 L 545.8 177.4 L 543.4 201.5 L 515.4 200.7 L 544.2 201.5 L 550.6 262.3 L 454.5 321.6 L 253.4 322.4 L 201.3 302.4 L 255.0 334.5 L 456.9 337.7 L 283.0 347.3 L 304.7 376.1 L 435.3 374.5 L 457.7 342.5 L 539.4 304.0 L 548.2 332.0 L 492.9 336.9 L 475.3 377.7 L 539.4 372.1 L 550.6 345.7 L 548.2 456.2 L 476.1 455.4 L 470.5 430.6 L 459.3 449.8 L 416.0 453.8 L 414.4 433.8 L 278.2 452.2 L 270.2 435.4 L 261.4 459.4 L 201.3 457.0 L 182.9 425.0 L 126.8 425.0 L 182.1 422.6 L 180.5 389.7 L 95.5 430.6 L 121.2 445.8 L 99.6 457.8 L 134.8 445.0 L 111.6 469.1 L 142.0 466.6 L 102.0 478.7 L 144.4 481.1 L 130.0 487.5 L 140.4 509.1 L 158.8 499.5 L 138.0 493.1 L 166.9 493.1 L 158.0 509.1 L 177.3 492.3 L 172.5 505.1 L 209.3 503.5 L 202.1 516.3 L 235.0 508.3 L 210.1 516.3 L 210.9 540.4 L 242.2 510.7 L 290.2 512.3 L 258.2 521.9 L 267.0 543.6 L 274.2 521.1 L 300.7 527.5 L 293.4 512.3 L 303.1 527.5 L 337.5 517.9 L 342.3 539.6 L 357.5 519.5 L 378.4 533.1 L 346.3 542.0 L 363.1 566.8 L 364.7 541.2 L 392.8 559.6 L 379.2 535.5 L 398.4 516.3 L 431.2 538.8 L 416.0 514.7 L 500.9 525.9 L 480.1 510.7 L 521.0 525.9 L 533.0 546.8 L 513.0 544.4 L 518.6 563.6 L 617.9 559.6 L 636.4 408.2 L 706.9 444.2 Z M 527.4 38.8 L 205.3 33.2 L 205.3 41.2 L 199.7 36.4 L 170.9 70.1 L 170.1 58.8 L 160.4 63.6 L 152.4 54.8 L 145.2 66.9 L 138.0 63.6 L 138.8 84.5 L 150.8 73.3 L 142.8 97.3 L 141.2 90.1 L 130.0 107.7 L 117.2 101.3 L 109.2 118.9 L 118.8 132.6 L 128.4 127.7 L 126.0 138.2 L 138.8 130.9 L 138.0 164.6 L 92.3 181.4 L 92.3 331.2 L 101.2 332.0 L 92.3 342.5 L 102.0 343.3 L 92.3 349.7 L 113.2 348.9 L 92.3 352.9 L 92.3 372.1 L 151.6 364.9 L 166.1 350.5 L 177.3 352.9 L 169.3 358.5 L 181.3 352.1 L 180.5 328.0 L 93.1 317.6 L 194.9 313.6 L 196.5 302.4 L 183.7 299.2 L 174.9 242.3 L 180.5 246.3 L 186.9 201.5 L 218.1 199.1 L 188.5 198.2 L 190.9 185.4 L 182.1 177.4 L 190.1 97.3 L 178.1 89.3 L 190.9 92.5 L 192.5 69.3 L 184.5 70.1 L 201.3 55.6 L 200.5 147.0 L 214.9 174.2 L 460.9 171.8 L 478.5 180.6 L 480.9 171.8 L 517.0 171.0 L 483.3 134.2 L 501.8 143.8 L 517.8 118.9 L 529.0 148.6 L 520.2 167.8 L 529.0 160.6 Z`;

    return (
        <div className="py-20 bg-gray-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-gray-800"></div>
            <div className="max-w-7xl mx-auto px-4 lg:flex items-center relative z-10">
                <div className="lg:w-1/2 pr-12">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded mb-6">
                        <MapPin size={14} className="text-green-400"/>
                        <span className="text-xs font-bold uppercase tracking-widest">Liefergebiet</span>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-6">Zu Hause im Norden.</h2>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        Von der Nordsee bis zur Ostsee, von Hamburg bis zur dänischen Grenze. Wir liefern Energie dorthin, wo Sie sie brauchen.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {['Schleswig-Holstein', 'Hamburg', 'Niedersachsen (Nord)', 'Mecklenburg'].map((region, i) => (
                            <div key={i} className="flex items-center space-x-3 p-3 rounded bg-white/5 border border-white/10">
                                <CheckCircle size={18} className="text-gas-light"/>
                                <span className="font-medium text-sm">{region}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex items-center justify-center p-4 lg:p-0">
                    <svg viewBox="0 0 800 600" className="w-full h-auto drop-shadow-2xl max-w-md lg:max-w-full">
                        <g stroke="white" strokeWidth="0.5" strokeLinejoin="round" fill="#005b9f" fillOpacity="0.8">
                            <path d={pathMap} />
                        </g>

                        {/* Cities */}
                        {cities.map((city, index) => (
                            <g key={index} transform={`translate(${city.x}, ${city.y})`}>
                                <circle cx="0" cy="0" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5">
                                    <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite"/>
                                </circle>
                                <text
                                    x={city.align === 'start' ? 12 : city.align === 'end' ? -12 : 0}
                                    y={5}
                                    fontSize="14"
                                    fill="white"
                                    fontWeight="bold"
                                    textAnchor={city.align}
                                    style={{textShadow: '0 2px 4px rgba(0,0,0,0.9)', pointerEvents: 'none'}}
                                >
                                    {city.name}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMap;
