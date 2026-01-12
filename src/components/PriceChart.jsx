import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { de } from 'date-fns/locale';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const PriceChart = () => {
  const chartData = {
    datasets: [
      {
        label: "Preis in ct. pro Liter BIS 3000 Liter",
        data: [
          { x: "2020-12-01", y: 45.9 }, { x: "2021-01-01", y: 55.14 }, { x: "2021-02-01", y: 56.44 }, { x: "2021-03-01", y: 58.71 },
          { x: "2021-04-01", y: 57.99 }, { x: "2021-05-01", y: 56.2 }, { x: "2021-06-01", y: 55.28 }, { x: "2021-07-01", y: 60.01 },
          { x: "2021-08-01", y: 62.92 }, { x: "2021-09-01", y: 64.82 }, { x: "2021-10-01", y: 68.15 }, { x: "2021-11-01", y: 80.05 },
          { x: "2021-12-01", y: 80.29 }, { x: "2022-01-01", y: 78.94 }, { x: "2022-02-01", y: 79.8 }, { x: "2022-03-01", y: 123.19 },
          { x: "2022-04-01", y: 140.37 }, { x: "2022-05-01", y: 129.45 }, { x: "2022-06-01", y: 112.48 }, { x: "2022-07-01", y: 98.85 },
          { x: "2022-08-01", y: 94.81 }, { x: "2022-09-01", y: 92.45 }, { x: "2022-10-01", y: 90.62 }, { x: "2022-11-01", y: 77.54 },
          { x: "2022-12-01", y: 74.76 }, { x: "2023-01-01", y: 74.41 }, { x: "2023-02-01", y: 75.97 }, { x: "2023-03-01", y: 75.63 },
          { x: "2023-04-01", y: 70.48 }, { x: "2023-05-01", y: 66.81 }, { x: "2023-06-01", y: 65.03 }, { x: "2023-07-01", y: 63.82 },
          { x: "2023-08-01", y: 61.32 }, { x: "2023-09-01", y: 62.09 }, { x: "2023-10-01", y: 62.38 }, { x: "2023-11-01", y: 62.5 },
          { x: "2023-12-01", y: 62.28 }, { x: "2024-01-01", y: 62.29 }, { x: "2024-02-01", y: 62.69 }, { x: "2024-03-01", y: 64.03 },
          { x: "2024-04-01", y: 70.46 }, { x: "2024-05-01", y: 70.84 }, { x: "2024-06-01", y: 70.43 }, { x: "2024-07-01", y: 70.42 },
          { x: "2024-08-01", y: 70.03 }, { x: "2024-09-01", y: 70.27 }, { x: "2024-10-01", y: 72.48 }, { x: "2024-11-01", y: 74.43 },
          { x: "2024-12-01", y: 75.88 }, { x: "2025-01-01", y: 77.1 }, { x: "2025-02-01", y: 79.57 }, { x: "2025-03-01", y: 78.95 },
          { x: "2025-04-01", y: 77.07 }, { x: "2025-05-01", y: 70.15 }, { x: "2025-06-01", y: 69.52 }, { x: "2025-07-01", y: 68.92 },
          { x: "2025-08-01", y: 68.49 }, { x: "2025-09-01", y: 68.62 }, { x: "2025-10-01", y: 69.54 }, { x: "2025-11-01", y: 69.97 },
          { x: "2025-12-01", y: 71.33 }, { x: "2026-01-01", y: 72.26 }
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 5
      },
      {
        label: "Preis in ct. pro Liter ÜBER 3000 Liter",
        data: [
          { x: "2022-01-01", y: 77.29 }, { x: "2022-02-01", y: 78.29 }, { x: "2022-03-01", y: 121.76 }, { x: "2022-04-01", y: 138.2 },
          { x: "2022-05-01", y: 126.16 }, { x: "2022-06-01", y: 110.43 }, { x: "2022-07-01", y: 97.21 }, { x: "2022-08-01", y: 93.21 },
          { x: "2022-09-01", y: 91.13 }, { x: "2022-10-01", y: 89.32 }, { x: "2022-11-01", y: 76.33 }, { x: "2022-12-01", y: 73.45 },
          { x: "2023-01-01", y: 73.13 }, { x: "2023-02-01", y: 74.7 }, { x: "2023-03-01", y: 74.34 }, { x: "2023-04-01", y: 69.07 },
          { x: "2023-05-01", y: 65.36 }, { x: "2023-06-01", y: 63.95 }, { x: "2023-07-01", y: 62.59 }, { x: "2023-08-01", y: 59.56 },
          { x: "2023-09-01", y: 60.34 }, { x: "2023-10-01", y: 60.63 }, { x: "2023-11-01", y: 60.75 }, { x: "2023-12-01", y: 60.53 },
          { x: "2024-01-01", y: 60.55 }, { x: "2024-02-01", y: 61.09 }, { x: "2024-03-01", y: 62.59 }, { x: "2024-04-01", y: 68.52 },
          { x: "2024-05-01", y: 68.72 }, { x: "2024-06-01", y: 68.18 }, { x: "2024-07-01", y: 68.17 }, { x: "2024-08-01", y: 67.84 },
          { x: "2024-09-01", y: 67.93 }, { x: "2024-10-01", y: 70.26 }, { x: "2024-11-01", y: 72.35 }, { x: "2024-12-01", y: 73.79 },
          { x: "2025-01-01", y: 75.19 }, { x: "2025-02-01", y: 78.4 }, { x: "2025-03-01", y: 77.78 }, { x: "2025-04-01", y: 75.65 },
          { x: "2025-05-01", y: 68.42 }, { x: "2025-06-01", y: 67.79 }, { x: "2025-07-01", y: 67.28 }, { x: "2025-08-01", y: 66.82 },
          { x: "2025-09-01", y: 67.03 }, { x: "2025-10-01", y: 67.94 }, { x: "2025-11-01", y: 68.28 }, { x: "2025-12-01", y: 69.69 },
          { x: "2026-01-01", y: 70.39 }
        ],
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.1)",
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yy'
          }
        },
        adapters: {
          date: {
            locale: de
          }
        },
        title: {
          display: true,
          text: 'Monat'
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Preis (Cent/Liter)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Flüssiggaspreise im Jahresverlauf - Monatliche Entwicklung',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + ' Cent/Liter';
          }
        }
      }
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="h-[400px] md:h-[500px]">
        <Line data={chartData} options={options} />
      </div>
      <div className="text-right text-xs text-gray-500 mt-2">
        <em>Quelle: Bund der Energieverbraucher e.V. | 12.01.2026</em>
      </div>
    </div>
  );
};

export default PriceChart;
