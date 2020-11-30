$(document).ready(function () {
  //Open about dropdown close others
  $("#game-start").click(() => {
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
    $("#start-game").addClass("show");
  }

  //Functions
  let thumbnailSelect = (thumbnail, content) => {
    $(".thumbnail").each(function () {
      if ($(this)[0].id === thumbnail[0].id) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    });

    $(".thumbnail-content").each(function () {
      if ($(this)[0].id === content[0].id) {
        $(this).addClass("show");
      } else {
        $(this).removeClass("show");
      }
    });
  };
});
