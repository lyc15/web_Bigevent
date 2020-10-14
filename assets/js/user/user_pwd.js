$(function () {
    const form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //新密码验证
        samePwd: (value) => {
            if (value === $('input[name=oldPwd]').val()) {
                return '新旧密码不能一致！'
            }
        },

        rePwd: (value) => {
            if (value !== $('input[name=newPwd]').val()) {
                return '两次输入的密码不一致！'
            }
        }
    });
    //提交
    const layer = layui.layer;
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '更新密码失败');
                    return;
                }

                layer.msg('更新密码成功');
                //重置表单
                $('.layui-form')[0].reset();
            }
        })
    })

})