/**
 * application script for the states.html
 */

document.addEventListener('DOMContentLoaded', function () {
   'use strict';

    function addStates(states, listElement) {
        listElement.innerHTML = '';
        states.forEach(function (state) {
           //console.log(state);
            var li = document.createElement('li');
            li.textContent = state.name;
            listElement.appendChild(li);
        });
    }

    var statesFilter = document.getElementById('state-filter-field');
    statesFilter.addEventListener('keyup', function () {
        var filter = this.value.toLowerCase();
        //console.log(filter);
        var filteredStates = usaStates.filter(function (state) {
           return state.name.toLowerCase().indexOf(filter) >= 0;
        });
        addStates(filteredStates, statesUL);
    });
    var statesUL = document.getElementById('states-list');
    addStates(usaStates, statesUL);
});
