"use strict";var mySwiper=new Swiper(".swiper-container",{loop:!0,autoplay:{delay:3e3},effect:"coverflow",pagination:{el:".swiper-pagination",type:"progressbar"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});function getList(){$.ajax({url:"../lib/nav.json",dataType:"json",success:function(i){console.log(i);var o="";i.forEach(function(n){o+='<li><a href="'.concat(n.link,'" target="_blank">').concat(n.name,"</a></li>")}),$(".menu").html(o).on({mouseenter:function(){return $(".nav_box").stop().slideDown()},mouseleave:function(){return $(".nav_box").stop().slideUp()}}).children("li").on("mouseover",function(){var n=$(this).index(),o=i[n].subs,e="";o.forEach(function(n){e+='\n                            <li>\n                                <span class="sg"></span>\n                                <div>\n                                <img src="'.concat(n.img,'" alt="">\n                                <p class="p1">').concat(n.name,'</p>\n                                <span class="price">￥').concat(n.price,"</span>\n                                </div>\n                            </li>\n                          \n                          ")}),$(".nav_box > ul").html(e)}),$(".nav_box").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().slideUp()}})}})}getList();