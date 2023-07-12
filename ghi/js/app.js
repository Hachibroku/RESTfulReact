function createCard(name, description, pictureUrl, startDate, endDate, location) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const formattedStartDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
  const formattedEndDate = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;

  return `
      <div class="card shadow p-3 mb-5 bg-white rounded" >
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-name"> ${name}</h5>
          <h6 class="card-subtitle mb2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
        <p class="card-dates">${formattedStartDate} - ${formattedEndDate}</p>
        </div>
      </div>
    `;
  }

  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
      } else {
        const data = await response.json();

        let i = 0
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const startDate = details.conference.starts;
            const endDate = details.conference.ends;
            const location = details.conference.location.name;
            const html = createCard(name, description, pictureUrl, startDate, endDate, location);
            const column = document.querySelector(`#col_${i%3}`);
            column.innerHTML += html;
            i++
          }
        }

      }
    } catch (e) {
        console.error(e);
      // Figure out what to do if an error is raised
    }

  });
