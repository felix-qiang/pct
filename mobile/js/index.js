$(function(){
    $('.btn_close').on('click', function () {
        $('.modal').hide();
    });
    $('[type="submit"]').on('click',function(){
        $('.modal').show();
    });
});