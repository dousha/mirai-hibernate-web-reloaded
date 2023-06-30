import React, {Suspense} from 'react';
import './App.css';
import LandingPage from "./pages/LandingPage";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import SuspensePage from "./pages/SuspensePage";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Suspense fallback={<SuspensePage />}>
                    <div className={'app'}>
                        <Routes>
                            <Route index element={<LandingPage />} />
                            <Route path={'/bot/:botId'} element={<DashboardPage />} />
                        </Routes>
                    </div>
                </Suspense>
            </LocalizationProvider>
        </>
    );
}
