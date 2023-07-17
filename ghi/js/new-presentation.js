window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        const selectTag = document.getElementById('conference');

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.id;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }
    }

        const formTag = document.getElementById('create-presentation-form');
        formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const conferenceId = formData.get("conference")
        console.log(conference.value)
        console.log(conference.id)
        const presentationURL = `http://localhost:8000/api/conferences/${conferenceID}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationURL, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
        }
        });

});
