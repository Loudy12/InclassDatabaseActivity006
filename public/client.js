async function fetchPaintings() {
    try {
        const response = await fetch('/api/paintings');
        const paintings = await response.json(); // Get painting data from the API
        const paintingList = document.getElementById('painting-list');

        paintingList.innerHTML = ''; // Clear existing content

        paintings.forEach(painting => {
            // Create a card element for each painting
            const card = document.createElement('div');
            card.classList.add('painting-card');

            // Create title element for the painting name
            const title = document.createElement('h3');
            title.innerText = painting.Title;

            // Create edit button
            const button = document.createElement('button');
            button.innerText = 'Edit';
            button.onclick = () => showPaintingDetails(painting); // Load details for editing

            // Add title and button to the card
            card.appendChild(title);
            card.appendChild(button);

            // Append the card to the painting list
            paintingList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching paintings:', error);
    }
}

function showPaintingDetails(painting) {
    // Populate the form with the painting's current data
    document.getElementById('painting-id').value = painting._id;
    document.getElementById('painting-title').value = painting.Title;
    document.getElementById('painting-artist').value = `${painting.FirstName || ''} ${painting.LastName || ''}`;
    document.getElementById('painting-year').value = painting.YearOfWork || '';
    document.getElementById('painting-description').value = painting.Description || '';
}

document.getElementById('edit-form').onsubmit = async (e) => {
    e.preventDefault();

    const id = document.getElementById('painting-id').value;
    const updatedPainting = {
        Title: document.getElementById('painting-title').value,
        FirstName: document.getElementById('painting-artist').value.split(' ')[0] || '',
        LastName: document.getElementById('painting-artist').value.split(' ')[1] || '',
        YearOfWork: document.getElementById('painting-year').value,
        Description: document.getElementById('painting-description').value,
    };

    try {
        await fetch(`/api/paintings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPainting),
        });
        fetchPaintings(); // Refresh the painting list
    } catch (error) {
        console.error('Error updating painting:', error);
    }
};

// Load paintings when the page loads
document.addEventListener('DOMContentLoaded', fetchPaintings);
