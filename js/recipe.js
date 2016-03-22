var url_items, url_directions, a;

function load_details(a) {
  $.ajax({
    type: "GET",
    url: "text/" + a + "_items.txt",
    dataType: "text",
    success: function (data) {
      var myLines = data.split(/\r\n|\n/);
      for (var i = 1; i < myLines.length; i++) {
        $('.items_list').append('<li>' + myLines[i] + '</li>');
      }

    }
  });

  $.ajax({
    type: "GET",
    url: "text/" + a + "_directions.txt",
    dataType: "text",
    success: function (data) {
      var myLines1 = data.split(/\r\n|\n/);
      var a = [];
      for (var i = 0; i < myLines1.length; i++) {
        a.push(myLines1[i]);
        console.log(myLines1[i]);
        $('.step' + (i + 1) + '_content').append('<div>' + (i + 1) + '. ' + myLines1[i] + '</div><br>');
      }

    }
  });
}