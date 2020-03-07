
// document.querySelector('.dl')
$('.dl').click(function(e){
    e.preventDefault()
    $.ajax({
        url:'/gx2',
        type:"post",
        data: {username:$('.username').val(),password:$('.pwd').val()},
        dataType:'',
        success:function(res){
            var result = JSON.parse(res)
            console.log(result);
            
            if(result.code===0){
                $('.ts').css('display','block')
            }else{
                window.location.href = './index.html'
            }
        }
    })
})