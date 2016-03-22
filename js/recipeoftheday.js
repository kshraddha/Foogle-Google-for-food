$(document).ready(function () {

  var curr_date = new Date();
  var day = curr_date.getDay();
  var mins = curr_date.getMinutes();
  var seconds = curr_date.getSeconds();
  var sum = day + mins + seconds;
  var mod = sum % 10;
  var eurl = "text/recipe_of_the_day.json";
  $.ajax({
    url: eurl,
    dataType: "json",
    success: function (response) {
      var recipe_name = response.Recipe[mod].name;
      var recipe_author = response.Recipe[mod].by;
      var recipe_img = response.Recipe[mod].image;
      var recipe_link = response.Recipe[mod].link;
      $('#recipe_day_name').append(recipe_name);
      $('#recipe_day_author').append(recipe_author);
      $('#recipe_day_image').css("background-image", "url(" + recipe_img + ")");
      $('#recipe_day_link').attr("href", recipe_link);
    }
  });
});