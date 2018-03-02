$(document).ready(function() {
  getData();
});

function getData() {
  var streamList = ["dansgaming", "freecodecamp", "purgegamers", "day9tv", "relaxbeats", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (var i = 0; i < streamList.length; i++) {
    var strmUrl = createApiCall("streams", streamList[i]);
    var chanUrl = createApiCall("channels", streamList[i]);
    $.when(
      $.getJSON(strmUrl),
      $.getJSON(chanUrl)
    ).done(function(strmData, chanData) {
      createPage(filterData(strmData, chanData));
    });
  }
}

function createPage(data) {
  var $logo = $("<img>").addClass("strm_logo").attr("alt", data.display_name + " Logo").attr("src", data.logo);
  var $name = $("<a>").addClass("strm_name").attr("href", data.url).text(data.display_name);
  var $status = $("<p>").addClass("strm_status").text(data.status);
  var $strmText = $("<div>").addClass("strm_text").append($name).append($status)
  var $strmContainer = $("<div>").addClass("strm_container").append($logo).append($strmText);
  $(".container").append($strmContainer);
}

function filterData(sData, cData) {
  var use;
  if (sData[0].stream !== null) {
    use = sData[0].stream.channel;
  } else {
    use = cData[0];
    use.status = "Offline";
  }
  for (var key in use) {
    if (key != "logo" && key != "status" && key != "url" && key != "display_name") {
      delete use[key];
    }
    return use;
  }
}

function createApiCall(call, channel) {
  return "https://wind-bow.gomix.me/twitch-api/" + call + "/" + channel + "?callback=?";
}