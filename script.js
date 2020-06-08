let index = 0;

function videoLoad(e) {
  console.log(`loaded`, index);
  index++;

  if (index > 5) {
    loadVideo();
  }
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
});

function loadVideo() {
  const el = document.querySelector(".video[data-video]");
  if (!el) {
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.width = 420;
  iframe.height = 315;
  iframe.src = el.dataset.video;
  iframe.onload = videoLoad;
  el.removeAttribute("data-video");
  el.prepend(iframe);
}
