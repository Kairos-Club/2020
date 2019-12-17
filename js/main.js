





zIndex = 100;

$('.pep').pep({
    useCSSTranslation: false,
    constrainTo: 'window',
    initiate: function(){
        zIndex ++;
        this.$el.css({ zIndex: zIndex });
    }
});



for (var i = 0; i < 5; i++) {
    $('.main').append('<div class="box"></div>');
}
$( '.icon, .avatar' ).each(function( index ) {
    $(this).css({
        left : Math.random() * ($('.main').width() - $(this).width()),
        top : Math.random() * ($('.main').height() - $(this).height())
    }).addClass('up');
});