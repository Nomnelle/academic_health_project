import {Fragment, useState} from 'react';
import { llm_stream_request } from  '../service/serviceLLM';
import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import {Patient} from "../types.tsx";
import {calculateCalories} from "./PatientInfo.tsx";

type ChatbotProps = {
    patient: Patient | null;
}

function Chatbot( { patient }: ChatbotProps) {
    const [userMessage, setUserMessage] = useState('');
    const [history, setHistory] = useState<BaseMessage[]>([]);
    const [streamResponse, setstreamResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generatePatientContext = (patient: Patient | null) => {
        if (!patient) return '';

        return `
            Voici les informations du patient :
            Âge : ${patient.birthyear ? new Date().getFullYear() - patient.birthyear : 'inconnu'}
            Sexe : ${patient.sex === 1 ? 'homme' : 'femme'}
            Taille : ${patient.height} cm
            Poids initial : ${patient.weightStart} kg
            IMC de départ : ${patient.bmiStart}
            Objectifs : ${patient.weightGoal} kg, IMC ${patient.bmiGoal}
            Calories conseillées par jour : ${calculateCalories(patient)}
        `;
    };

    async function sendMessage(message: string) {
        setUserMessage('');
        const newUserMessage = new HumanMessage(message);
        setHistory(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        let streamedContent = '';

        const whenNewToken = (token: string) => {
            streamedContent += token;
            setstreamResponse(streamedContent);
        };

        const newHistory = await llm_stream_request(
            generatePatientContext(patient),
            whenNewToken,
            [...history],
            message
        );

        setHistory(newHistory);
        setstreamResponse('');
        setIsLoading(false);
    }

    return (
        <div className="p-2 mx-auto space-y-2">
            <div className="space-y-2 max-h-80">
                {history.map((msg, index) => (
                    <div
                        key={index}
                        className="rounded-lg p-2 text-sm text-gray-800"
                    >
                        {(index % 2 === 0 ? 'Votre message : ' : 'Réponse de l’assistant : ')}
                        {JSON.stringify(msg.content)
                            .slice(1, -1)
                            .split('\\n')
                            .map((line, i) => (
                                <Fragment key={i}>
                                    {line}
                                    <br />
                                </Fragment>
                            ))}
                    </div>
                ))}
                {isLoading && (
                    <div className="italic text-gray-500 text-sm">{streamResponse}</div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Votre question"
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(userMessage)}
                    className="flex-1 rounded-full px-4 py-2 min-w-20"
                />
                <button
                    onClick={() => sendMessage(userMessage)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
