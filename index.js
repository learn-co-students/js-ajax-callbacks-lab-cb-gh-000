$(document).ready(function (){

});

var data;

function showCommits(el) {
  const reponame = el.dataset.repo;
  const username = el.dataset.user;
  $.get(`https://api.github.com/repos/${username}/${reponame}/commits`)
    .done(function(commits) {
      data = commits;
      console.log(commits);
      const commitsList = `<ul>${commits
        // .map(c => `<li><strong>${c.commit.author.name}</strong> - ${c.commit.message}</li>`)
        .map(c =>
          `<li>
          <p><strong>SHA:</strong>${c.sha}</p>
          <p><strong>Commited By</strong> ${c.commit.author.name}</p>
          <img src="${(c.author != null && 'avatar_url' in c.author) ? c.author.avatar_url : 'https://avatars1.githubusercontent.com/u/583231?s=400&v=4'}" height="32" width="32">
          <p><strong>Description:</strong> ${c.commit.message}</p>
          </li>`)
        .join("")}</ul>`;
        document.getElementById("details").innerHTML = commitsList;
    })
    .fail(displayError);

}

function showRepositories(query) {
  console.log(query);
  const repoList = `<ul>${query.items
    .map(r =>
      `<li>
        <h2><a target="_blank" href="${r.html_url}">${r.name}</a></h2>
        <section>
          <header><h4>Created By ${r.owner.login}</h4></header>
          <img src="${r.owner.avatar_url}" height="32" width="32">
        </section>
        <p>Watchers: ${r.watchers_count}</p>
        <p>Forks: ${r.forks_count}</p>
        <p>Issues: ${r.open_issues_count}</p>
        <a href="#" onclick="showCommits(this); return false;" data-user="${r.owner.login}" data-repo="${r.name}">Show Commits</a>
      </li>`)
    .join("")}</ul>`;
  document.getElementById("results").innerHTML = repoList;
}

function searchRepositories() {
  $.get(`https://api.github.com/search/repositories?q=${document.getElementById('searchTerms').value}`)
    .done(showRepositories)
    .fail(displayError);
}

function displayError() {
  document.getElementById("errors").innerHTML = `<p>I'm sorry, there's been an error. Please try again.</p>`;
}
