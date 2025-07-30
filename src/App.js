import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Rooms from './components/Rooms';
import Rooms from './features/rooms/pages/Rooms';
//import Meetings from './components/Meetings';
import Meetings from './features/meetings/pages/Meetings';
import Participants from './components/Participants';
//import Users from './components/users';
import DefaultLayout from './layout/DefaultLayout';
import Users from './features/user/pages/Users';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
         <Router>
            <DefaultLayout>         
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/meetings" element={<Meetings />} />
                    <Route path="/meetings/:id/participants" element={<Participants />} />
                </Routes>
            </DefaultLayout>
        </Router>
    );
}

export default App;
