

var parallaxBox = $('#parallax-container');
var strength = 1,
    isMobile = false;

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}



function parallaxMove (parallaxContainer, x, y, boxWidth, boxHeight) {
    $(parallaxContainer).find('.parallax-layer').each(function() {
        var depth = $(this).data('depth');
        var moveX = ((boxWidth / 2) - x) * (strength * depth);
        var moveY = ((boxHeight / 2) - y) * (strength * depth);

        $(this).css({transform: "translate3d(" + moveX + "px, " + moveY + "px, 0)"});
        $(this).removeClass('is-out');
    });
}


function resetParallaxPosition (parallaxContainer) {
    $(parallaxContainer).find('.parallax-layer').each(function() {
        $(this).css({ transform: "translate3d( 0, 0, 0 )"});
        //$(this).addClass('is-out');
    });
    event.stopPropagation();
}

if(!isMobile) {

    parallaxBox.mousemove(function(event) {
        event.stopPropagation();
        event = event || window.event;
        var x = Math.floor(event.clientX - $(this).offset().left),
            y = Math.floor(event.clientY - $(this).offset().top),
            boxWidth = $(this).width(),
            boxHeight = $(this).height();

        parallaxMove(this, x, y, boxWidth, boxHeight);

    });

    parallaxBox.mouseleave(function(event) {
        if( !$(event.target).is($(this))) {
            resetParallaxPosition(this);
        }
    });

} else if(isMobile) {
    var elem = document.getElementById("view3d");

    window.addEventListener("deviceorientation", function(event) {
        event.stopPropagation();
        event = event || window.event;

        var rotatedY =  Math.min(Math.max(parseInt(Math.floor(event.gamma)), -45), 45),
            rotatedX = Math.min(Math.max(parseInt(Math.floor(event.beta)), -45), 45),
            boxWidth = parallaxBox.width(),
            boxHeight = parallaxBox.height();

        var moveX = ((boxWidth/2) * rotatedY) / 45;
        var moveY = ((boxWidth/2) * rotatedX) / 45;

        parallaxMove(parallaxBox, moveX, moveY, boxWidth, boxHeight);

    });
}










(function() {
    'use strict';

    var inDrag = false
        , dragElement = null
        , dragOffsetX = 0
        , dragOffsetY = 0
        , body = document.getElementsByTagName('body')[0];
    ;

    function dragHandler( event ) {
        if (event.button != 0) return;
        dragElement = event.target;
        var canDrag = dragElement.getAttribute('drag')
        ;
        while (!canDrag && dragElement.parentElement) {
            dragElement = dragElement.parentElement;
            canDrag = dragElement.getAttribute('drag');
        }
        if (!canDrag) return dragElement = false;
        dragOffsetX = event.clientX - dragElement.offsetLeft;
        dragOffsetY = event.clientY - dragElement.offsetTop;
        body.appendChild(dragElement);
        body.style.userSelect = 'none';
        inDrag = true;
    }

    function dragMove( event ) {
        if (!inDrag) return false;
        dragElement.style.left = event.clientX-dragOffsetX+'.px';
        dragElement.style.top = event.clientY-dragOffsetY+'.px';
    }

    function dragStop() {
        if (!inDrag) return;
        if (event.button != 0) return;
        inDrag = false;
        if ( (dragElement.offsetTop + dragElement.offsetHeight)<20) dragElement.style.top = 20 - dragElement.offsetHeight+'.px';
        if ( (dragElement.offsetLeft + dragElement.offsetWidth)<20) dragElement.style.left = 20 - dragElement.offsetWidth+'.px';
        if ( (dragElement.offsetTop+20)>window.innerHeight) dragElement.style.top = window.innerHeight - 20+'.px';
        if ( (dragElement.offsetLeft+20)>window.innerWidth) dragElement.style.left = window.innerWidth - 20+'.px';
        dragElement.zIndex = '10';
        body.style.userSelect = '';
        dragElement = null;
    }

    function init() {
        var dragableItems = document.querySelectorAll('[drag]')
        ;
        for (let itemID=0; itemID<dragableItems.length; itemID++) {
            let item = dragableItems[itemID];
            item.className+=' dragable';
        }
        window.addEventListener('mousedown', dragHandler );
        window.addEventListener('mouseup', dragStop );
        window.addEventListener('mousemove', dragMove );
    }

    window.addEventListener('load', init);
})();