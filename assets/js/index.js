$(function () {
    getUserInfo();

    var layer = layui.layer
    //点击退出事件
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储的信息
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href ='/login.html'
            //关闭弹框
            layer.close(index);
          });
    })  
})


function getUserInfo() {
    $.ajax({
        method: 'GET', 
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败 ')
            }

            renderAvatar(res.data)
        },
        //ajax 无论成功还是失败都会执行complete函数
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //        localStorage.removeItem('token') 
        //        location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}