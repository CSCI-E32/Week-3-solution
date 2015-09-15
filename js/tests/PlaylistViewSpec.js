define(['PlaylistView', 'Song'], function(PlaylistView, Song){

  var playlistView;
  // Mocking playlist
  // beforeEach happens before each it() executes
  beforeEach(function () {
    playlistView = new PlaylistView({
      addSongForm: $('<form></form>'),
      song: $('<input />'),
      currentPlaylist: $('<ul></ul>')
    });
    // we don't actually want to use or test playlist
    playlistView.playlist = jasmine.createSpyObj('playlist', ['addSong', 'removeSong', 'updatePlaylist']);
    playlistView.playlist.playlist = [];

    // we don't actually want to interact with the DOM elements
    // so we can spy on the jquery methods, and it'll be okay for most operations
    //spyOn($.fn, "on");
    //spyOn($.fn, "val").and.callThrough();
    //spyOn($.fn, "html");
  });

  describe('PlaylistView', function(){
    describe('submitting the form', function(){
      it('should call Playlist.addSong', function(){
        playlistView.$addSongForm.submit();
        expect(playlistView.playlist.addSong).toHaveBeenCalled();
      });
      it('should wipe the text from the text field', function(){
        playlistView.$song.val("something");
        playlistView.$addSongForm.submit();
        expect(playlistView.$song.val()).toBe('');
      });
      it('should create an li in the currentPlaylist', function(){
        playlistView.playlist.playlist = [new Song("asdf")];
        playlistView.$addSongForm.submit();
        expect(playlistView.$currentPlaylist.children()[0].localName).toBe('li');
      });
      it('should create an li with the text of the input', function(){
        var name = "asdf";
        playlistView.playlist.playlist = [new Song(name)];
        playlistView.$addSongForm.submit();
        expect(playlistView.$currentPlaylist.first().html()).toContain(name);
      });
      it('should create an li with a delete button', function(){
        playlistView.playlist.playlist = [new Song("asdf")];
        playlistView.$addSongForm.submit();
        expect(playlistView.$currentPlaylist.first().find('button').selector).toBe("button");
        expect(playlistView.$currentPlaylist.first().find('button').html()).toBe("remove");
      });
    });
    describe('deleting the song', function(){
      it("should call Playlist.removeSong", function(){
        playlistView.playlist.playlist = [new Song("asdf")];
        playlistView.$addSongForm.submit();
        expect(playlistView.$currentPlaylist.children().length).toBe(1);
        playlistView.$currentPlaylist.first().find('button').click();
        playlistView.$currentPlaylist.first().find('button').click();
        playlistView.$currentPlaylist.first().find('button').click();
        playlistView.$currentPlaylist.first().find('button').click();
        expect(playlistView.$currentPlaylist.children().length).toBe(0);
      });
    });

  });


});
