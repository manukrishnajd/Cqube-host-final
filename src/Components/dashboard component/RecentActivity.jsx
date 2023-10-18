import React from 'react';

const RecentActivity = () => {
  // Replace this with actual recent activity data from your application
  const recentActivityData = [
    { type: 'Student Registration', description: 'New student registered: John Doe' },
    { type: 'Course Assignment', description: 'Course assigned to student: React Basics' },
    // Add more recent activity items as needed
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul>
        {recentActivityData.map((activity, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{activity.type}:</span> {activity.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;
