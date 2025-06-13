async function findNeighborhood() {
    const name = document.getElementById("search").value;
    const resBox = document.getElementById("result");
    resBox.innerHTML = "";
  
    try {
      const res = await fetch(`/api/neighborhood?name=${name}`);
      const data = await res.json();
  
      if (res.ok) {
        resBox.innerHTML = `
          <h2>${data.name}</h2>
          <p><strong>Borough:</strong> ${data.borough}</p>
          <p><strong>Population:</strong> ${data.population.toLocaleString()}</p>
          <p><strong>Fun Fact:</strong> ${data.fun_fact}</p>
          <p><strong>Attractions:</strong> ${data.attractions.join(", ")}</p>
        `;
      } else {
        resBox.innerHTML = `<p>${data.error}</p>`;
      }
    } catch (error) {
      resBox.innerHTML = `<p>Error fetching data</p>`;
    }
  }