$(function () {
    var url = 'http://ticket.e-to-china.com/';

    $('.btn_close').on('click', function () {
        $('.modal').hide();
    });

    $('#vilate').on('click', function () {
        var phone = $('#phone').val();
        $.ajax({
            url: url + 'Index/index/get_code/',
            type: 'get',
            dataType: 'jsonp',
            data: {
                phone: phone
            },
            beforeSend:function () {
                $('#vilate').text('正在发送');
            },
            success: function (data) {

                if (data.code != 1) {
                    $('#msg').text(data.msg);
                    $('.modal').show();
                }else{
                    $('#msg').text('验证码发送成功');
                    $('.modal').show();
                    $('#vilate').text('重新发送');
                }
            },
            error:function () {

            }
        });

    })
    $('[type="submit"]').on('click', function () {
        var phone = $('#phone').val();
        var name = $('#name').val();
        var code = $('#code').val();
        $.ajax({
            type: 'get',
            url: url + '/Index/index/register/',
            dataType: 'jsonp',
            data: {
                phone: phone,
                name: name,
                code: code
            },
            success: function (data) {
                if (data.code == 1) {
                    window.location.href = 'qcode.html?qcode=' + encodeURIComponent(data.result.ticket)
                } else {
                    $('#msg').text(data.msg);
                    $('.modal').show();
                }

            },
            error: function (data) {
                console.log('data')
            }
        });
    });
});