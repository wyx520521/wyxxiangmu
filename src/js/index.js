
    var mySwiper = new Swiper ('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
          delay: 3000
        },
        effect: 'coverflow',

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          type:'progressbar',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })
      getList()
      function getList(){
          $.ajax({
              url:'../lib/nav.json',
              dataType: 'json',
              success:function(res){
                  console.log(res)
                  // 4-1. 准备一个空字符串
                  let str = ""
                  // 4-2. 渲染一级的 li
                  res.forEach(function(item){
                      str += `<li><a href="${item.link}" target="_blank">${item.name}</a></li>`

                  })
                  // 4-3. 填充到 menu 里面
                  $('.menu')
                  .html(str)
                  .on({
                      mouseenter:()=> $('.nav_box').stop().slideDown(),
                      mouseleave:()=> $('.nav_box').stop().slideUp()
                  })
                  .children('li')//找到所有的一级菜单下的li
                  .on('mouseover',function(){
                      // 5-1. 知道自己移入的时哪一个 li
                      const index = $(this).index()
                      // 5-2. 找到要渲染的数组
                      const subs = res[index].subs
                      // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
                      let str =''
                      // 5-4. 进行组装
                      subs.forEach(item=>{
                          str += `
                            <li>
                                <span class="sg"></span>
                                <div>
                                <img src="${item.img}" alt="">
                                <p class="p1">${item.name}</p>
                                <span class="price">￥${item.price}</span>
                                </div>
                            </li>
                          
                          `
                      })
                      // 5-5. 填充到页面里面
                      $('.nav_box > ul').html(str)
                  })
                  // 4-4. 给 nav_box 添加一个移入移出事件
                  $('.nav_box')
                        .on({
                            mouseover: function() {$(this).finish().show()},
                            mouseout: function() {$(this).finish().slideUp()}
                        })
              }
          })

      }

