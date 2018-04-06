$(document).ready(function (){

});
function searchRepositories() {
  const repoName = document.getElementById('searchTerms').value
  const url = `https://api.github.com/search/repositories\?q=${repoName}`
  $.get(url, displayRepositories)
}
function displayRepositories(data) {
  // console.log(data)
  const src = $('#display-repositories-template').html()
  const template = Handlebars.compile(src)
  const repoList = template(data.items)
  document.getElementById('results').innerHTML = repoList
  // console.log(repoList)
}

function showCommits(el) {
  function displayCommits(data) {
    // console.log(data)
    const src = $('#show-commits-template').html()
    const template = Handlebars.compile(src)
    const commList = template(data)
    document.getElementById('details').innerHTML = commList
  }
  const url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
  $.get(url, displayCommits).fail(displayError)
  // console.log(el.dataset)
}

function displayError(error) {
  const message =  "<p>I'm sorry, there's been an error. Please try again.<p>"
  document.getElementById('errors').innerHTML = message
  // console.log(error)
}
