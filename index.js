// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

//console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
//console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate(array) {
	return array.sort(function(a, b){return new Date(b.fields.date_debut) - new Date(a.fields.date_debut);});
}
var sortedFilmingLocations = sortFilmingLocationsByStartDate(filmingLocations);

//console.log(sortedFilmingLocations[0], sortedFilmingLocations[sortedFilmingLocations.length-1]);

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	return filmingLocations.filter((check)=>check.fields.annee_tournage==2020).length;
}
//console.log(getFilmingLocationsNumber2020())

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	var count = {}
	filmingLocations.forEach(function(a) {
		var key = a.fields.annee_tournage
		count[key] = (count[key] || 0) + 1
	})
	return count
}
//console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	var count = {}
	filmingLocations.forEach(function(a) {
		var key = a.fields.ardt_lieu
		count[key] = (count[key] || 0) + 1
	})
	return count
}
//console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	var count = {}
	filmingLocations.forEach(function(a) {
		var key = a.fields.nom_tournage
		count[key] = (count[key] || 0) + 1
	})

	let sortable = [];
	for (var a in count) {
		sortable.push([a, count[a]]);
	}

	sortable.sort(function(a, b) {
		return b[1] - a[1];
	});

	return sortable
}
//console.log(getFilmLocationsByFilm())

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	return getFilmLocationsByFilm().length
}
//console.log(getNumberOfFilms())

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let locations = []
	for(var i of filmingLocations){
		if(i.fields.nom_tournage === "LRDM - Patriot season 2"){
			locations.push(i.fields.adresse_lieu)
		}
	}
	return locations

}
//console.log(getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	const films = {}
	for (let i of filmingLocations) {
		let key = i.fields;
		if (favoriteFilmsNames.includes(key.nom_tournage))
		{
			if (!films[key.nom_tournage]){
				films[key.nom_tournage]=[];
			}
			films[key.nom_tournage].push(key.ardt_lieu);
		}
	}
	return [films];
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

//console.log(getFavoriteFilmsLocations(favoriteFilms))

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	let count = {}
	for (var i=0; i<filmingLocations.length; i++) {
		var key = filmingLocations[i];
		if (!count[key.fields.nom_tournage]){
			count[key.fields.nom_tournage]=[]
		}
		count[key.fields.nom_tournage].push(key.fields.adresse_lieu);

	}
	return count
}

//console.log(getFilmingLocationsPerFilm())

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	var count = {}
	filmingLocations.forEach(function(a) {
		var key = a.fields.type_tournage
		count[key] = (count[key] || 0) + 1
	})
	return count
}

//console.log(countFilmingTypes())

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	let count = countFilmingTypes()
	let sortable = [];
	for (var a in count) {
		sortable.push([a, count[a]]);
	}

	sortable.sort(function(a, b) {
		return b[1] - a[1];
	});

	return sortable
}

//console.log(sortedCountFilmingTypes())
/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
function longestDuration(){
	return filmingLocations.sort(function(a, b){return (new Date(b.fields.date_fin) - new Date(b.fields.date_debut)) - (new Date(a.fields.date_fin) - new Date(a.fields.date_debut))});
}
//console.log(longestDuration()[0], duration(new Date(longestDuration()[0].fields.date_fin).getTime() - new Date(longestDuration()[0].fields.date_debut).getTime()))
// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result

function averageDuration() {
	let total = 0;
	for (var i of filmingLocations) {
		let key = i.fields
		let d1 = new Date(key.date_fin);
		let d2 = new Date(key.date_debut);
		let d3 = d1.getTime()-d2.getTime()
		total += d3;
	}
	return duration(total/filmingLocations.length);
}

console.log(averageDuration())