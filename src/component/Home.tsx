
export default function Home(){
//<a target="_blank" href="https://icons8.com/icon/rMuvyqYyxruQ/trainers">Trainers</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
//<a target="_blank" href="https://icons8.com/icon/GzvKS578w6wn/heart-with-pulse">Health</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>


  const boxes = [
    "Un système de suivi personnalisé pour chaque patient, pourvu d'un moteur de recherche vous aidant à trouver n'importe lequel de vos patients en quelques secondes et d'accéder directement à son profil.",
    "Un profil détaillé pour chaque patient, incluant leurs données physiologiques, leurs données d'activité physique, et leurs données psychologiques.",
    "Un emploi du temps interactif, vous assistant dans l'organisation de vos rendez-vous et vous permettant de consulter les disponibilités de vos patients. Vous pourrez observer les rendez-vous par mois, semaine, jour, ou sous forme d'agenda vous indiquant les rendez-vous à suivre.",
    "Un chat global, vous donnant l'occasion d'échanger des informations et questions avec vos confrères utilisant l'application, ainsi qu'un chat individuel avec chaque patient, vous permettant de répondre à leurs questions et de les rassurer.",
    "Un chatbot vous suggérant un programme d'entraînement physique pour un patient, en se basant sur les informations que vous lui fournirez.",
  ];

  const images = [
    "/icons/icon_health_home.svg",
    "/icons/icon_graph.svg",
    "/icons/icon_time.svg",
    "/icons/icon_pen.svg",
    "/icons/chatbot.svg"
    ];

    const altTexts = [
        "a heart with pulse",
        "a graph", 
        "a calendar",
        "a pen",
        "a chatbot"
    ];

return (
    <>
    <div className = "text-xl font-weight : bold flex items-center text-center justify-center font-weight : bold ">
        <img src="/icons/logo_small.svg" alt="medecin" className="mb-4 sm:w-10 sm:h-10 h-20 w-20 flex justify-center m-4 items-center start-0"/>
        HEALTH PROJECT
    </div>
    <div className = "bg-white/10 w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className = "text-center flex items-center justify-center">Une application où vous trouverez :</p>
    </div>
    <div className="flex flex-col gap-6 p-6 item-center justify-center sm:flex-col sm:flex-wrap sm:gap-4">
    {boxes.map((text, index) => (
        <div
            key={index}>
            <div className="bg-blue-500/10 h-90 text-black shadow-lg p-4 rounded-lg flex items-center justify-center text-center margin-2">
                {text}
            </div>
            <div className="bg-white/50 text-black shadow-lg p-4 rounded-lg flex items-center justify-center text-center margin-2 margin-top-2">
                <img src={images[index]} alt={altTexts[index]} className="w-25 h-25 object-contain mb-4 opacity-50 mx-auto"/>
            </div>
        </div>
    ))}
</div>
    </>
)
}
/*<div className = "bg-white w-full max-width : 700px p-6 rounded-lg shadow-lg">
            <p className="text-2xl text-center font-weight : bold">Bienvenue sur l'application de gestion des patients</p>
        </div>
        <div className = "bg-white w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img src="/icons/logo.svg" alt="medecin" className="w-32 h-32 object-contain mb-4"/>
            <p className = "text-center flex items-center justify-center">Sur cette application, vous trouverez :</p>
        </div>
        <div className = "w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img src="/icons/icon_health_home.svg" alt="medecin" className="w-32 h-32 object-contain mb-4 opacity-60"/>
            <p className = "text-center flex items-center justify-center">Un système de suivi personnalisé pour chaque patient, 
                vous permettant de consulter leurs informations, leurs données physiologiques, 
                leurs données d'activité physique, et leurs données psychologiques à tout moment.</p>
        </div>
        <div className = "w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img src="/icons/icon_sports_home.svg" alt="medecin" className="w-32 h-32 object-contain mb-4 opacity-50"/>
            <p className = "text-center flex items-center justify-center">Un moteur de recherche vous aidant à trouver n'importe lequel de vos patients en quelques secondes et d'accéder directement à son profil</p>
        </div>    
        <div className = "w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img src="/icons/icon_sports_home.svg" alt="medecin" className="w-32 h-32 object-contain mb-4 opacity-50"/>
            <p className = "text-center flex items-center justify-center">Un emploi du temps interactif, vous assistant dans l'organisation de vos rendez-vous
                et vous permettant de consulter les disponibilités de vos patients. Vous pourrez observer les rendez-vous par mois, semaine, jour, ou sous forme d'agenda vous indiquant les rendez-vous à suivre.</p>
        </div>
        <div className = "w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img src="/icons/icon_sports_home.svg" alt="medecin" className="w-32 h-32 object-contain mb-4 opacity-50"/>
            <p className = "text-center flex items-center justify-center">Un chat global, vous donnant l'occasion d'échanger des informations et questions avec
                vos confrères utilisant l'application, ainsi qu'un chat individuel avec chaque patient, vous permettant de répondre à leurs questions et de les rassurer.</p>
        </div>
        <div className = "w-full max-width : 700px p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img src="/icons/icon_sports_home.svg" alt="medecin" className="w-32 h-32 object-contain mb-4 opacity-50"/>
            <p className = "text-center flex items-center justify-center">Un chatbot vous suggérant un programme d'entraînement physique pour un patient, 
                en se basant sur les informations que vous lui fournirez</p>
        </div>*/