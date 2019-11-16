$(document).ready(function() {
  // build day
  // getting an error with moment so using Date for now...
  //var currHour = moment.hour();
  var currHour = new Date();
  currHour = currHour.getHours();

  // use static array for now. use moment methods later.
  var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

  for (var i = 0; i < hours.length; i++) {
    var newRow = $("<div>");
    var newHour = $("<div>");
    var newTimeBlock = $("<div>");
    var newSaveBtn = $("<div>");

    newRow.addClass("row");

    newHour.addClass("hour col-md-2");
    if (i > 2) {
      newHour.text(hours[i] + "PM");
    } else {
      newHour.text(hours[i] + "AM");
    }
    newRow.append(newHour);

    if (hours[i] < currHour) {
      newTimeBlock.addClass("time-block past col-md-8");
    } else if (hours[i] === currHour) {
      newTimeBlock.addClass("time-block present col-md-8");
    } else if (hours[i] > currHour) {
      newTimeBlock.addClass("time-block future col-md-8");
    }
    newRow.append(newTimeBlock);

    newSaveBtn.addClass("save-btn col-md-2");
    newSaveBtn.html('<i class="far fa-calendar-plus"></i>');
    newRow.append(newSaveBtn);

    $(".container").append(newRow);
  }
});
