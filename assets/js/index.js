$(document).ready(function () {
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
    } else if (e.target.id == "database") {
      thumbnailSelect($("#fuji-thumbnail"), $("#fuji-content"));
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

  $(".device-thumbnail").click(() => {
    thumbnailSelect($("#device-thumbnail"), $("#device-content"));
  });

  $(".serverless-thumbnail").click(() => {
    thumbnailSelect($("#serverless-thumbnail"), $("#serverless-content"));
  });

  $(".game-thumbnail").click(() => {
    thumbnailSelect($("#game-thumbnail"), $("#game-content"));
  });

  //open contact modal
  $(".contact-me").click(() => {
    $("#contactModal").modal("toggle");
  });

  //Carousel delay

  $("#deviceCarousel").carousel({
    interval: 10000,
  });

  //=============================================
  //Thumbnail logic
  //=============================================
  const thumbnailSelect = (thumbnail, content) => {
    $(".thumbnail").each(function () {
      if ($(this)[0].id === thumbnail[0].id) {
        $(this).addClass("selected");
        localStorage.setItem("selected-thumbnail", $(this)[0].id);
      } else {
        $(this).removeClass("selected");
      }
    });

    $(".thumbnail-content").each(function () {
      if ($(this)[0].id === content[0].id) {
        $(this).addClass("show");
        localStorage.setItem("thumbnail-content", $(this)[0].id);
      } else {
        $(this).removeClass("show");
      }
    });
  };

  const loadLastThumbnail = (thumbnail, content) => {
    $(".thumbnail").each(function () {
      if ($(this)[0].id === thumbnail) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    });

    $(".thumbnail-content").each(function () {
      if ($(this)[0].id === content) {
        $(this).addClass("show");
      } else {
        $(this).removeClass("show");
      }
    });
  };

  // Open last selected thumbnail
  const getSelectedThumbnail = () => {
    let thumbnail = localStorage.getItem("selected-thumbnail") || false;
    let content = localStorage.getItem("thumbnail-content") || false;

    if (thumbnail && content) loadLastThumbnail(thumbnail, content);
  };

  window.addEventListener("load", getSelectedThumbnail);

  //=============================================
  //Auto-Scroll logic on load
  //=============================================
  // Save Y Offset Position to localStorage
  const recordVerticalOffset = () => {
    localStorage.setItem("pageVerticalPosition", window.scrollY);
  };

  // Only save window position after scrolling stops
  const throttleScroll = (recordVerticalOffset, delay) => {
    let time = Date.now();

    return () => {
      if (time + delay - Date.now() < 0) {
        recordVerticalOffset();
        time = Date.now();
      }
    };
  };

  // Scroll Event Listener
  window.addEventListener("scroll", throttleScroll(recordVerticalOffset, 1000));

  // DESTINATION PAGE
  // ================

  const repositionPage = () => {
    let pageVerticalPosition =
      localStorage.getItem("pageVerticalPosition") || 0;

    window.scrollTo(0, pageVerticalPosition);
  };

  window.addEventListener("load", repositionPage);

  //=============================================
  // TODO: Paginate Thumbnails
  //=============================================
  // //paginate project thumbnails
  // if ($(".thumbnail").length > 5) {
  //   let thumbnails = document.querySelectorAll(".thumbnail");

  //   for (let i = 0; i < 5; i++) thumbnails[i].classList.add("show");
  // }

  // // //breakpoints
  // // let lg = 875;
  // // let md = 600;
  // // let sm = 500;
  // // let numThumbnails = 5;

  // // $("#next-thumbnails").click(() => {
  // //   //define indexes for loop
  // //   let startIndex = $(".thumbnail").index(
  // //     $(".pageable-thumbnails").find(".show")
  // //   );
  // //   let leftOver = $(".thumbnail").length - startIndex - numThumbnails;
  // //   let showIndex =
  // //     leftOver > numThumbnails
  // //       ? startIndex + numThumbnails
  // //       : startIndex + leftOver - 1;
  // //   let endIndex = showIndex + numThumbnails;

  // //   //get thumbnails
  // //   let thumbnails = document.querySelectorAll(".thumbnail");

  // //   //loop through thumnails and remove show class from last show and add show to new
  // //   for (let i = startIndex; i <= endIndex; i++) {
  // //     i <= showIndex
  // //       ? thumbnails[i].classList.remove("show")
  // //       : thumbnails[i].classList.add("show");
  // //   }
  // // });

  // // $("#prev-thumbnails").click(() => {
  // //   //define indexes for loop
  // //   let startIndex = $(".thumbnail").index(
  // //     $(".pageable-thumbnails").find(".show")
  // //   );
  // //   let leftOver = startIndex;
  // //   startIndex = startIndex > numThumbnails ? startIndex - numThumbnails : 0;
  // //   let showIndex =
  // //     leftOver > numThumbnails ? startIndex + numThumbnails - 1 : numThumbnails;
  // //   let endIndex = leftOver + (numThumbnails - 1);

  // //   //get thumbnails
  // //   let thumbnails = document.querySelectorAll(".thumbnail");

  // //   //loop through thumnails and remove show class from last show and add show to new
  // //   for (let i = startIndex; i <= endIndex; i++) {
  // //     i < showIndex
  // //       ? thumbnails[i].classList.add("show")
  // //       : thumbnails[i].classList.remove("show");
  // //   }
  // // });

  //resize thumbnails
  // function thumbnailResize() {
  //   if (window.innerWidth > lg) {
  //     numThumbnails = 5;
  //   } else if (window.innerWidth < lg && window.innerWidth > md) {
  //     numThumbnails = 4;
  //   } else if (window.innerWidth < md && window.innerWidth > sm) {
  //     numThumbnails = 3;
  //   }
  // }
  // window.addEventListener("resize", thumbnailResize);
});
