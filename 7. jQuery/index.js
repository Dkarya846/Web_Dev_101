$("h1").css("color", "green");

$(document).keypress(function (event) {
  $("h1").text(event.key);
});

$("h1").on("mouseover", () => {
  $("h1").slideUp();
});

$("h1").on("mouseout", () => {
  $("h1").slideDown();
});
