import {usePatient} from "../contexts/PatientContext.ts";
import {useState} from "react";
import {useEffect} from "react";
import {GraphProps, physical, physiological} from "../types.tsx";
import {ServiceDirectusAPI} from "../service/serviceDirectusAPI.ts";
import { format } from "date-fns";
import { Line } from 'react-chartjs-2';
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

function PatientDatas({graphType}:GraphProps) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        BarElement
    );

    const patient = usePatient();
    const [datas, setDatas] = useState<physical[] | physiological[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const chartOptions = {responsive : true};

    useEffect(() => {
        const service = new ServiceDirectusAPI();
        const fetchData = async () => {
            try {
                if(patient){
                    switch (graphType) {
                        case "physical":
                        { const response = await service.get_items_physicalActivities(patient.id);
                            setDatas(response)}
                            break;
                        case "physiological":
                        { const response = await service.get_items_physiologicalData(patient.id);
                            setDatas(response)}
                            break;
                        case "psychological":
                        { const response = await service.get_psychic_data(patient.id);
                            setDatas(response as physical[] | physiological[])}
                            break;
                        default:
                        { setError(Error("Invalid graph type"));}
                    }
                }

            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                } else {
                    setError(Error("An unknown error occurred."));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [graphType, patient, patient?.id])

    if (isLoading) {
        return (
            <>
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                {error.message}
            </>
        );
    }

    if (graphType == "physiological"){
        const chartData = {
            labels: datas.map(d => format(new Date(d.date ?? ""), "dd/MM/yyyy")),
            datasets: [
                {
                    label: 'Poids (kg)',
                    data: datas.map(d => d.weight),
                    tension: 0.1
                }
            ]
        };

        return <Line data={chartData} options={chartOptions}/>

    }if(graphType == "physical"){

        const sports = Array.from(new Set(datas.map(d => d.type)));
        const dates = Array.from(new Set(datas.map(d => d.date))).sort();

        const grouped: { [sport: string]: { [date: string]: number } } = {};

        sports.forEach(type=> {
            grouped[type] = {};
            dates.forEach(date => {
                grouped[type][date] = 0;
            });
        });

        datas.forEach(({ consumedCalories, type, date }) => {
            grouped[type][date] += consumedCalories;
        });

        const chartData = {
            labels: dates.map(d => format(new Date(d), "dd/MM/yyyy")),
            datasets: sports.map((type, index) => ({
                label: type,
                data: dates.map(date => grouped[type][date]),
                borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
                backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.3)`,
                tension: 0.3
            }))
        };

        return <Line data={chartData} options={chartOptions}/>
    }if(graphType == "psychological") {

        const emotionCounts = datas.reduce((acc, entry) => {
            acc[entry.feeling] = (acc[entry.feeling] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const chartData = {
            labels: Object.keys(emotionCounts),
            datasets: [
                {
                    label: 'Occurrences per emotion',
                    data: Object.values(emotionCounts),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                }
            ]
        };

        return <Bar data={chartData} options={chartOptions}/>
    }

    return(<></>)
}

export default PatientDatas;