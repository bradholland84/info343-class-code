<<<<<<< HEAD

angular.module('Movies', ['ui.router'])
    .factory('moviesJSON', function($http) {
        return $http.get('data/movies-2014.min.json');
    })
    .config(function($stateProvider, $urlRouterProvider) {
=======
/*
    script file for the movies.html file
*/

//define a new Angular module named 'MoviesApp'
//that depends upon the 'ui.router' module
angular.module('MoviesApp', ['ui.router'])
    //define the ratings map as a constant so that it can be injected
    //into any controller; this map converts a textual rating to a
    //number that we can use to do proper sorting by rating severity
    .constant('ratingsMap', {
        'Not Rated': 0,
        'G': 1,
        'PG': 2,
        'PG-13': 3,
        'R': 4,
        'NC-17': 5,
        'X': 6
    })
    //define a factory for getting our movies JSON
    //a factory is a function that returns something that you want to share
    //amongst several controllers; we give it a name and that name can be
    //added to any controller's initialization function
    .factory('moviesJSON', function($http, ratingsMap) {
        //use Angular's $http service to asynchronously fetch the movies json
        return $http.get('data/movies-2014.min.json')
            .then(function(results) {
                //when that finishes, the `results` parameter here has info about
                //the entire HTTP response, and the data itself can be accessed via
                //the `data` property of the `results` object

                //use map() to transform the return array of movies by adding
                //a `ratingOrdinal` property that we can use to sort by
                //rating severity, and a stable id
                //we need the stable id so that we can switch to a detail
                //view of the movie
                //map() will return a new array of the same length where
                //each element is set to whatever our function returns
                return results.data.map(function(movie, index) {
                    movie.ratingOrdinal = ratingsMap[movie.rating];
                    movie.id = index;
                    return movie;
                });
            });
    })
    //add a module configuration function to setup the UI routing
    //we tell Angular to inject two services from the ui.router module
    .config(function($stateProvider, $urlRouterProvider) {
        //$stateProvider allows us to define various states, each of
        //which represents a different view; we specify a local URL
        //for each state that appears in the browser's address bar,
        //a url for the Angular view that should be put into the
        //empty div in movies.html, and the Angular controller to
        //invoke for that view
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        $stateProvider
            .state('list', {
                url: '/movies',
                templateUrl: 'views/movies-list.html',
                controller: 'MoviesController'
            })
            .state('detail', {
<<<<<<< HEAD
                url: '/movies:index',
=======
                url: '/movies/:movieId', //movie.id will be put on the end of the URL
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'
            });

<<<<<<< HEAD
        $urlRouterProvider.otherwise('/movies');
    })

    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(result) {
            $scope.movie = result.data[$stateParams.index];
        })
    })

    .controller('MoviesController', function($scope, moviesJSON) {
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };

        moviesJSON.then(function(results) {
                $scope.movies = results.data.map(function(movie) {
                    movie.ratingOrdinal = ratingsMap[movie.rating];
                    return movie;
                });

                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));
            });

        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        }
    });
=======
        //if the user changes the local URL in the browser address bar
        //to something other than what we defined above, just reset it
        //to #/movies
        $urlRouterProvider.otherwise('/movies');
    })
    //controller for the movies list
    //we now let Angular inject the movies JSON from the factory defined above
    .controller('MoviesController', function($scope, moviesJSON) {
        //moviesJSON is still a promise, so we use .then() to register a function
        //that should be called once the data is available
        moviesJSON.then(function(data) {
            $scope.movies = data;
            //generate an array of the unique distributors so we can let
            //users filter by distributor name
            $scope.distributors = _.sortBy(_.uniq(_.pluck($scope.movies, 'distributor')));
        });

        //sets the property to sort by
        $scope.setSortProp = function(propName) {
            //if we are already sorting by that property
            //reverse the sort order (ascending vs descending)
            if ($scope.sortProp === propName) {
                $scope.sortReverse = !$scope.sortReverse;
            }
            else {
                //set the new sort prop and reset the sort order to ascending
                $scope.sortProp = propName;
                $scope.sortReverse = false;
            }
        }; //setSortProp
    })
    //controller for the movie details view
    //we again tell Angular to inject the movies JSON, which will be the same
    //data we already fetched from the server for the list view
    .controller('MovieDetailController', function($scope, $http, $stateParams, moviesJSON) {
        $scope.posterUrl = 'img/default-poster.png';
        //even though we already have the data, moviesJSON is still a promise,
        //so we use .then() to register a function to be called with the results
        moviesJSON.then(function(data) {
            //the $stateParams service lets us get the movie ID off the local URL
            //so we can find the particular movie we are showing
            $scope.movie = data[$stateParams.movieId];

            //also get details from the Open Movie Database
            $http.get('http://www.omdbapi.com/', {
                params: {
                    t: $scope.movie.title,
                    y: new Date($scope.movie.released).getUTCFullYear()
                }
            })
                .then(function(results) {
                    $scope.posterUrl = results.data.Poster;
                });
        });

    }); //MoviesApp module
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
