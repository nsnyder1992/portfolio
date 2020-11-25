$(document).ready(function () {
  //Open about dropdown close others
  $("#game-start").click(function () {
    $(".history").removeClass("show");
    $(".game").addClass("show");
  });

  $("#go-back").click(function () {
    $(".history").addClass("show");
    $(".game").removeClass("show");
  });

  function resizeDiv() {
    let maxHeight = 0;

    $("div.max-size").each(function (index) {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });

    $("div.side-nav-layout").height(maxHeight + 20);
  }

  resizeDiv();

  $(window).resize(function () {
    resizeDiv();
  });
});
