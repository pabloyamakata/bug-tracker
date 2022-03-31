import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { BarBox, ChartMessage } from './BarChartStyles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    bugsResolvedPerMonth: {
        thisMonth: number;
        oneMonthAgo: number;
        twoMonthsAgo: number;
        threeMonthsAgo: number;
        fourMonthsAgo: number;
        fiveMonthsAgo: number;
        sixMonthsAgo: number;
    },
    bugsCreatedPerMonth: {
        thisMonth: number;
        oneMonthAgo: number;
        twoMonthsAgo: number;
        threeMonthsAgo: number;
        fourMonthsAgo: number;
        fiveMonthsAgo: number;
        sixMonthsAgo: number;
    },
    nameOfMonths: {
        currentMonth: string;
        oneMonthAgo: string;
        twoMonthsAgo: string;
        threeMonthsAgo: string;
        fourMonthsAgo: string;
        fiveMonthsAgo: string;
        sixMonthsAgo: string;
    }
}

function BarChart({ nameOfMonths, bugsResolvedPerMonth, bugsCreatedPerMonth }: BarChartProps) {
    return(
        <BarBox>
            {
                Object.values(bugsResolvedPerMonth).every(value => !value) &&
                Object.values(bugsCreatedPerMonth).every(value => !value) ?
                <ChartMessage>No Data Available Yet!</ChartMessage> : null
            }

            <Bar
            data={{
                labels: [
                    nameOfMonths.sixMonthsAgo,
                    nameOfMonths.fiveMonthsAgo,
                    nameOfMonths.fourMonthsAgo,
                    nameOfMonths.threeMonthsAgo,
                    nameOfMonths.twoMonthsAgo,
                    nameOfMonths.oneMonthAgo,
                    nameOfMonths.currentMonth
                ],
                datasets: [
                    {
                        label: 'Created',
                        data: [
                            bugsCreatedPerMonth.sixMonthsAgo,
                            bugsCreatedPerMonth.fiveMonthsAgo,
                            bugsCreatedPerMonth.fourMonthsAgo,
                            bugsCreatedPerMonth.threeMonthsAgo,
                            bugsCreatedPerMonth.twoMonthsAgo,
                            bugsCreatedPerMonth.oneMonthAgo,
                            bugsCreatedPerMonth.thisMonth
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1
                    }, 
                    {
                        label: 'Solved',
                        data: [
                            bugsResolvedPerMonth.sixMonthsAgo,
                            bugsResolvedPerMonth.fiveMonthsAgo,
                            bugsResolvedPerMonth.fourMonthsAgo,
                            bugsResolvedPerMonth.threeMonthsAgo,
                            bugsResolvedPerMonth.twoMonthsAgo,
                            bugsResolvedPerMonth.oneMonthAgo,
                            bugsResolvedPerMonth.thisMonth
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    }
                ]
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Created vs Solved Bugs',
                        font: {
                            size: 20
                        },
                        padding: {
                            top: 15,
                            bottom: 15
                        }
                    }
                }
            }} />
        </BarBox>
    )
}

export default BarChart;