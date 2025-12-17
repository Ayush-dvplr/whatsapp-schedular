import React, { useState } from 'react';
import Scheduler from './components/Scheduler';
import Dashboard from './components/Dashboard';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handlePostScheduled = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                    WhatsApp Scheduler
                </h1>
                <p className="text-gray-500 mt-2">Automate your wishes & reminders</p>
            </header>

            <div className="max-w-4xl mx-auto">
                <Scheduler onPostScheduled={handlePostScheduled} />
                <Dashboard refreshTrigger={refresh} />
            </div>
        </div>
    );
}

export default App;
