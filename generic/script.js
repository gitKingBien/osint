document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", search);
});

function search() {
  const keywordInput = document.getElementById("keywordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!keywordInput) {
    resultDiv.innerHTML = "<p>Please enter at least one keyword.</p>";
    return;
  }

  const keywords = keywordInput
    .split(",")
    .map(kw => `"${kw.trim()}"`)
    .join(" OR ");

  const encodedKeywords = encodeURIComponent(keywords);

  // 🔍 General search engines
  const searchEngines = [
    { name: "Google", url: `https://www.google.com/search?q=${encodedKeywords}` },
    { name: "DuckDuckGo", url: `https://duckduckgo.com/?q=${encodedKeywords}` },
    { name: "Bing", url: `https://www.bing.com/search?q=${encodedKeywords}` },
    { name: "Yahoo", url: `https://search.yahoo.com/search?p=${encodedKeywords}` },
    { name: "Startpage", url: `https://www.startpage.com/sp/search?query=${encodedKeywords}` }
  ];

  // 🔍 Targeted social media search (Google dork style)
  const socialSites = [
    { name: "LinkedIn", dork: `site:linkedin.com/in (${keywords})` },
    { name: "Facebook", dork: `site:facebook.com (${keywords})` },
    { name: "Twitter/X", dork: `site:twitter.com (${keywords})` },
    { name: "Instagram", dork: `site:instagram.com (${keywords})` },
    { name: "GitHub", dork: `site:github.com (${keywords})` }
  ];

  let output = `<h2>General Search</h2><ul>`;
  searchEngines.forEach(engine => {
    output += `<li><a href="${engine.url}" target="_blank">🔎 ${engine.name}</a></li>`;
  });
  output += `</ul>`;

  output += `<h2>Social Media Search (Google Dork)</h2><ul>`;
  socialSites.forEach(site => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(site.dork)}`;
    output += `<li><a href="${url}" target="_blank">🔗 ${site.name}</a></li>`;
  });
  output += `</ul>`;

  resultDiv.innerHTML = output;
}
