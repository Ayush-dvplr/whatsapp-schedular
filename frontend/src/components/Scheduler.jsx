import React, { useState } from 'react';
import api from '../api';
import { FaCloudUploadAlt, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa';

const Scheduler = ({ onPostScheduled }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [type, setType] = useState('OTHER');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber || !scheduledTime) {
            setMessage('Phone number and time are required');
            return;
        }

        const formData = new FormData();
        formData.append('phoneNumber', phoneNumber);
        formData.append('messageBody', messageBody);
        formData.append('scheduledTime', scheduledTime);
        formData.append('type', type);
        if (file) {
            formData.append('image', file);
        }

        setLoading(true);
        setMessage('');

        try {
            await api.post('/reminders/schedule', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Reminder scheduled successfully!');
            setFile(null);
            setPreviewUrl(null);
            setMessageBody('');
            setPhoneNumber('');
            setScheduledTime('');
            setType('OTHER');
            if (onPostScheduled) onPostScheduled();
        } catch (error) {
            console.error(error);
            setMessage('Failed to schedule reminder.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <FaWhatsapp className="text-green-500" /> WhatsApp Scheduler
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number (with Country Code)</label>
                    <input
                        type="text"
                        placeholder="+1234567890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message Type</label>
                    <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    >
                        <option value="BIRTHDAY">Birthday Wish</option>
                        <option value="ANNIVERSARY">Anniversary Wish</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <textarea
                    placeholder="Write your message..."
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    rows="3"
                />

                <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer relative ${previewUrl ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input 
                        type="file" 
                        id="fileInput"
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*" 
                    />
                    
                    {previewUrl ? (
                        <div className="relative">
                            <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded shadow-sm" />
                            <p className="text-xs text-green-600 mt-2 font-medium">Click to change image</p>
                        </div>
                    ) : (
                        <>
                            <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 mb-1" />
                            <p className="text-xs text-gray-500">Optional Image Attachment</p>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-2 border p-2 rounded">
                    <FaCalendarAlt className="text-gray-500" />
                    <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full outline-none"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded text-white font-semibold flex justify-center items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </>
                    ) : 'Schedule Message'}
                </button>
            </form>
            {message && <p className={`mt-4 text-center text-sm font-medium ${message.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>}
        </div>
    );
};

export default Scheduler;
