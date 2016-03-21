$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "auto.txt",
    dataType: "text",
    success: function (data) {
      var myLines = data.split(/\r\n|\n/);
      var a = [];
      for (var i = 1; i < myLines.length; i++) {
        a.push(myLines[i]);
      }
      $("#query").autocomplete({
        source: function (request, response) {
          var results = $.ui.autocomplete.filter(a, request.term);
          response(results.slice(0, 10));
        }
      });
    }
  });
});