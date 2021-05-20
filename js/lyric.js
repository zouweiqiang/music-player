(function(){
       function Lyric(path){
           return new Lyric.prototype.init(path);
       }

       Lyric.prototype={
           constructor:Lyric,
           init:function(path){
               this.path=path;

           },
           loadLyric:function(){
               var $this=this;
               $.get('localhost:8080/source/告白气球.txt').success(function(content){
                   console.log(content);
                   
               })
            
           }
       }
    
       Lyric.prototype.init.prototype=Lyric.prototype;
       window.Lyric=Lyric;
})(window)