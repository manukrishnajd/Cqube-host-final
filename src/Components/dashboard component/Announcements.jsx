import React from 'react';

const Announcements = () => {
  // Replace this with actual announcement data from your application
  const announcementData = [
    'System update scheduled for tomorrow at 10:00 AM.',
    'New course added: Advanced React Development.',
    // Add more announcements as needed
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <ul>
        {announcementData.map((announcement, index) => (
          <li key={index} className="mb-2">
            {announcement}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Announcements;
