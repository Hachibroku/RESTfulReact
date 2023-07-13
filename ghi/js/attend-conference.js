window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const div = document.getElementById("loading-conference-spinner", "success-message");
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
      selectTag.classList.remove('d-none');
      div.classList.add('d-none');
    }

    const formTag = document.getElementById('create-attendee-form');
    formTag.addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));
      const attendeeUrl = 'http://localhost:8001/api/attendees/';
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(attendeeUrl, fetchConfig);
      if (response.ok) {
        formTag.reset();
      }
      div.classList.remove('d-none');
  })
});
