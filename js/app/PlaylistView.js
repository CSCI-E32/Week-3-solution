define(['jquery', 'Playlist'], function($, Playlist){

  var PlaylistView = function(){
    // initialize
    this.playlist = new Playlist();
    this.listenAddSong();

    this.updatePlaylist();
  };
  PlaylistView.prototype.listenAddSong = function(){
    var that = this;
    $('#addSongForm').on('submit', $.proxy(this.addSongListener, this));
  };
  PlaylistView.prototype.addSongListener = function(event){
    this.playlist.addSong($('#song').val());
    this.updatePlaylist();
    $('#song').val('');
    return false;
  };

  PlaylistView.prototype.updatePlaylist = function() {
    this.playlist.updatePlaylist();
    this.updatePlaylistDom();
  };
  PlaylistView.prototype.updatePlaylistDom = function(){
    var that = this;
    var playlistDom = this.playlist.playlist.map($.proxy(this.createPlaylistDomMap, this));

    $('#currentPlaylist').html(playlistDom);

  };

  PlaylistView.prototype.createPlaylistDomMap = function(song, index){
    var removeButton = document.createElement("button");
    removeButton.appendChild(document.createTextNode("remove"));
    $(removeButton).click(function(){
      that.playlist.removeSong(index);
      that.updatePlaylistDom();
    });
    $(removeButton).addClass("btn");

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(song.title));
    li.appendChild(removeButton);
    return li;
  };

  return PlaylistView;
});
