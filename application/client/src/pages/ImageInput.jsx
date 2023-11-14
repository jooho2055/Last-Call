import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function ImageInput() {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        axios.post('/test', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then(response => {
        console.log('File uploaded successfully', response);
        })
        .catch(error => {
        console.error('Error uploading file', error);
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input type="file" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

