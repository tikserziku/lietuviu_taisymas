async function processText() {
    const inputText = document.getElementById('inputText').value;
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    if (!inputText.trim()) {
        alert('Prašome įvesti tekstą');
        return;
    }

    try {
        loadingDiv.style.display = 'block';
        resultDiv.style.opacity = '0.5';

        const response = await fetch('https://lietuviu-corrector.onrender.com/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: inputText
            })
        });

        if (!response.ok) {
            throw new Error('Server response was not ok');
        }

        const data = await response.json();
        document.getElementById('correctedText').textContent = data.correctedText;
        document.getElementById('explanation').textContent = data.explanation;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('correctedText').textContent = 'Klaida apdorojant tekstą';
        document.getElementById('explanation').textContent = 'Įvyko klaida. Bandykite dar kartą.';
    } finally {
        loadingDiv.style.display = 'none';
        resultDiv.style.opacity = '1';
    }
}
