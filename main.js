function letsGo() {

  $("header").hide();
}

function getVerses(reference, version, place) {
  document.getElementById('result' + place).display = 'none';
  url = 'https://api.biblia.com/v1/bible/content/' + version + '.txt?passage=' + reference + '&callback=myCallbackFunction&key=0614e143e10e4ae8137025c89e64a67d';
  fetch(url)
      .then(response => response.text())
      .then(result => {
          if (result != '') {
              document.getElementById('script' + place).innerHTML = result;
              document.getElementById('ref' + place).innerHTML = reference;
              document.getElementById('error' + place).style.display = 'none';
              var words = words = result.split(' ').length;
              
              var chars = result.split(' ');
              chars = chars.join('').length;

              var stats = document.getElementById('stats' + place);
              stats.style.display = 'initial';

              document.getElementById('words' + place).innerHTML = words;
              document.getElementById('chars' + place).innerHTML = chars;
          } else {
              document.getElementById('error' + place).style.display = 'block';
              document.getElementById('error' + place).innerHTML = 'It looks like there is a problem... try again!.';
              setTimeout(function () { document.getElementById('error' + place).style.display = "none" }, 5000);
          }
          document.getElementById('result' + place).display = 'block';
          return result;
      });
}
function start(place) {
  input = document.getElementById('search' + place).value;
  if (input != '') {
      var version = document.getElementById('translation' + place).value;
      getVerses(input, version, place);
  }
}
if (!navigator.onLine) {
  document.getElementById('error1').style.display = 'block';
  document.getElementById('error1').innerHTML = 'Check your internet connection';
} else {
  document.getElementById('error1').style.display = 'none';
}

document.getElementById("button1").addEventListener("click", function() {
  start(1);
  start(2);
});

document.getElementById("button0").addEventListener("click", function() {
  start(0);
});



function getLyrics(artist, title) {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {

  
  // if there are previous results, remove them 
  $("#results3").empty();
  
  // add the lyrics to the results section
  $("#results3").append(`${responseJson.lyrics}`);

  // display the results section
  $("#results3").removeClass("hidden");
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const artist = $("#query-artist").val();
    const title = $("#query-title").val();
    getLyrics(artist, title);
  });
}

$(watchForm);