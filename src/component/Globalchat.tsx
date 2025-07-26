import {useContext, useEffect, useState} from "react";
import {get_globalchat, send_message_globalchat} from "../service/serviceSupabaseAPI.ts";
import {IsUserConnectedContext} from "../contexts/UserContext.tsx";

export default function Globalchat() {
    const context = useContext(IsUserConnectedContext);
    if (!context) {
        throw new Error("SomeComponent must be used within a ContextProvider");
    }
    const {isUserConnected } = context;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    async function get_Messages() {
        if (isUserConnected == "not connected") {
            console.error("Utilisateur non connecté");
        }

        const messages = await get_globalchat();
        if (!messages) {
            console.error("Erreur lors de la récupération des messages");
            setMessages([]);
        }
        else {
            setMessages(messages);
        }
    }

    useEffect(() => {
        get_Messages();
    }, []);

    async function handleInputChange(e : any){
        setNewMessage(e.target.value);
    }

    async function handleSendMessage(){
        if (newMessage.trim() === '') {
            console.error("Le message ne peut pas être vide");
            return;
        }

        await send_message_globalchat(newMessage);

        setNewMessage('');
        get_Messages();
    }

    // raccourcir le nom de l'utilisateur
    const shortcutName = (idUser: string): string => {
        if (idUser.length > 0) {
            return idUser.slice(0, 5) + " ... ";
        }
        return "Utilisateur : ";
    };

    return (
        <div id="globalchat" className="element">
            <h1 className="text-xl">Chat global : </h1>
            <hr/>
            {!isUserConnected || isUserConnected === "not connected" ? (
                <div className="text-center text-red-600 font-bold">
                    Vous devez être connecté pour accéder au chat global.
                </div>
            ) : (
                <>
                    <div className="max-h-[50vh] lg:max-h-[30vh]">
                        {[...messages].reverse().map((msg, index) => (
                            <div key={index}>
                                <span className="id_user">{shortcutName(msg.id_user_admin) || 'Utilisateur'}: </span>
                                <span>{msg.message}</span>
                            </div>
                        ))}
                    </div>

                    <div className="msg_input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleInputChange}
                            placeholder="Écris un message..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button className="form_button" onClick={handleSendMessage}>
                            Envoyer
                        </button>
                    </div>
                </>
            )}
        </div>
    );

}