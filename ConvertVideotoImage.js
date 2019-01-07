function readSingleFile(e) {
  console.log('hit');
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    console.log(contents);
  };
  reader.readAsText(file);
}
document.getElementById('myFile').addEventListener('change', readSingleFile, false);
function takeinput (){
    var url = document.getElementById('url').value
    var req = $.ajax('/getFrames',{
        'method': 'GET'
    });
    req.done(function(data){
        console.log(data)
    });
    
}
