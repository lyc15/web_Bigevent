$(function () {
  // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
  // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //自定义校验规则
    // var form = layui.form;
    // var layer = layui.layer;
    const { form, layer } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //确认密码框定义校验规则
        repwd: function(value) {
            //1.获取密码框的输入内容
            var pwd = $('.reg-box [name=password]').val();
            //2.与确认框的内容比较
            if ( pwd != value) {
                return '两次输入的密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止默认事件发生
        e.preventDefault()
        //发起Ajax的POST请求
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name = username]').val(),
                password: $('#form_reg [name = password]').val()
            },
            success(res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '注册失败');
                    return;
                }
                layer.msg('注册成功');
                //模拟人的点击,注册成功后自动跳转到登录页面
                $('#link_login').click();
            }
        })
    })

    //监听登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的内容
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('登录失败')
                    return
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                //跳转到主页面
                location.href = '/index.html'
            }
        })
    })
})

