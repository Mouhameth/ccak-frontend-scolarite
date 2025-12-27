"use client";

import React, { useState } from 'react';
import NotificationList from './NotificationList';

const NotificationPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Bouton Cloche */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
                <span className="text-2xl">🔔</span>
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Popup (Liste) */}
            {isOpen && (
                <div className="absolute right-0 mt-2 z-50">
                    <NotificationList />
                </div>
            )}
        </div>
    );
};

export default NotificationPopup;