// ==UserScript==
// @name         Letterboxd List Shuffle
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a Shuffle button to a Letterboxd list.
// @author       Megane0103
// @match        https://letterboxd.com/*/watchlist/*
// @match        https://letterboxd.com/*/list/*/*
// @match        https://letterboxd.com/*/films/*
// @grant        none
// @license MIT; https://github.com/Megane0103/letterboxd-List-shuffle/blob/main/LICENSE
// @copyright 2023, Megane0103 (https://github.com/Megane0103)
// ==/UserScript==

(function() {
    'use strict';

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shuffleList() {
        const movieLinks = Array.from(document.querySelectorAll('ul.poster-list a[href^="/film/"]'));
        const shuffledLinks = shuffleArray(movieLinks);
        const randomLink = shuffledLinks[0].getAttribute('href');
        const newTab = window.open('https://letterboxd.com' + randomLink, '_blank');
        newTab.focus();
    }

    function addButton() {
        const actionsPanel = document.querySelector('section.actions-panel ul');
        const userPanelActions = document.querySelector('section#userpanel.actions-panel ul.navlist');
        const navlist = document.querySelector('ul.navlist');

        if (actionsPanel) {
            const shuffleButton = createShuffleButton();
            actionsPanel.insertBefore(shuffleButton, actionsPanel.firstChild);
        } else if (userPanelActions) {
            const shuffleButton = createShuffleButton();
            userPanelActions.insertBefore(shuffleButton, userPanelActions.firstChild);
        } else if (navlist) {
            const shuffleButton = createShuffleButton();
            navlist.insertBefore(shuffleButton, navlist.firstChild);
        }
    }

    function createShuffleButton() {
        const shuffleButton = document.createElement('li');
        shuffleButton.className = 'navitem';
        shuffleButton.innerHTML = '<a href="javascript:void(0);" class="navlink">Shuffle list</a>';
        shuffleButton.addEventListener('click', shuffleList);
        return shuffleButton;
    }

    addButton();
})();
