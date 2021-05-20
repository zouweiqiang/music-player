$(function () {

    //tool_list引入滚动条
    $(window).load(function () {
        $(".tool_list").mCustomScrollbar();
    })

    // 得到歌曲列表
    var musicList = [
        {
            "name": "告白气球",
            "singer": "周杰伦",
            "album": "周杰伦的床边故事",
            "time": "03:35",
            "link_url": "./source/告白气球.mp3",
            "cover": "./source/告白气球.jpg",
            "link_lrc": "./source/告白气球.txt"
        },
        {
            "name": "As long AS Love Me",
            "singer": "Justin Bieber",
            "album": "NOW That's What I Call Music! 44",
            "time": "03:49",
            "link_url": "./source/AslongASLoveMe.mp3",
            "cover": "./source/AslongASLoveMe.jpg",
            "link_lrc": "./source/AslongASLoveMe.txt"
        },
        {
            "name": "Something Just Like This",
            "singer": "Chainsmokers",
            "album": "Something Just Like This",
            "time": "04:07",
            "link_url": "./source/SomethingJustLikeThis.mp3",
            "cover": "./source/SomethingJustLikeThis.jpg",
            "link_lrc": "./source/SomethingJustLikeThis.txt"
        },
        {
            "name": "Your Song",
            "singer": "Lady Gaga",
            "album": "Your Song",
            "time": "04:16",
            "link_url": "./source/YourSong.mp3",
            "cover": "./source/YourSong.jpg",
            "link_lrc": "./source/YourSong.txt"
        },
        {
            "name": "凉凉",
            "singer": "杨宗纬/张碧晨",
            "album": "凉凉",
            "time": "05:00",
            "link_url": "./source/凉凉.mp3",
            "cover": "./source/凉凉.jpg",
            "link_lrc": "./source/凉凉.txt"
        },
        {
            "name": "小城大事",
            "singer": "张学友",
            "album": "学友光年世界巡迴演唱会",
            "time": "03:54",
            "link_url": "./source/小城大事.mp3",
            "cover": "./source/小城大事.jpg",
            "link_lrc": "./source/小城大事.txt"
        },
        {
            "name": "广东爱情故事",
            "singer": "广东雨神",
            "album": "广东爱情故事",
            "time": "03:34",
            "link_url": "./source/广东爱情故事.mp3",
            "cover": "./source/广东爱情故事.jpg",
            "link_lrc": "./source/广东爱情故事.txt"
        },
        {
            "name": "我是一个程序员",
            "singer": "单小叶",
            "album": "程序猿",
            "time": "02:14",
            "link_url": "./source/我是一个程序员.mp3",
            "cover": "./source/我是一个程序员.jpg",
            "link_lrc": "./source/我是一个程序员.txt"
        },
        {
            "name": "演员",
            "singer": "薛之谦",
            "album": "绅士",
            "time": "04:21",
            "link_url": "./source/演员.mp3",
            "cover": "./source/演员.jpg",
            "link_lrc": "./source/演员.txt"
        },
        {
            "name": "百里守约",
            "singer": "萧敬腾",
            "album": "《王者荣耀》百里守约英雄主打歌",
            "time": "03:42",
            "link_url": "./source/百里守约.mp3",
            "cover": "./source/百里守约.jpg",
            "link_lrc": "./source/百里守约.txt"
        },
        {
            "name": "社会摇",
            "singer": "萧全",
            "album": "社会摇",
            "time": "04:09",
            "link_url": "./source/社会摇.mp3",
            "cover": "./source/社会摇.jpg",
            "link_lrc": "./source/社会摇.txt"
        },
        {
            "name": "说散就散",
            "singer": "袁娅维",
            "album": "说散就散",
            "time": "04:02",
            "link_url": "./source/说散就散.mp3",
            "cover": "./source/说散就散.jpg",
            "link_lrc": "./source/说散就散.txt"
        },
        {
            "name": "输了你赢了世界又如何",
            "singer": "林俊杰",
            "album": "梦想的声音《第二季》",
            "time": "04:43",
            "link_url": "./source/输了你赢了世界又如何.mp3",
            "cover": "./source/输了你赢了世界又如何.jpg",
            "link_lrc": "./source/输了你赢了世界又如何.txt"
        }
    ];

    // 加载歌曲列表
    getPlayList();

    // 初始化事件监听
    initEvents();

    //播放歌曲
    var $audio = $('audio');
    var play = new Play($audio);

    initPlay();

    // var lyric=new Lyric();
    // lyric.loadLyric();
    

      //进度条
      var $progressBar=$('.music_progress_line');
      var $progressLine=$('.music_progress_load');
      var $progressPlay=$('.music_progress_play');
      var pro=new Progress($progressBar,$progressLine,$progressPlay);
      pro.progressClick(function(value){
          //设置音乐进度
          play.setMusicTo(value);

      });
      pro.progressMouse(function(value){
        play.setMusicTo(value);
      });

   

  
    
    //设置音量进度条
    var $voiceLine=$('.voice_line');
      var $voiceLoad=$('.voice_load');
      var $volcePlay=$('.voice_play');
      var pro2=new Progress($voiceLine,$voiceLoad,$volcePlay);
      pro2.progressClick(function(value){
          //设置音乐音量
          play.setVolume(value);
      });
      pro2.progressMouse(function(value){
        play.setVolume(value);
      });



    function initPlay(){

         //监听音乐是否播放完毕
    play.isEnd(function(musicEnd){
        if(musicEnd){//播放完毕
                // 进度条初始化
                pro.resetProgress(0);

            $('.music_next').trigger('click');//切换下一首

        }
    });

 //监听audio开始播放,设置音乐总时长，与当前播放时长
 play.musicTime(function(time,currentTime,targetTime){
    $('.music_progress_music').text(time);

    //设置进度条与时间同步
    var progress_now=currentTime/targetTime*100;
    pro.setProgress(progress_now);
});

    //监听audio开始播放,设置音乐总时长，与当前播放时长
    play.musicTime(function(time,currentTime,targetTime){
        $('.music_progress_music').text(time);

        //设置进度条与时间同步
        var progress_now=currentTime/targetTime*100;
        pro.setProgress(progress_now);
    });


    }

    //将musicList传给Play对象
    Play.musicList = musicList;
    function getPlayList() {

        //遍历歌曲列表
        $.each(musicList, function (index, value) {
            var $item = $("<li class='music_li'>" +
                "<div class='list_chec'><span></span></div>" +
                "<div class='list_number'>" + (index + 1) + "</div>" +
                "<div class='list_name'>" +
                "<span>" + value.name + "</span>" +
                "<div class='name_meau'>" +
                "<a class='name_meau_play' href='#' title='播放'></a>" +
                "<a href='#' title='添加'></a>" +
                "<a href='#' title='下载'></a>" +
                "<a href='#' title='分享'></a>" +
                "</div></div>" +
                "<div class='list_singer'>" +
                "<span>" + value.singer + "</span>" +
                "<a class='name_meau_del' href='#' title='从列表删除'></a></div>" +
                "<div class='list_timer'>" + value.time + "</div>" +
                "</li>");
            $('.tool_list ul').append($item);
            $item.get(0).index = index;//将歌曲信息添加到原生li上
            $item.get(0).music = value;
        })

        // 初始化歌曲信息
        initMusic(musicList[0]);

        //初始化歌词信息
        // initLyric(musicList[0].link_lrc);
    }

    // function initLyric(path){
    //     var lyric=new Lyric(path);
    //     lyric.loadLyric();
    // }

    function initMusic(music){
        var musicImg=$('.song_info a');
        var musicName=$('.song_info_name a');
        var songName=$('.song_name a');
        var songAlbum=$('.song_album a');
        var footer_musicName=$('.music_name');
        var footer_musicTimer=$('.music_progress_music');
        var maskBg=$('.mask_bg');

        // 设置歌曲信息
        $(musicImg).css('background',"url('"+music.cover+"')");
        $(musicName).text(music.name);
        $(songName).text(music.singer);
        $(songAlbum).text(music.album);
        $(footer_musicName).text(music.name+'/'+music.singer);
        $(footer_musicTimer).text('00：00/'+music.time);
        $(maskBg).css('background','url('+music.cover+')');

    }

    function initEvents() {

        //事件委托监听每一列歌曲
        $('.tool_list').delegate('.music_li', 'mouseenter', function () {
            $(this).find('.name_meau').stop().fadeIn(100);
            $(this).find('.list_singer a').stop().fadeIn(100);
            $(this).find('.list_singer span').stop().fadeOut(100);
        })

        $('.tool_list').delegate('.music_li', 'mouseleave', function () {
            $(this).find('.name_meau').stop().fadeOut(100);
            $(this).find('.list_singer a').stop().fadeOut(100);
            $(this).find('.list_singer span').stop().fadeIn(100);
        })

        //监听每一列是否被选中
        $('.tool_list').delegate('.list_chec span', 'click', function () {
            $(this).toggleClass('chec_true');
            if ($(this).attr('class').indexOf('chec_true') != -1) {
                //选中复选框高亮
                $(this).parents('.music_li').css('opacity', 1);
            } else {
                //取消选中恢复
                $(this).parents('.music_li').css('opacity', .5);
            }

        })

        //监听底部播放按钮
        $('.music_play').click(function () {

            //判断是不是第一次播放音乐
            if (play.currentIndex == -1) {//第一次播放

                $('.tool_list').find('.name_meau_play').eq(0).trigger('click');
            } else {
                //不是第一次播放
                $('.tool_list').find('.name_meau_play').eq(play.currentIndex).trigger('click');
            }

        })

        //监听上一首按钮
        $('.music_pre').click(function () {
            var iLeng = $('.tool_list').find('.name_meau_play').length;
            $('.tool_list').find('.name_meau_play').eq(play.preIndex(iLeng)).trigger('click');
        })

        //监听下一首
        $('.music_next').click(function () {
            var iLeng = $('.tool_list').find('.name_meau_play').length;

            $('.tool_list').find('.name_meau_play').eq(play.nextIndex(iLeng)).trigger('click');
        })

        // 监听音量按钮
        $('.voice_big').click(function(){
            $(this).toggleClass('voice_big2');

            if($(this).attr('class').indexOf('voice_big2')!=-1){//如果静音
                play.setVolume(0);
            }else{
                play.setVolume(1);
            }
        })



        //监听music_li播放按钮,并与下面播放按钮同步
        $('.tool_list').delegate('.name_meau_play', 'click', function () {
            var $item = $(this).parents('.music_li');//当前行

            //点击播放切换图片
            $(this).toggleClass('name_meau_play2');

            //播放列文字高亮
            $item.css('opacity', 1);

            //  复选框被选中
            $item.find('.list_chec span').addClass('chec_true');

            //加载播放动画
            $item.find('.list_number').addClass('list_number2');

            // 播放音乐
            play.playMusic($item.get(0).index, $item.get(0).music);
            
            

            // ..切换音乐信息
            initMusic($item.get(0).music);




            //   清除其他列的切换
            $item.siblings().find('.name_meau_play').removeClass('name_meau_play2');

            //不播放时恢复文字状态
            $item.siblings().css('opacity', .5);

            // 清除其他列被选中
            $item.siblings().find('.list_chec span').removeClass('chec_true');

            // 清除其他列播放动画
            $item.siblings().find('.list_number').removeClass('list_number2');

            //同步下面播放按钮
            // console.log($(this).attr('class'));
            if ($(this).attr('class').indexOf('name_meau_play2') != -1) {//此时点击了播放按钮

                $('.music_play').addClass('music_play2');
            } else {
                //用remove不起作用
                $('.music_play').attr('class', 'music_play');

                //暂停音乐移除播放动画
                $item.find('.list_number').removeClass('list_number2');

            }

        })

        //删除音乐

        $('.tool_list').delegate('.name_meau_del', 'click', function () {
            var $item = $(this).parents('.music_li');//当前li
            //判断删除的是否是当前播放的,先切换到当前的下一首再删除当前的
            if ($item.get(0).index == play.currentIndex) {
                $('.music_next').trigger('click');
            }
            $item.remove();//当前li从前端删除
            musicList = play.deleteMusic($item.get(0).index);//删除后台歌曲

            // 重新排序
            $('.music_li').each(function (index, music) {
                music.index = index;
                $(music).find('.list_number').text(index + 1);
            })

        })



    }

})