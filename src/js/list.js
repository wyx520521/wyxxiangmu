
    // 准备两个变量
    let PageNo= 1
    let flag = true
    // 准备一个变量接收数组
    let list = []

    getList()
    function getList() {
      $.ajax({
        url: '../lib/list.json',
        data: {
         totalPage:3,
         pageNo:1,
         pageSize:20
        },
        dataType: 'json', 
        success: function (res) {
          console.log(res)
           bindHtml(res.data.pageList)

          // 执行渲染分页器的函数
          flag && bindPagi(res.data.totalPage)

          // 把数组保存以下
          list = res.data.pageList
          console.log(list);
          
        }
      })
    }

    function bindHtml(list) {
      // 渲染页面
      // console.log(list)
      let str = ''
      list.forEach(item => {
        str += `
          <li data-id="${ item.productId }">
            <img src="${ item.image }" alt="">
            <p>${ item.name }</p>
            <span>￥${ item.salePrice }</span>
            
          </li>
        `
      })
      $('.goodsList > ul').html(str)
    }

    function bindPagi(totalPage) {
      // 关闭开关
      flag = false

      $('.pagi').pagination({
        pageCount: 1, // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
          // 每次执行的时候改变一下全局 currPage
          PageNo = api.getCurrent()

          // 从新执行以下 getList()
          getList()
        }
      })
    }

    // 2. 事件委托的形式给每一个 li 添加点击事件
    $('.goodsList > ul').on('click', 'li', function () {
      // this 就是你点击的那一个 li
      console.log(this)
      // 找到渲染这个 li 的数据
      // 从 list 数组里面找到这个数据
      // 点击 li 的时候, 拿到自己身上的 id 属性
      const id = $(this).data('id')

      // 2. 去到 list 这个数组里面找到一个 id 对应的数据
      //   这个数据就是渲染这个 li 的数据
      let data = null
      for (let i = 0; i < list.length; i++) {
        if (list[i].productId === id) {
          data = list[i]      
          break
        }
      }
      console.log(data) // 我要找到的渲染当前这个 li 的数据

      // 3. 把找到的数据存储到 localStorage 里面
      //   为了详情页面使用
      localStorage.setItem('goodsInfo', JSON.stringify(data))

      // 4. 跳转页面
      window.location.href = './detail.html'
    })