$(document).ready(function () {
  //toggle between game and about pane
  $("#start-game").click(() => {
    $(".history").removeClass("show");
    $(".game").addClass("show");
  });

  $("#go-back").click(() => {
    $(".history").addClass("show");
    $(".game").removeClass("show");
  });

  //scroll to certain technology specific project
  $(".nav-icon").click((e) => {
    if (e.target.id == "python") {
      thumbnailSelect($("#fuji-thumbnail"), $("#fuji-content"));
    } else if (e.target.id == "css") {
      thumbnailSelect($("#creature-thumbnail"), $("#creature-content"));
    } else if (e.target.id == "html") {
      thumbnailSelect($("#static-thumbnail"), $("#static-content"));
    } else if (e.target.id == "js") {
      thumbnailSelect($("#game-thumbnail"), $("#game-content"));
    }
  });

  //open project descriptions
  $(".creature-thumbnail").click(() => {
    thumbnailSelect($("#creature-thumbnail"), $("#creature-content"));
  });

  $("#fuji-thumbnail").click(() => {
    thumbnailSelect($("#fuji-thumbnail"), $("#fuji-content"));
  });

  $(".static-thumbnail").click(() => {
    thumbnailSelect($("#static-thumbnail"), $("#static-content"));
  });

  $(".api-thumbnail").click(() => {
    thumbnailSelect($("#api-thumbnail"), $("#api-content"));
  });

  $(".game-thumbnail").click(() => {
    thumbnailSelect($("#game-thumbnail"), $("#game-content"));
  });

  //open contact modal
  $(".contact-me").click(() => {
    $("#contactModal").modal("toggle");
  });

  //detect if using mobile device and if not allow user to play game
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $(".start-game").addClass("show");
  } else {
    $(".game").remove();
  }

  //=============================================
  //Thumbnail logic
  //=============================================
  const thumbnailSelect = (thumbnail, content) => {
    $(".thumbnail").each(function () {
      if ($(this)[0].id === thumbnail[0].id) {
        $(this).addClass("selected");
        localStorage.setItem("selected-thumbnail", thumbnail);
      } else {
        $(this).removeClass("selected");
      }
    });

    $(".thumbnail-content").each(function () {
      if ($(this)[0].id === content[0].id) {
        $(this).addClass("show");
        localStorage.setItem("thumbnail-content", content);
      } else {
        $(this).removeClass("show");
      }
    });
  };

  // Open last selected thumbnail
  const getSelectedThumbnail() {
    let thumbnail = localStorage.getItem('selected-thumbnail') || 0;
    let content = localStorage.getItem('thumbnail-content') || 0;

    if (thumbnail && content) thumbnailSelect(thumbnail, content);
  }
  
  window.addEventListener("load", getSelectedThumbnail);
});
