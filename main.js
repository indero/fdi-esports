import Papa from 'papaparse';

const $container = document.querySelector('[data-entries]');
const gSheetCSVsrc = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQATGjyNqddTf-u7BceNp7Blja6MKO7vy1qoXoglnXhLkqOdnApU7J0EDP13etC1CeaRnvpZ8zVvzC9/pub?gid=0&single=true&output=csv&cacheBuster=' + (1000 * Math.random() + (Date().now))

// Fetch and parse the CSV data using PapaParse
Papa.parse(gSheetCSVsrc, {
  download: true, // Fetch the CSV file
  header: true, // Use the first row as headers
  skipEmptyLines: true, // Skip empty rows
  complete: function (results) {
    console.log("Parsed Results:", results); // Debug: log parsed results

    // Get the parsed data
    const entries = results.data;

    // Debug: Log entries to verify structure
    console.log("Entries:", entries);

    // Shuffle the entries for randomness
    const shuffledEntries = entries.sort(() => 0.5 - Math.random());

    // Generate HTML for the entries
    const entriesHTML = shuffledEntries.map((entry) => {
      const name = entry.Member || "Unnamed"; // Replace "Name" with your column header
      const description = entry.Beschreibung || "No description available."; // Replace "Description" as needed
      const imageHTML = entry.Bild
        ? `<img src="${entry.Bild}" alt="${name}" />`
        : ""; // Replace "Image" with the correct column header

      return `
        <details>
          <summary><strong>[FDI]</strong> ${name}</summary>
          <p>${description}</p>
          ${imageHTML}
        </details>
      `;
    }).join("");

    // Insert the generated HTML into the container
    $container.innerHTML = entriesHTML;
  },
  error: function (error) {
    console.error("Error parsing CSV:", error);
    $container.innerHTML = "<p>Failed to load entries. Please try again later.</p>";
  },
});


const $cur = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => {
    $cur.style.transform = `translate(${e.pageX}px,${e.pageY}px)`;
  });
});

const $fudikontainer = document.querySelector('[data-fudikontainer]');

const fuddiConfetti = () => {
  const konfetti = (new Array(Math.round(200))).fill('').reduce((r, actuel) => (
    r + `<i class="confetti" style="--rotation: ${-30 + Math.random() * 60}deg; --color: hsl(${Math.random() * 360},100%,70%); --rnd: ${Math.random()}"><span></span></i>`
  ), '');
  
  $fudikontainer.innerHTML = konfetti;
}

fuddiConfetti();