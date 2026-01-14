import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = ({ consumption, factorSource, factors }) => {
    // 10 Year Forecast
    // Assumption: 3% inflation per year for all fuels
    const INFLATION = 0.03;
    const YEARS = 10;

    const labels = Array.from({ length: YEARS }, (_, i) => `Jahr ${i + 1}`);

    // Initial Annual Costs
    const costSource = consumption * factorSource.price;
    const lpgLiters = (consumption * factorSource.kwh) / factors.lpg.kwh;
    const costLPG = lpgLiters * factors.lpg.price;

    // Generate Data
    const dataPointsSource = [];
    const dataPointsLPG = [];
    let cumulativeSource = 0;
    let cumulativeLPG = 0;

    for (let i = 0; i < YEARS; i++) {
        const inflationFactor = Math.pow(1 + INFLATION, i);
        cumulativeSource += costSource * inflationFactor;
        cumulativeLPG += costLPG * inflationFactor;

        dataPointsSource.push(cumulativeSource);
        dataPointsLPG.push(cumulativeLPG);
    }

    const data = {
        labels,
        datasets: [
            {
                label: `Kumulierte Kosten (${factorSource.label === 'Liter' && factors.lpg.kwh !== factorSource.kwh ? 'Heizöl' : 'Aktuell'})`,
                data: dataPointsSource,
                borderColor: 'rgb(239, 68, 68)', // Red
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                fill: false,
            },
            {
                label: 'Kumulierte Kosten (Flüssiggas)',
                data: dataPointsLPG,
                borderColor: 'rgb(34, 197, 94)', // Green
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.3,
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                }
            },
            title: {
                display: true,
                text: '10-Jahres Kosten-Prognose (inkl. 3% Inflation)',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumSignificantDigits: 3 }).format(value);
                    }
                },
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-100">
             <div className="h-[300px] w-full">
                <Line options={options} data={data} />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
                *Prognose basierend auf einer angenommenen jährlichen Inflation von 3%. Tatsächliche Entwicklung kann abweichen.
            </p>
        </div>
    );
};

export default PriceChart;
