(function(){
    'use strict';

    var titleUnderscore = document.querySelector('.srk-header-title-underscore');
    
    function tick() {
        titleUnderscore.classList.toggle('is-hidden');
    }

    setInterval(tick, 500);

}());
