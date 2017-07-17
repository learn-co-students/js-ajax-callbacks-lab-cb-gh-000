function searchRepositories(){
  const username = document.getElementById('searchTerms').value;
  const url = `https://api.github.com/users/${username}/repos`;
  $('#results').empty(); //Clear any previous display data
  $('#errors').empty(); //Clear any previous error messags
  $.get(url)
    .done(data => {
      console.log(data);
      const src = document.getElementById('repository-template').innerHTML;
      const template = Handlebars.compile(src);
      $('#results').append(template(data));
    })
    .fail(error => {
      displayError();
    });
}
function getCommits(el){
  const repo = el.dataset.repository;
  const user = el.dataset.username;
  const url = `https://api.github.com/repos/${user}/${repo}/commits`;
  $('#details').empty(); //Clear any previous display data
  $('#errors').empty(); //Clear any previous error messages
  $.get(url).done(data => {
    console.log(data);
    const src = document.getElementById('commits-template').innerHTML;
    const template = Handlebars.compile(src);
    $('#details').append(template(data));
  }).fail(error => {
    displayError();
  });
}
function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
