define(['PlaylistView', 'Playlist', 'Song'], function(PlaylistView, Playlist, Song){

  var playlistView;
  // Mocking playlist
  // beforeEach happens before each it() executes
  beforeEach(function () {
    playlistView = new PlaylistView();
    // we don't actually want to use or test playlist
    playlistView.playlist = jasmine.createSpyObj('playlist', ['addSong', 'removeSong', 'updatePlaylist']);
    playlistView.playlist.playlist = [];

    // we don't actually want to interact with the DOM elements
    // so we can spy on the jquery methods, and it'll be okay for most operations
    spyOn($.fn, "on");
    spyOn($.fn, "val");
    spyOn($.fn, "html");
  });

  describe('PlaylistView', function(){
    describe('listenAddSong', function(){
      it('should call addSongListener on submit', function(){
        playlistView.listenAddSong();
        expect($.fn.on).toHaveBeenCalledWith('submit', jasmine.any(Function));
      });
    });
    describe('addSongListener', function(){
      it("should call Playlist's addSong", function(){
        playlistView.addSongListener();
        expect(playlistView.playlist.addSong).toHaveBeenCalled();
      });
    });
    describe('updatePlaylistDom', function(){
      it("outputs html with an array", function(){
        playlistView.updatePlaylistDom();
        expect($.fn.html).toHaveBeenCalledWith(jasmine.any(Array));
      });
    });
    describe('createPlaylistDomMap', function(){
      it("should return a list element", function(){
        console.log(playlistView.createPlaylistDomMap(new Song("asdf"), 0));
//        expect(playlistView.createPlaylistDomMap(new Song("asdf"), 0));

      });
    });

  });


});
