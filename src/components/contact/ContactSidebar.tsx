
import React from 'react';
import ContactInfo from './ContactInfo';
import OfficeHours from './OfficeHours';
import SocialMedia from './SocialMedia';

const ContactSidebar = () => {
  return (
    <div className="space-y-10">
      <ContactInfo />
      <OfficeHours />
      <SocialMedia />
    </div>
  );
};

export default ContactSidebar;
