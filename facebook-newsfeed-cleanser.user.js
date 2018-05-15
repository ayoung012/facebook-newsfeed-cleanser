// ==UserScript==
// @name         Facebook Newsfeed Cleanser
// @namespace    http://adamyoung.in/
// @version      0.1
// @description  Remove everything but personal posts and photos from friends
// @author       Adam Young
// @match        https://www.facebook.com*
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

var a_identifier = 'a_osrsn5sd8';

function housekeeping()
{
    faces = document.getElementsByClassName(a_identifier);

    for (var f of faces) {
        if ((f.pathname.match(/\//g) || []).length != 1) {
            console.log(f.pathname);
            removeMatch(f, 'adv_counter');
            //console.log("MATCHED NOT FRIEND");
        }
    }

    st = document.getElementsByClassName('fcg');

    for (f of st) {
        if (f.textContent.match(/shared|commented|replied/g)) {
            removeMatch(f, 'unrel_counter');
            //console.log("MATCHED SHARED");
        }
    }
}

function removeMatch(f, type) {
    counter = document.getElementById(type);

    for(var i=0; i<50 && f.parentNode; f=f.parentNode, i++) {
        if (f.className == '_4ikz') {
            f.remove();
            counter.innerHTML = parseInt(counter.innerHTML) + 1;
            break;
        }
        //f.style.backgroundColor = 'red';
    }
}

function countHtml(id) {
    var adv = document.createElement("div");
    adv.id = id;
    adv.innerHTML = '0';
    adv.style.padding = '4px 10px';
    adv.style.fontSize = '8em';
    adv.style.color = 'red';


    return adv;
}

function createCounter()
{
    var newDiv = document.createElement("div");
    newDiv.id = 'blockCounter';
    newDiv.style.position = 'fixed';
    newDiv.style.top = '43px';
    newDiv.style.left = '0px';
    // and give it some content
    var newContent = document.createElement('h3');
    newContent.innerHTML = "Useless Shit blocked this session";
    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    newDiv.appendChild(document.createTextNode("Sponsored/Suggested/Pages"));
    newDiv.appendChild(countHtml('adv_counter'));
    newDiv.appendChild(document.createTextNode("Unrelated shares/comments"));
    newDiv.appendChild(countHtml('unrel_counter'));

    // add the newly created element and its content into the DOM
    var header = document.getElementById("pagelet_bluebar");
    document.getElementById('u_0_j').insertBefore(newDiv, header);
}

(function() {
    'use strict';

    createCounter();
    setInterval(housekeeping, 1000);


})();

