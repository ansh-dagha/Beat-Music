let uid = $('#uid').data('uid');
let email1 = $('#meta-email').data('email');
var trending;
var search;
var myplaylist;
var queue;
var recommend;

function loadqueue(All_song) {
    let i = 0;
    queue=All_song
    for (i = 0; i < queue.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = '<div class="col-1.5">' +
            '<img src="https://firebasestorage.googleapis.com/v0/b/music-player-3dac7.appspot.com/o/Images%2FQueue_song.jpg?alt=media&token=6f13a9ef-c16f-454b-926f-7cc6c500111c" class="songcov" onclick="'+'playrequest_queue(' + i.toString() + ')"/>' +
            '</div>' +
            '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
            '<ul class="navbar nav ml-auto" id="playnav">' +
            '<li onclick="'+'playrequest_queue(' + i.toString() + ')">' +
            '<p class="songname">' + queue[i]['Title'] + '</p>' +
            '<p class="songinfo">' + queue[i]['Artist'] + ' - ' + queue[i]['Album'] + '</p>' +
            '</li>' +
            '<li>' +
            '<div class="dropdown dropleft song_options queuedrop">' +
            '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
            '</button>' +
            '<div class="dropdown-menu queuesong" aria-labelledby="dropdownMenuButton">' +
            '<label class="dropdown-item" onclick="addtoplaylist(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'queue' + '\')">Add to Playlist</label>' +
            '<label class="dropdown-item" onclick="removefromqueue(' + "'"+ uid +"'" + ',\'' + queue[i]['ID'] + '\')">Remove from Queue</label>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>';
        div.setAttribute('class', 'row pad queuepad');
        div.setAttribute('id', 'Q'+queue[i]['ID']);
        // div.setAttribute('onclick', 'playrequest_queue(' + i.toString() + ')');
        document.getElementById("loadqueue").appendChild(div);
    }
}

function addtoqueuemodal(song) {
    $('#Q' + song['ID']).remove();

    if(queue.includes(song)){    }
    else{
        queue=queue.concat(song);
    } 

    let i=queue.length-1
    var div = document.createElement('div');
    div.innerHTML = '<div class="col-1.5">' +
        '<img src="https://firebasestorage.googleapis.com/v0/b/music-player-3dac7.appspot.com/o/Images%2FQueue_song.jpg?alt=media&token=6f13a9ef-c16f-454b-926f-7cc6c500111c" class="songcov" onclick="'+'playrequest_queue(' + i.toString() + ')"/>' +
        '</div>' +
        '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
        '<ul class="navbar nav ml-auto" id="playnav">' +
        '<li onclick="'+'playrequest_queue(' + i.toString() + ')">' +
        '<p class="songname">' + song['Title'] + '</p>' +
        '<p class="songinfo">' + song['Artist'] + ' - ' + song['Album'] + '</p>' +
        '</li>' +
        '<li>' +
        '<div class="dropdown dropleft song_options queuedrop">' +
        '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
        '</button>' +
        '<div class="dropdown-menu queuesong" aria-labelledby="dropdownMenuButton">' +
        '<label class="dropdown-item" onclick="addtoplaylist(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'queue' + '\')">Add to Playlist</label>' +
        '<label class="dropdown-item" onclick="removefromqueue(' + "'"+ uid +"'" + ',\'' + song['ID'] + '\')">Remove from Queue</label>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>';
    div.setAttribute('class', 'row pad queuepad');
    div.setAttribute('id','Q'+song['ID']);
    // div.setAttribute('onclick', 'playrequest_queue(' + i.toString() + ')');
    document.getElementById("loadqueue").appendChild(div);
}

flag4=true;
function load_popular_on_pageload(){
    // $('#popular').modal('show');
    if(flag4){
        $.ajax({
                    url: 'popular10',
                    method:'post',
                    success:function(trending1){
                        trending=JSON.parse(trending1);
                        flag4=false;
                        let i = 0;
                        for (i = 0; i < trending.length; i++) {
                            var div = document.createElement('div');
                            div.innerHTML = '<div class="col-1.5">' +
                                '<img src="https://firebasestorage.googleapis.com/v0/b/music-player-3dac7.appspot.com/o/Images%2FTrending_song.jpg?alt=media&token=85d2776b-0978-428c-8b05-bcbdc726b456" class="songcov" onclick="'+'playrequest_trending(' + i.toString() + ')"/>' +
                                '</div>' +
                                '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
                                '<ul class="navbar nav ml-auto" id="playnav">' +
                                '<li onclick="'+'playrequest_trending(' + i.toString() + ')">' +
                                '<p class="songname">' + trending[i]['Title'] + '</p>' +
                                '<p class="songinfo">' + trending[i]['Artist'] + '-' + trending[i]['Album'] + '</p>' +
                                '</li>' +
                                '<li>' +
                                '<div class="dropdown dropleft song_options">' +
                                '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
                                '</button>' +
                                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                                '<label class="dropdown-item" onclick="addtoplaylist(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'trending' + '\')">Add to Playlist</label>'+
                                '<label class="dropdown-item" onclick="addtoqueue(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'trending' + '\')">Add to Queue</label>' +
                                '</div>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>';
                            div.setAttribute('class', 'row pad');
                            div.setAttribute('id', 'P'+trending[i]['ID']);
                            // div.setAttribute('onclick', 'playrequest_trending(' + i.toString() + ')');
                            document.getElementById("popularqueue").appendChild(div);
                        }
                    }
        });
    }
}

function searchsong(){
    document.getElementById("searchqueue").innerHTML="";
    strm=document.getElementById("strm").value;
        $('#searchmodal').modal('show');
        $.ajax({
                    url: 'search',
                    method:'post',
                    data:{strm:strm},
                    success:function(search1){
                        search=JSON.parse(search1);
                        flag4=false;
                        let i = 0;
                        for (i = 0; i < search.length; i++) {
                            var div = document.createElement('div');
                            div.innerHTML = '<div class="col-1.5">' +
                                '<img src="https://picsum.photos/640/480?pic=5" class="songcov" onclick="'+'playrequest_search(' + i.toString() + ')"/>' +
                                '</div>' +
                                '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
                                '<ul class="navbar nav ml-auto" id="playnav">' +
                                '<li onclick="'+'playrequest_search(' + i.toString() + ')">' +
                                '<p class="songname">' + search[i]['Title'] + '</p>' +
                                '<p class="songinfo">' + search[i]['Artist'] + '-' + search[i]['Album'] + '</p>' +
                                '</li>' +
                                '<li>' +
                                '<div class="dropdown dropleft song_options" style="right: -80px;">' +
                                '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
                                '</button>' +
                                '<div class="dropdown-menu queuesong" aria-labelledby="dropdownMenuButton">' +
                                '<label class="dropdown-item" onclick="addtoplaylist(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'search' + '\')">Add to Playlist</label>' +
                                '<label class="dropdown-item" onclick="addtoqueue(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'search' + '\')">Add to Queue</label>' +
                                '</div>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>';
                            div.setAttribute('class', 'row pad');
                            div.setAttribute('id', 'S'+search[i]['ID']);
                            // div.setAttribute('onclick', 'playrequest_search(' + i.toString() + ')');
                            document.getElementById("searchqueue").appendChild(div);
                        }
                    }
        });

}

flag5=true
function load_my_playlist_on_pageload(){
    // $('#myplaylist').modal('show');
    if(flag5){
        $.ajax({
                    url: 'myplaylist',
                    method:'post',
                    data:{uid:uid},
                    success:function(myplaylist1){
                        myplaylist=JSON.parse(myplaylist1);
                        flag5=false;
                        let i = 0;
                        for (i = 0; i < myplaylist.length; i++) {
                            var div = document.createElement('div');
                            div.innerHTML = '<div class="col-1.5" onclick="'+'playrequest_myplaylist(' + i.toString() + ')">' +
                                '<img src="https://firebasestorage.googleapis.com/v0/b/music-player-3dac7.appspot.com/o/Images%2FMyPlaylist_song.jpg?alt=media&token=0c99c5be-d6ac-4e63-9820-d767b317c59d" class="songcov" onclick="'+'playrequest_myplaylist(' + i.toString() + ')"/>' +
                                '</div>' +
                                '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
                                '<ul class="navbar nav ml-auto" id="playnav">' +
                                '<li onclick="'+'playrequest_myplaylist(' + i.toString() + ')">' +
                                '<p class="songname">' + myplaylist[i]['Title'] + '</p>' +
                                '<p class="songinfo">' + myplaylist[i]['Artist'] + '-' + myplaylist[i]['Album'] + '</p>' +
                                '</li>' +
                                '<li>' +
                                '<div class="dropdown dropleft song_options">' +
                                '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
                                '</button>' +
                                '<div class="dropdown-menu queuesong" aria-labelledby="dropdownMenuButton">' +
                                '<label class="dropdown-item" onclick="addtoqueue(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'myplaylist' + '\')">Add to Queue</label>' +
                                '<label class="dropdown-item" onclick="removefromplaylist(' + "'"+ uid +"'" + ',\'' + myplaylist[i]['ID'] + '\')">Remove from Playlist</label>' +
                                '</div>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>';
                            div.setAttribute('class', 'row pad');
                            div.setAttribute('id', 'MP'+myplaylist[i]['ID']);
                            // div.setAttribute('onclick', 'playrequest_myplaylist(' + i.toString() + ')');
                            document.getElementById("myplaylistqueue").appendChild(div);
                        }
                    }
        });
    }
}

function addtomyplaylistmodal(song){
    $('#MP' + song['ID']).remove();
    myplaylist.concat(song);
    let i=myplaylist.length-1
    var div = document.createElement('div');
    div.innerHTML = '<div class="col-1.5">' +
        '<img src="https://firebasestorage.googleapis.com/v0/b/music-player-3dac7.appspot.com/o/Images%2FMyPlaylist_song.jpg?alt=media&token=0c99c5be-d6ac-4e63-9820-d767b317c59d" class="songcov" onclick="'+'playrequest_myplaylist(' + i.toString() + ')"/>' +
        '</div>' +
        '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
        '<ul class="navbar nav ml-auto" id="playnav">' +
        '<li onclick="'+'playrequest_myplaylist(' + i.toString() + ')">' +
        '<p class="songname">' + song['Title'] + '</p>' +
        '<p class="songinfo">' + song['Artist'] + '-' + song['Album'] + '</p>' +
        '</li>' +
        '<li>' +
        '<div class="dropdown dropleft song_options">' +
        '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
        '</button>' +
        '<div class="dropdown-menu queuesong" aria-labelledby="dropdownMenuButton">' +
        '<label class="dropdown-item" onclick="addtoqueue(' + "'"+ uid +"'" + ',' + i.toString() + '\'' + 'myplaylist' + '\')">Add to Queue</label>' +
        '<label class="dropdown-item" onclick="removefromplaylist(' + "'"+ uid +"'" + ',\'' + song['ID'] + '\')">Remove from Playlist</label>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>';
    div.setAttribute('class', 'row pad');
    div.setAttribute('id', 'MP'+song['ID']);
    // div.setAttribute('onclick', 'playrequest_myplaylist(' + i.toString() + ')');
    document.getElementById("myplaylistqueue").appendChild(div);
}

flag6=true;
function loadrecommended(){
    $('#recommend').modal('show');
    if(flag6){
        $.ajax({
                    url: 'recommend',
                    method:'post',
                    data:{uid:uid},
                    success:function(recommend1){
                        recommend=JSON.parse(recommend1);
                        flag6=false;
                        let i = 0;
                        for (i = 0; i < recommend.length; i++) {
                            var div = document.createElement('div');
                            div.innerHTML = '<div class="col-1.5">' +
                                '<img src="https://firebasestorage.googleapis.com/v0/b/music-player-3dac7.appspot.com/o/Images%2FRecommended_song.jpg?alt=media&token=b92e0207-d5e3-40c5-9994-21ac6402733c" class="songcov" onclick="'+'playrequest_recommend(' + i.toString() + ')"/>' +
                                '</div>' +
                                '<div class="col-xl-10 col-lg-10 col-sm-10 nopad">' +
                                '<ul class="navbar nav ml-auto" id="playnav">' +
                                '<li onclick="'+'playrequest_recommend(' + i.toString() + ')">' +
                                '<p class="songname">' + recommend[i]['Title'] + '</p>' +
                                '<p class="songinfo">' + recommend[i]['Artist'] + '-' + recommend[i]['Album'] + '</p>' +
                                '</li>' +
                                '<li>' +
                                '<div class="dropdown dropleft song_options">' +
                                '<button class="btn more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
                                '</button>' +
                                '<div class="dropdown-menu queuesong" aria-labelledby="dropdownMenuButton">' +
                                '<label class="dropdown-item" onclick="addtoplaylist(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'recommend' + '\')">Add to Playlist</label>'+
                                '<label class="dropdown-item" onclick="addtoqueue(' + "'"+ uid +"'" + ',' + i.toString() + ',\'' + 'recommend' + '\')">Add to Queue</label>' +
                                '<label class="dropdown-item" onclick="removefromrecommended(' + "'"+ uid +"'" + ',\'' + recommend[i]['ID'] + '\')">Not interested</label>' +
                                '</div>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>';
                            div.setAttribute('class', 'row pad');
                            div.setAttribute('id', 'R'+recommend[i]['ID']);
                            // div.setAttribute('onclick', 'playrequest_recommend(' + i.toString() + ')');
                            document.getElementById("recommendqueue").appendChild(div);
                        }
                    }
        });
    }
}

function showmodal(string){
    document.getElementById("message").innerHTML=string;
    $('#messagemodal').modal('show');
    setTimeout(function(){
        $('#messagemodal').modal('hide') 
    }, 4000);
}

function loadpopular(){
    $('#popular').modal('show');
}

function loadmyplaylist(){
    $('#myplaylist').modal('show');
}

load_popular_on_pageload();
load_my_playlist_on_pageload();
