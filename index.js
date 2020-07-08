var videoList = [];
var captionsList = [];
var videoRef;

window.onload = (event) => {
  var i;
  var carouselItems = $(".video-player");
  for (i = 0; i < carouselItems.length; i++) {
    var video = carouselItems[i];
    videoList.push(video);
    captionsList.push(video.getAttribute("caption"));
  }
  videoRef = videoList[0];
  createVideo(videoRef);
  document
    .getElementsByClassName("carousel-control-prev-icon")[0]
    .addEventListener("click", function () {
      mudarVideo("-");
    });

  document
    .getElementsByClassName("carousel-control-next-icon")[0]
    .addEventListener("click", function () {
      mudarVideo("+");
    });
};

function mudarVideo(action) {
  var index = videoList.indexOf(videoRef);
  if (action === "+") {
    index += 1;
    if (index > videoList.length - 1) {
      index = 0;
    }
  } else {
    index -= 1;
    if (index < 0) {
      index = videoList.length - 1;
    }
  }
  videoRef = videoList[index];
  console.debug(
    "Posição no carrosel: " +
      index +
      "; Youtube video id: " +
      videoRef.getAttribute("data-video-id")
  );
  player.loadVideoById({
    videoId: videoRef.getAttribute("data-video-id"),
  });

  atualizarCaption();
}

function createVideo(video) {
  var youtubeScriptId = "youtube-api";
  var youtubeScript = document.getElementById(youtubeScriptId);

  var tag = document.createElement("script");
  var firstScript = document.getElementsByTagName("script")[0];

  tag.src = "https://www.youtube.com/iframe_api";
  tag.id = youtubeScriptId;
  firstScript.parentNode.insertBefore(tag, firstScript);

  var videoId = video.getAttribute("data-video-id");

  atualizarCaption();

  window.onYouTubeIframeAPIReady = function () {
    window.player = new window.YT.Player(video, {
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0,
        controls: 1,
        mute: 1,
      },
    });
  };
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === 0) {
    mudarVideo("+");
  }
}

function atualizarCaption() {
  var caption = videoRef.getAttribute("caption");
  console.debug("Valor do caption: " + caption);

  var carouselCaption = $(".carousel-caption")[0];
  carouselCaption.textContent = caption;
}
