import React, { useEffect, useState } from 'react';
import api from '../api';
import { format } from 'date-fns';

const Dashboard = ({ refreshTrigger }) => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const res = await api.get('/reminders');
                setReminders(res.data);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };
        fetchReminders();
    }, [refreshTrigger]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SENT': return 'bg-green-100 text-green-800';
            case 'FAILED': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Scheduled Messages</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reminders.map((reminder) => (
                            <tr key={reminder._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {reminder.phoneNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                    {reminder.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                                    <div className="flex items-center">
                                        {reminder.imageUrl && (
                                            <a href={reminder.imageUrl} target="_blank" rel="noopener noreferrer" className="mr-2 text-blue-500 hover:text-blue-700">
                                                [IMG]
                                            </a>
                                        )}
                                        {reminder.messageBody}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {format(new Date(reminder.scheduledTime), 'MMM d, h:mm aa')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reminder.status)}`}>
                                        {reminder.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reminders.length === 0 && <p className="text-center py-4 text-gray-400">No scheduled messages found.</p>}
            </div>
        </div>
    );
};

export default Dashboard;
