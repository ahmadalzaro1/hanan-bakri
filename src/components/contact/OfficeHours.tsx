
import React from 'react';

const OfficeHours = () => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-4">Office Hours</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="text-foreground/70">Monday - Friday</span>
          <span>9:00 AM - 6:00 PM</span>
        </li>
        <li className="flex justify-between">
          <span className="text-foreground/70">Saturday</span>
          <span>By appointment only</span>
        </li>
        <li className="flex justify-between">
          <span className="text-foreground/70">Sunday</span>
          <span>Closed</span>
        </li>
      </ul>
    </div>
  );
};

export default OfficeHours;
