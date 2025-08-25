// src/App.tsx
import React from 'react';
import { Event } from './components/Event';
import { sampleEvent } from './testData/sampleEvent';

function App() {
    return (
        <div>
            <h1>Event Viewer</h1>
            <Event {...sampleEvent} />
        </div>
    );
}

export default App;
