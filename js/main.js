









zIndex = 100;

$('.pep').pep({
    useCSSTranslation: false,
    constrainTo: 'window',
    initiate: function(){
        zIndex ++;
        this.$el.css({ zIndex: zIndex });
    }
});





