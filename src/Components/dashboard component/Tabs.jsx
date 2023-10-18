import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <ul className="flex border-b">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`mr-4 cursor-pointer ${
              index === activeTab ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
