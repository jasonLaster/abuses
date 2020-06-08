let videos = require("./videos.json");
const fs = require("fs");
const _ = require("lodash");
videos = videos
  .filter((v) => v.YouTube.includes("http"))
  .map((v) => ({
    ...v,
    youtube: `https://www.youtube.com/embed/${v.YouTube.split("/").slice(-1)}`,
  }))
  .filter((v) => v.youtube);

videos = _.sortBy(videos, (v) => v.State);

const stats = {
  count: videos.length,
};

console.log(stats);

// <iframe width="420" height="315"
// src="https://www.youtube.com/embed/tgbNymZ7vqY">
//www.youtube.com/embed/a2jN0VEGvBs
// </iframe>

function card(video, defer) {
  return `
  <div class="video" ${defer ? `data-video=${video.youtube}` : ""}>
    ${
      !defer
        ? `<iframe width="420" height="315"  src=${video.youtube}></iframe>`
        : ""
    }
    <div class="location"><b>${video.State}</b>  ${video.City}</div>
    <div class="description">${video["Doucette Text"]}</div>
  </div>`;
}

const tweet = `Please share a link to videos/photos here + any information about the incident + the city/state where this happened. \n @jasonemiller  #policeAbuses`;
const title = `200+ Police Brutality Videos From George Floyd Protests`;
const seoImage = `http://police-accountability.netlify.app/police-seo.png`;
function page(videos) {
  return `
    <html>
        <head>
        <link href="styles.css" rel="stylesheet" />
        <script src="script.js"> </script>
        <title>${title}</title>
        <!-- Twitter Card data -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="http://policeabuses.com">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="Over 200 videos of police brutality shared on twitter">
        <meta name="twitter:image" content="${seoImage}">
        
        <!-- Open Graph data -->
        <meta property="og:title" content="${title}" />
        <meta property="og:site_name" content="${title}" /> 
        <meta property="og:url" content="http://police-accountability.netlify.app/" />
        <meta property="og:image" content="${seoImage}" />
        <meta property="og:description" content="Over 200 videos of police brutality shared on twitter" />
        
        <meta property="og:image" content="${seoImage}" /> 
        <meta property="og:image:width" content="602" />
        <meta property="og:image:height" content="602" /> 
        <meta name="twitter:card" content="summary_large_image" />

        </head>

        <body>
        <header>  
        <img src="police.png" />
        <div class="content">
           <h1>${title}</h1> 
           <div>
             <a href="https://docs.google.com/spreadsheets/d/1YmZeSxpz52qT-10tkCjWOwOGkQqle7Wd1P7ZM1wMW0E/edit#gid=0">Google Sheet</a> 
             - <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(
               tweet
             )}">Submit Video</a>
             - <a href="https://twitter.com/greg_doucette">Creator</a>
            </div>

            
         </div>
        </header>
          <div id="scrollable"> 
            <div id="primary-video">
              <iframe width="630" height="472"  src="https://www.youtube.com/embed/VVSJ5Y-FTik" ></iframe>
            </div>

                <div id="videos">
                ${videos
                  .slice(0, 5)
                  .map((v) => card(v, false))
                  .join("\n")}
                ${videos
                  .slice(6)
                  .map((v) => card(v, true))
                  .join("\n")}
                </div>
            </div>
            <script>
            document.querySelectorAll('iframe').forEach(e => {
                e.onload = videoLoad; 
            })  

            </script>
        </body>
    </html>`;
}

fs.writeFileSync("./index.html", page(videos));
