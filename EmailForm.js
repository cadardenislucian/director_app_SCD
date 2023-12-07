// src/components/EmailForm.js
import React, { useState } from 'react';
import ApiService from '../services/ApiService';

const EmailForm = ({ selectedPersons, onClose }) => {
    const [emailData, setEmailData] = useState({
        subject: '',
        message: '',
    });

    const handleSendEmail = () => {
        ApiService.sendEmailToSelected(selectedPersons, emailData)
            .then(() => {
                alert('Email sent successfully!');
                onClose(); // Inchide formularul dupa trimiterea e-mailului cu succes
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('Error sending email. Please try again.');
            });
    };

    return (
        <div>
            <h2>Send Email to Selected</h2>
            <label>
                Subject:
                <input type="text" value={emailData.subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} />
            </label>
            <br />
            <label>
                Message:
                <textarea value={emailData.message} onChange={(e) => setEmailData({ ...emailData, message: e.target.value })} />
            </label>
            <br />
            <button onClick={handleSendEmail}>Send Email</button>
        </div>
    );
};

export default EmailForm;
