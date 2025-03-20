
import React from 'react';

const AppointmentInformation = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-serif mb-4">Appointment Information</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Private consultations are available by appointment only and typically last 60-90 minutes.
          </p>
          <p>
            During your appointment, you'll have the opportunity to view Hanan's portfolio in person and discuss your specific project needs.
          </p>
          <p>
            For urgent inquiries, please contact us directly at <a href="tel:+962795544433" className="text-primary">+962 7 9554 4433</a>.
          </p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-serif mb-4">Studio Location</h2>
        <address className="not-italic space-y-1 text-muted-foreground">
          <p>Abdoun</p>
          <p>Amman, Jordan</p>
        </address>
      </div>
      
      <div>
        <h2 className="text-xl font-serif mb-4">Availability</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span>10:00 AM - 6:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Saturday</span>
            <span>By appointment only</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Sunday</span>
            <span>Closed</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppointmentInformation;
