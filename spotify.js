console.log("WELCOME TO SPOTIFY")
//initializing variable
let songIndex = 0;
let masterplay = document.getElementById('masterplay')
let myprogressbar = document.getElementById('myprogressbar')
let gif = document.getElementById('gif');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let songitem = Array.from(document.getElementsByClassName('songItem'))
let songname = document.getElementsByClassName('songname');
let songduration;
let playsong = document.getElementsByClassName('play');
let songs =[

    {songName : "Mazak (Anuv - Jaine)" , filePath : "1.mp3", coverPath : "1.jpg" ,},
    {songName : "Barishein (Anuv - Jaine)" , filePath : "2.mp3", coverPath : "2.jpg" ,},
    {songName : "Misri (Anuv - Jaine)" , filePath : "3.mp3", coverPath : "3.jpg" ,},
    {songName : "Nadaniyaan" , filePath : "4.mp3", coverPath : "4.jpg" ,},
    {songName : "Shikayat (AUR)" , filePath : "5.mp3", coverPath : "5.jpg" ,},
    {songName : "Sun Zara(Anuv - Jaine)" , filePath : "6.mp3", coverPath : "6.jpg" ,},
    {songName : "Chor" , filePath : "7.mp3", coverPath : "7.jpg" ,},
    {songName : "Tou Hai Kaha (AUR)" , filePath : "8.mp3", coverPath : "8.jpg" ,},
    {songName : "Maula (Anuv - Jaine)" , filePath : "9.mp3", coverPath : "9.jpg" ,}, 


]
let audioElement = new Audio(songs[songIndex].filePath)

songitem.forEach((element, i)=>{
    //updating covers
    console.log(element)
  element.getElementsByTagName("img")[0].src=songs[i].coverPath;
  //Updating names
  element.getElementsByClassName("songname")[0].innerHTML = songs[i].songName
  

})

//Div Click
Array.from(document.getElementsByClassName('songItem')).forEach((e,i)=>{
    e.addEventListener('click', ()=>{
        if(audioElement.paused){
            audioElement = new Audio(songs[i].filePath);
            audioElement.play()
            update()
            if(audioElement.play){
                masterplay.classList.remove('fa-play-circle')
            masterplay.classList.add('fa-pause-circle')
            playsong[i].classList.remove('fa-play-circle')
            playsong[i].classList.add('fa-pause-circle')
            
    
    
            } 

        }
        else{
            audioElement.pause()
            masterplay.classList.remove('fa-pause-circle')
            masterplay.classList.add('fa-play-circle')
            audioElement = new Audio(songs[i].filePath);
            audioElement.play()
            update()
            if(audioElement.play){
                masterplay.classList.remove('fa-play-circle')
            masterplay.classList.add('fa-pause-circle')
            playsong[i].classList.remove('fa-play-circle')
            playsong[i].classList.add('fa-pause-circle')
            
        }
    

    })
})

//Handle Play/Pause
masterplay.addEventListener('click' ,()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
        update()

    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle')
        gif.style.opacity =0;
        update()
    }
    console.log("hello")
})

//Next previous song

next.addEventListener('click' , ()=>{
    console.log(songIndex)

    if(songIndex == 8){
        songIndex = 0
    }
    else{
        songIndex++
    }
    myprogressbar.value = 0;
    audioElement.pause()
    audioElement = new Audio(songs[songIndex].filePath)
    audioElement.play()
    masterplay.classList.add('fa-pause-circle')
    update()


    
   }
   )
previous.addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0 
    }
    else{
        songIndex--
    }
    myprogressbar.value = 0;
    audioElement.pause()
    audioElement = new Audio(songs[songIndex].filePath)
    audioElement.play()
    masterplay.classList.add('fa-pause-circle')
    update()


})
//Listen To events
function update (){
    audioElement .addEventListener('timeupdate', ()=>{
        console.log("timeisupdatings")
        //update seek bar 
    
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
        console.log(progress)
        myprogressbar.value = progress;
    
        myprogressbar.addEventListener('change' ,()=>{
            audioElement.currentTime = ((myprogressbar.value * audioElement.duration) / 100)
        })
    })

}



