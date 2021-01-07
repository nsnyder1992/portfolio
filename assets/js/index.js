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
    //for each thumbnail check id is same as selected and update and deselect others
    $(".thumbnail").each(function () {
      if ($(this)[0].id === thumbnail[0].id) {
        $(this).addClass("selected");

        //store element id in local storage to use later to select on page refresh
        localStorage.setItem("selected-thumbnail", $(this)[0].id);
      } else {
        $(this).removeClass("selected");
      }
    });

    //for each thumbnail content check id is same as selected and update and deselect others
    $(".thumbnail-content").each(function () {
      if ($(this)[0].id === content[0].id) {
        $(this).addClass("show");

        //store element id in local storage to use later to select on page refresh
        localStorage.setItem("thumbnail-content", $(this)[0].id);
      } else {
        $(this).removeClass("show");
      }
    });
  };

  //load last selected thumbnail in this case thumbnail and content parameters refer to the id of the element
  const loadLastThumbnail = (thumbnail, content) => {
    //select thumbnail based on id given to the funciton
    $(".thumbnail").each(function () {
      if ($(this)[0].id === thumbnail) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    });

    //select content based on id given to the funciton
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

  //on load get last selected thumbnail and content and display them
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
    let tab = localStorage.getItem("selected-thumbnail") || false;
    let pageVerticalPosition =
      tab === "api-thumbnail"
        ? localStorage.getItem("pageVerticalPosition") || 0
        : 0;

    window.scrollTo(0, pageVerticalPosition);
  };

  window.addEventListener("load", repositionPage);

  //=============================================
  // Skill"z" Chart
  //=============================================
  // var ctx = document.getElementById("skillz-chart").getContext("2d");
  // Chart.defaults.global.defaultFontColor = "white";
  // var myChart = new Chart(ctx, {
  //   type: "horizontalBar",
  //   data: {
  //     labels: [
  //       "Python",
  //       "Javascript",
  //       "HTML",
  //       "CSS",
  //       "IoT Cloud",
  //       "IoT Hardware",
  //       "Linux",
  //       "Machine Learning",
  //       "C#",
  //     ],
  //     datasets: [
  //       {
  //         label: "Skills",
  //         data: [4, 4, 3, 3, 3, 4, 3, 1, 1],
  //         backgroundColor: "rgba(194, 126, 63, 0.2)",
  //         borderColor: "rgba(194, 126, 63, 1)",
  //         borderWidth: 2,
  //       },
  //     ],
  //   },
  //   options: {
  //     scales: {
  //       xAxes: [
  //         {
  //           ticks: {
  //             beginAtZero: true,
  //             max: 5,
  //             stepSize: 1,
  //             callback: function (value, index, values) {
  //               let str = "";
  //               if (value <= 5 && value > 4) {
  //                 str = "Expert";
  //               } else if (value <= 4 && value > 3) {
  //                 str = "Advanced";
  //               } else if (value <= 3 && value > 2) {
  //                 str = "Intermediate";
  //               } else if (value <= 2 && value > 1) {
  //                 str = "Skilled";
  //               } else if (value <= 1 && value > 0) {
  //                 str = "Beginner";
  //               } else {
  //                 str = "";
  //               }
  //               return str;
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     legend: {
  //       labels: {
  //         padding: 10,
  //       },
  //     },
  //   },
  // });
});
