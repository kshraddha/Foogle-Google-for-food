  var recipe_res_num = 0;
  var q;
  var vid_click_time = 0;
  var token;

  function loadinfo(e) {
    e.preventDefault();
    q = $('#query').val();
    if (q == '') {
      return false;
    } else {
      window.open("result.html", "_self");
      localStorage.setItem("shraddha_query", q);
    }
  }

  q = localStorage.getItem("shraddha_query");

  function query_text() {
    $('.query_text').html(q);
  }

  function edamam() {
    var eurl = 'https://api.edamam.com/search?q=' + q + '&app_id=6cadc468&app_key=5ee0102fb506873497b4e68640373cba&from=' + recipe_res_num + '&to=' + (recipe_res_num + 6) + '';

    var RequestTimeout = setTimeout(function () {
      $('#edamam').append('<div class="not_found">Failed to get results</div>');
      $('.rec_btn_div').css("display", "none");
    }, 8000);

    $.ajax({
      url: eurl,
      dataType: "jsonp",
      jsonp: "callback",
      success: function (response) {
        var count = response.count;

        if (count == 0 && recipe_res_num == 0) {
          $('#edamam').append('<div class="not_found">No Results found</div>');
        }
        var articleList2 = response.hits;
        for (var i = 0; i < articleList2.length; i++) {
          var em = articleList2[i];
          var calories = Math.ceil(em.recipe.calories);
          $('#edamam').append('<div class="col-md-4 col-xs-6 recipe_col"><a target="_blank" href="' + em.recipe.url + '">' + '<div class="bg_col">' + '<img class="recipe_img" src="' + em.recipe.image + '">' + '<div class="recipe_content"><h4 class="recipe_name">' + em.recipe.label + '</h4>' + '<h5 class="recipe_cal">CALORIES: ' + calories + '</h5>' + '<a class="recipe_url" target="_blank" href="' + em.recipe.url + '">By: <h5 class="recipe_url_c">' + em.recipe.source + '<h5></a></div>' + '</div>' +
            '</a></div>');
        };
        $('.rec_btn_div').css("display", "block");
        if (count < recipe_res_num + 6) {
          $('.rec_btn_div').css("display", "none");
        }
        recipe_res_num = recipe_res_num + 6;
        if (recipe_res_num > 28) {
          $('.rec_btn_div').css("display", "none");
        }
        clearTimeout(RequestTimeout);
      }
    });

  }

  function keyWordsearch() {
    gapi.client.setApiKey('AIzaSyCkrOf8PIkCk6K7aluLZFctNM32KmLMsjI');
    gapi.client.load('youtube', 'v3', function () {
      makeRequest();
    });

  }

  function makeRequest() {
    var RequestTimeout = setTimeout(function () {
      $('#video_res').append('<div class="not_found">Failed to get results</div>');
      $('.vid_btn_div').css('display', 'none');
    }, 8000);
    $('.video_btn').click(function () {
      $(this).data('clicked', true);
      vid_click_time = vid_click_time + 1;
    });

    if ($('.video_btn').data('clicked')) {
      var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet',
        maxResults: 6,
        pageToken: token
      });
    } else {
      var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet',
        maxResults: 6
      });
    }

    request.execute(function (response) {
      token = response.nextPageToken;
      var num_items = response.result.items.length;

      var srchItems = response.result.items;
      $.each(srchItems, function (index, item) {
        vidTitle = item.snippet.title;
        vidId = item.id.videoId;
        vidChannel = item.snippet.channelTitle;
        $('#video_res').append('<div class="col-md-4 col-xs-6 video_content"><div class="iframe"><iframe id="v_player" type="text/html" src = "http://www.youtube.com/embed/' + vidId + '?&showinfo=0" frameborder = "0" allowfullscreen="allowfullscreen"></iframe></div>' + '<div class="video_info">' + '<h4 class="vid_title">' + vidTitle + '</h4>' + '<h5 class="vid_channel">CHANNEL: ' + vidChannel + '</h5>' + '</div>' + '</div>');
      });
      $('.vid_btn_div').css('display', 'block');
      if (num_items == 0) {
        $('#video_res').append('<div class="not_found">No Results found</div>');
        $('#video').css("background-color", "#edefed");
        $('.vid_btn_div').css('display', 'none');
      }
      if (vid_click_time > 3) {
        $('.vid_btn_div').css('display', 'none');
      }
    });
    clearTimeout(RequestTimeout);
  }