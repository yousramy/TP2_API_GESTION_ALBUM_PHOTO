const AlbumModel = require('../models/album.js');
 
const Albums = class Albums {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   * @param {Function} authenticateToken
   */
  constructor (app, connect, authenticateToken) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);
    this.authenticateToken = authenticateToken;
 
    this.run();
  }
 
  /**
   * Delete an album by id
   */
  deleteById () {
    this.app.delete('/album/:id', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.AlbumModel.findByIdAndDelete(req.params.id).then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] albums/:id -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Show an album by id
   */
  showById () {
    this.app.get('/album/:id', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.AlbumModel.findById(req.params.id).then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] albums/:id -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Create a new album
   */
  create () {
    this.app.post('/album/', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        const albumModel = new this.AlbumModel(req.body);
 
        albumModel.save().then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(400).json({});
        });
      } catch (err) {
        console.error(`[ERROR] albums/create -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Update an album by id
   */
  updateById () {
    this.app.put('/album/:id', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((album) => {
            res.status(200).json(album || {});
          }).catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] albums/:id -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Get all albums
   */
  getAll () {
    this.app.get('/albums', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.AlbumModel.find().then((albums) => {
          res.status(200).json(albums || []);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] albums -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Run
   */
  run () {
    this.create();
    this.showById();
    this.deleteById();
    this.updateById();
    this.getAll();
  }
}
 
module.exports = Albums;