$(function(){
    var url ='http://ticket.e-to-china.com/';

    $('.btn_close').on('click', function () {
        $('.modal').hide();
    });
    $('#vilate').on('click',function () {
        var phone = $('#phone').val();
        $.ajax({
            url:url+'Index/index/get_code/',
            type:'get',
            data:phone,
            success:function (data) {
                $('#msg').text(data.msg);
            }
        }).then(function () {
            $('.modal').show();
        });

    })
    $('[type="submit"]').on('click',function(){
        var phone=$('#phone').val();
        var name = $('#name').val();
        $.ajax({
            url:url+'/Index/index/register/',
            data:'phone='+phone+'&&'+'name='+name,
            success:function (data) {
                
            },
            error:function (data) {

            }
        });
        $('.modal').show();
    });
});