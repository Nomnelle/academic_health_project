import { ChatGroq } from "@langchain/groq";
import {HumanMessage, BaseMessage, AIMessage, SystemMessage} from "@langchain/core/messages";

const groq_api_key = import.meta.env.VITE_GROQ_API_KEY;

const model = new ChatGroq({
    model: "llama3-70b-8192",
    temperature: 0.3,
    apiKey: groq_api_key,
});

const contextMessage =
    "Tu es un assistant virtuel dédié à l'accompagnement d'un coach sportif et santé. " +
    "Ton rôle est d'aider le coach à optimiser ses sessions en lui fournissant des conseils, des informations pertinentes et des suggestions adaptées aux besoins de ses clients." +
    "Pose des questions pour bien comprendre les spécificités des objectifs et des profils des clients, afin d'offrir des recommandations précises et personnalisées."

export async function llm_stream_request(patientInfo : string ,onToken: any, history: BaseMessage[], message: string) {
    let aiResponse = "";
    const userMessage = new HumanMessage(message);
    const systemMessage = new SystemMessage(contextMessage + "\n" + patientInfo);
    try {
        const messages: BaseMessage[] = [systemMessage,...history, userMessage];
        const stream = await model.stream(messages);

        for await (const chunk of stream) {
            const token = chunk.content;
            onToken(token);
            aiResponse += token;
        }
    } catch (error) {
        console.error("Erreur dans llm_stream_request :", error);
        onToken("Le Chatbot dysfonctionne.");
    }

    const aiMessage = new AIMessage(aiResponse);
    return [...history, userMessage, aiMessage];
}

