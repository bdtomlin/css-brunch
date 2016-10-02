var expect = require('chai').expect;
var Plugin = require('./');

describe('Plugin', function() {
  var plugin;

  it('should be an object', function() {
    plugin = new Plugin({});
    expect(plugin).to.be.ok;
  });

  it('should has #compile method', function() {
    plugin = new Plugin({});
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile with modules', function(done) {
    var content = '.class {color: #6b0;}';
    var expected = '._class_mcgck_1 {color: #6b0;}';
    newPlugin = new Plugin({
      plugins: {
        css: {
          modules: true
        }
      }
    })

    newPlugin.compile({data: content, path: 'file.css'}).then(result => {
      var data = result.data;
      expect(data).to.equal(expected);
      done();
    }, error => expect(error).not.to.be.ok);
  });

  it('should compile skip files passed to ignore', function(done) {
    var content = '.class {color: #6b0;}';
    var expected = '.class {color: #6b0;}';
    newPlugin = new Plugin({
      plugins: {
        css: {
          modules: {ignore: [/file\.css/]}
        }
      }
    })

    newPlugin.compile({data: content, path: 'file.css'}).then(result => {
      var data = result.data;
      expect(data).to.equal(expected);
      done();
    }, error => expect(error).not.to.be.ok);
  });
});
