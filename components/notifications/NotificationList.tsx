import React from 'react';
import NotificationItem from './NotificationItem';

// Données simulées
const notifications = [
    { id: 1, title: "Nouvelle Inscription", name: "Moustapha Fall", level: "Master 2", date: "2/10/25" },
    { id: 2, title: "Nouvelle Inscription", name: "Awa Diop", level: "Licence 1", date: "3/10/25" },
    { id: 3, title: "Nouvelle Inscription", name: "Jean Ndiaye", level: "Master 1", date: "4/10/25" },
    { id: 4, title: "Nouvelle Inscription", name: "Fatou Sow", level: "Licence 3", date: "5/10/25" },
];

const NotificationList = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-100 w-80">

            <div className="mb-2">
                {notifications.map((notification, index) => (
                    <NotificationItem
                        key={notification.id}
                        title={notification.title}
                        name={notification.name}
                        level={notification.level}
                        date={notification.date}
                        isLastItem={index === notifications.length - 1}
                    />
                ))}
            </div>

            <div className="text-center mt-4">
                <button className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                    Voir plus
                </button>
            </div>

        </div>
    );
};

export default NotificationList;