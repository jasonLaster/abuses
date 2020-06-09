let index = 0;

function videoLoad(e) {
  console.log(`loaded`, index);
  index++;

  loadVideo();
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
});

async function loadVideo() {
  await new Promise((r) => setTimeout(r, index * 20));
  const el = document.querySelector(".video[data-video]");
  const container = el.querySelector(".video-container");
  if (!el) {
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.width = 420;
  iframe.height = 315;
  iframe.src = el.dataset.video;
  iframe.onload = videoLoad;
  el.removeAttribute("data-video");
  container.prepend(iframe);
}
