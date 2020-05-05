$('button').click(function(){
  var command = event.target.id;
  //alert(command);
  var url = '/' + command;
  //console.log(url);
  $.get(url, function(data, status) {
    console.log("Data: " + data +"\nStatus: " + status);
  });
});
