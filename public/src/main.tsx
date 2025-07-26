import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import App from './App.tsx'
import PatientsMaster from "./pages/PatientsMaster.tsx";
import PatientDetails from "./pages/PatientDetails.tsx";
import Login from "./pages/Login.tsx";
import PatientDatas from "./component/PatientDatas.tsx"
import PatientInfo from "./component/PatientInfo.tsx";
import GlobalChatPage from "./pages/GlobalChatPage.tsx";
import UserContextProvider from "./contexts/UserContext.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";


createRoot(document.getElementById('root')!).render(
    <UserContextProvider>
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />

                <Route path="patients">
                    <Route index element={<PatientsMaster />} />
                    <Route path=":id" element={<PatientDetails/>}>
                        <Route path="patientInfos"  element={<PatientInfo />}/>
                        <Route path="patientPhysio" element={<PatientDatas graphType="physiological" />} />
                        <Route path="patientPhysic" element={<PatientDatas graphType="physical" />} />
                        <Route path="patientPsychic" element={<PatientDatas graphType="psychological" />} />
                    </Route>
                </Route>

                <Route path="login" element={<Login/>}/>
                <Route path="create_account" element={<CreateAccount/>}/>
                <Route path="globalchat" element={<GlobalChatPage/>}/>

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </BrowserRouter>
    </UserContextProvider>,
)
