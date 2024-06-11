import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeLogin } from '../pages/Login/HomeLogin'
import { MainSL } from '../pages/Main/MainSL'
import { Register } from '../pages/Register/Register'

export const AppRouter = () => (

    
    <BrowserRouter>
    
        <Routes>

            <Route path="/*" element={<HomeLogin />} />
            
            <Route path="/MainSL" element={<MainSL />} />
            ¨{/*ruta en teoria no habilitada */}
            <Route path="/reg" element={<Register />} />



        </Routes>
    </BrowserRouter>
)