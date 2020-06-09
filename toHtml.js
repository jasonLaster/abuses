let videos = require("./videos.json");
const fs = require("fs");
const _ = require("lodash");
videos = videos
  .filter((v) => v.YouTube && v.YouTube.includes("http"))
  .map((v) => ({
    ...v,
    youtube: `https://www.youtube.com/embed/${v.YouTube.split("/").slice(
      -1
    )}?showinfo=0`,
  }))
  .filter((v) => v.youtube);

videos = _.sortBy(videos, (v) => +v.TGD);

const stats = {
  count: videos.length,
};

console.log(stats);

// <iframe width="420" height="315"
// src="https://www.youtube.com/embed/tgbNymZ7vqY">
//www.youtube.com/embed/a2jN0VEGvBs
// </iframe>

// submit video
//  <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9xv3H271xFPKEBOxCgdmkIE-4biyVRaePa4sModaApY-1eg/viewform}">Submit Video</a>

function card(video, defer) {
  return `
  <div class="video" ${defer ? `data-video=${video.youtube}` : ""}>
    <h3><span class="tgd">${
      video["TGD"]
    } </span>&nbsp;  <div class="location">${video.State}, ${
    video.City
  }</div></h3>
    <div class="description">${
      video["Doucette Text"]
    }  <a target="_blank" href="${video["Tweet URL"]}"
  >Original Tweet</a></div>

    <div class="video-container">
     ${
       !defer
         ? `<iframe width="420" height="315"  src=${video.youtube}></iframe>`
         : ""
     }
    </div>


  </div>`;
}

const tweet = `Please share a link to videos/photos here + any information about the incident + the city/state where this happened. \n @jasonemiller  #policeAbuses`;
const title = `PoliceAbuses: 200+ Videos of Police Brutality From George Floyd Protests`;
const seoImage = `http://police-accountability.netlify.app/police-seo.png`;
const metaDescription = `A compilation of all of the police brutality incidents during the George Floyd protests. Share videos, find videos, and help hold police officers accountable.`;
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
        <meta name="twitter:description" content="${metaDescription}">
        <meta name="twitter:image" content="http://police-accountability.netlify.app/police-twitter.png">
        <meta name="twitter:card" content="summary_large_image" />

        <!-- Open Graph data -->
        <meta property="og:title" content="${title}" />
        <meta property="og:site_name" content="${title}" /> 
        <meta property="og:url" content="http://police-accountability.netlify.app/" />
        <meta property="og:image" content="${seoImage}" />
        <meta property="og:description" content="${metaDescription}" />
        <meta property="og:image:width" content="602" />
        <meta property="og:image:height" content="602" /> 

        <!-- BEGIN SHAREAHOLIC CODE -->
        <link rel="preload" href="https://cdn.shareaholic.net/assets/pub/shareaholic.js" as="script" />
        <meta name="shareaholic:site_id" content="1b39ed080f8a54799c3f5775fc513afb" />
        <script data-cfasync="false" async src="https://cdn.shareaholic.net/assets/pub/shareaholic.js"></script>
        <!-- END SHAREAHOLIC CODE -->

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-57905986-10"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-57905986-10');
        </script>



        </head>

        <body>

        <script>
          const isMobile = mobileCheck();
          document.body.classList.add(isMobile ? "mobile" : "desktop");
        </script>      
        <header>
        <img src="police.png" />
        <div class="content">
           <h1>${title}</h1>
           <div>
             <a href="https://docs.google.com/spreadsheets/d/1YmZeSxpz52qT-10tkCjWOwOGkQqle7Wd1P7ZM1wMW0E/edit#gid=0">Google Sheet</a>

             - <a href="https://slate.com/news-and-politics/2020/06/george-floyd-public-spreadsheet-police-violence-videos.html">About</a>
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
