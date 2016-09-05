$(document).ready(function() {

    $(function() {

      //these functions are for open modals 

        $('#loginClicked').on('click', function(e) {
            Custombox.open({
                target: '#loginDiv',
                effect: 'fadein'
            });
            e.preventDefault();
        });

        $('#loginClickedMobile').on('click', function(e) {
            Custombox.open({
                target: '#loginDiv',
                effect: 'fadein'
            });
            e.preventDefault();
        });

        $('#registerClicked').on('click', function(d) {
            Custombox.open({
                target: '#registerDiv',
                effect: 'fadein'
            });
            d.preventDefault();
        });

        $('#registerClickedMobile').on('click', function(d) {
            Custombox.open({
                target: '#registerDiv',
                effect: 'fadein'
            });
            d.preventDefault();
        });
    });
});
