GamePix = {
    on: {},
    game: {
        gameLoading: function(perc) {
            console.debug("GamePix Loading Event", perc);

        },
        gameLoaded: function(callback) {
            console.debug("GamePix Loaded Event");
            callback();
        },
        ping:function(type,object){
            console.debug(type);
            console.debug(object);
            try{GamePix.on.pause();  console.log('Game Paused')}catch(e){console.log(e.message)}
            try{GamePix.on.soundOff();  console.log('Sound Paused')}catch(e){console.log(e.message)}
            var i = 0;
            var timer = setInterval(function(){
                if(i==4){
                    clearInterval(timer);
                    try{GamePix.on.resume(); console.log('Game Resumed')}catch(e){console.log(e.message)}
                    try{GamePix.on.soundOn(); console.log('Sound Resumed') }catch(e){console.log(e.message)}
                } else {
                    i++;
                    console.log('Game will resume in: '+(4-i)+' seconds')
                }
            },1000)

        }
    }
};