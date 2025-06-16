// 1. Feature Detection and Polyfill (if needed)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 2. Check for API support
if (!window.SpeechRecognition) {
    console.warn('Speech Recognition API not supported in this browser.');
    // You might want to display a user-friendly message on the webpage here.
} else {
    // 3. Create a new SpeechRecognition instance
    const recognition = new SpeechRecognition();

    // 4. Configure Recognition: Enable continuous listening
    recognition.continuous = true; 

    // 5. Configure Recognition: Enable interim results (live partial transcriptions)
    recognition.interimResults = true; // Corrected typo: 'interinResults' -> 'interimResults'

    // 6. Initialize UI Elements for Display
    let currentParagraph = document.createElement('p'); // This will hold the current spoken sentence/phrase
    const wordsContainer = document.querySelector('.words'); // Assumes an HTML element with class 'words'
    wordsContainer.appendChild(currentParagraph);

    // 7. Event Listener: When speech recognition starts
    recognition.onstart = () => {
        console.log('Speech recognition started. Speak now...');
        // You could update a UI element here, e.g., a "Listening..." indicator.
    };

    // 8. Event Listener: When a speech recognition result is received
    recognition.addEventListener('result', e => {
        // console.log(e.results); // Optional: Log all raw results for debugging

        let interimTranscript = ''; // Stores temporary, unconfirmed speech
        let finalTranscript = '';   // Stores confirmed, final speech segments

        // 9. Iterate through all results in the event (can be multiple for continuous)
        for (let i = e.resultIndex; i < e.results.length; ++i) {
            const result = e.results[i];
            const transcriptSegment = result[0].transcript; // Get the text from the most confident alternative

            if (result.isFinal) {
                // 10. If it's a final segment, add it to the final transcript
                finalTranscript += transcriptSegment + ' ';
            } else {
                // 11. If it's an interim segment, add it to the interim transcript
                interimTranscript += transcriptSegment;
            }
        }

        // 12. Update the currently active paragraph with both final and interim text
        // This provides the real-time "typing" effect.
        currentParagraph.textContent = finalTranscript + interimTranscript;

        // 13. Check if the *last* result in the event array is final
        // This indicates the end of a spoken phrase or sentence.
        const lastResultIndex = e.results.length - 1;
        if (e.results[lastResultIndex].isFinal) {
            // 14. Log the complete final segment
            if (finalTranscript.trim().length > 0) { // Only log if there's actual final text
                console.log('Final Segment:', finalTranscript.trim());
            }

            // 15. Create a new paragraph for the next phrase/sentence
            // This ensures each completed thought gets its own line.
            currentParagraph = document.createElement('p');
            wordsContainer.appendChild(currentParagraph);
        }

        // 16. Specific keyword detection
        if (finalTranscript.includes('unicorn') || interimTranscript.includes('unicorn')) {
            console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');
        }
        
        // 17. Log the current combined transcript (for debugging during speech)
        // console.log(currentParagraph.textContent); // You can use this instead of the two below if preferred
    });

    // 18. Event Listener: When an error occurs
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        // Provide more specific feedback based on the error type
        if (event.error === 'no-speech') {
            console.log('No speech detected. The recognition might stop due to silence.');
        } else if (event.error === 'audio-capture') {
            console.log('Microphone not available or permission denied.');
        } else if (event.error === 'not-allowed') {
            console.log('Microphone access not allowed. Please grant permission.');
        }
        // You might want to stop the infinite restart loop on critical errors
        // or prompt the user for action.
    };

    // 19. Event Listener: When speech recognition ends (even in continuous mode)
    recognition.addEventListener('end', () => {
        console.log('Speech recognition session ended. Restarting...');
        // 20. Restart recognition after a short delay
        // This prevents rapid restarts in case of temporary issues.
        setTimeout(() => {
            try {
                recognition.start();
            } catch (error) {
                console.error('Error restarting speech recognition:', error);
                // If this keeps happening, you might need to stop the loop.
            }
        }, 500); // 500ms delay
    });

    // 21. Start the speech recognition initially
    try {
        recognition.start();
    } catch (error) {
        console.error('Initial error starting speech recognition:', error);
    }
}