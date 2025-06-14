async function findNeighborhood() {
  const name = document.getElementById("search").value;
  const resBox = document.getElementById("result");
  resBox.innerHTML = "";

  try {
    const res = await fetch(`/api/neighborhood?name=${encodeURIComponent(name)}`);
    const data = await res.json();

    if (res.ok) {
      resBox.innerHTML = `
        <h2>${data.title}</h2>
        ${data.thumbnail ? `<img src="${data.thumbnail}" alt="${data.title}" style="max-width: 100%; border-radius: 10px;" />` : ""}
        <p>${data.summary}</p>
        ${data.wikipedia_url ? `<p><a href="${data.wikipedia_url}" target="_blank">Read more on Wikipedia</a></p>` : ""}
      `;
    } else {
      resBox.innerHTML = `<p>${data.error}</p>`;
    }
  } catch (error) {
    resBox.innerHTML = `<p>Error fetching data</p>`;
  }
}
