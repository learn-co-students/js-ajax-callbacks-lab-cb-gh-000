$(document).ready(function () {});

function searchRepositories() {
	var username = document.getElementById('searchTerms').value;
	var gitUrl = `https://api.github.com/users/${username}/repos`;

	$('#results').empty();
	$('#errors').empty();

	$.get(gitUrl)
		.done(data => {
			const src = $('#repository-template').html();
			const template = Handlebars.compile(src);

			$("#results").html(template(data));
		})
		.fail(error => {
			displayError()
		})
};

function showCommits(element) {
	const repoName = element.dataset.repository;
	const userName = element.dataset.username;
	const repoLink = `https://api.github.com/repos/${userName}/${repoName}/commits`;

	$('#details').empty();
	$('#errors').empty();

	$.get(repoLink)
		.done(data => {
			const src = $('#repo-commits-template').html();
			const template = Handlebars.compile(src);

			$("#details").html(template(data));
		})
}

function displayError() {
	$("#errors").html(`Something went wrong! Error message: ${error.responseJSON.message}`)
}

document.addEventListener("DOMContentLoaded", function (e) {
	Handlebars.registerPartial("authorPartial", $('#author-partial-template').html());
})
