'use client';

import { ChartBarIcon, BeakerIcon, BoltIcon, ClockIcon, CurrencyDollarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '주간 물 사용량 (리터)',
    },
  },
};

const chartData = {
  labels: ['월', '화', '수', '목', '금', '토', '일'],
  datasets: [
    {
      label: '사용량',
      data: [220, 240, 180, 190, 260, 230, 200],
      borderColor: 'rgb(0, 168, 232)',
      backgroundColor: 'rgba(0, 168, 232, 0.5)',
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="w-full lg:w-2/3 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary">물 사용 현황</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <DashboardCard icon={<ChartBarIcon className="h-8 w-8 text-secondary" />} title="일일 사용량" value="250L" />
        <DashboardCard icon={<BeakerIcon className="h-8 w-8 text-secondary" />} title="수질 상태" value="양호" />
        <DashboardCard icon={<BoltIcon className="h-8 w-8 text-secondary" />} title="에너지 효율" value="92%" />
        <DashboardCard icon={<ClockIcon className="h-8 w-8 text-secondary" />} title="최근 누수 감지" value="3일 전" />
        <DashboardCard icon={<CurrencyDollarIcon className="h-8 w-8 text-secondary" />} title="예상 월 요금" value="45,000원" />
        <DashboardCard icon={<ExclamationCircleIcon className="h-8 w-8 text-secondary" />} title="알림" value="2개" />
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-primary">주간 사용량 추이</h3>
        <div className="bg-background p-6 rounded-lg shadow-inner">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="bg-background p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="flex justify-center mb-2">{icon}</div>
      <h3 className="font-semibold text-text text-center">{title}</h3>
      <p className="text-2xl font-bold text-primary text-center mt-2">{value}</p>
    </div>
  )
}