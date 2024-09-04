const PhotoModel = require('../models/photo.js');
 
const Photos = class Photos {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   * @param {Function} authenticateToken
   */
  constructor (app, connect, authenticateToken) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.authenticateToken = authenticateToken;
 
    this.run();
  }
 
  /**
   * Delete a photo by id
   */
  deleteById () {
    this.app.delete('/photo/:id', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.PhotoModel.findByIdAndDelete(req.params.id).then((photo) => {
          res.status(200).json(photo || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photos/:id -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Show a photo by id
   */
  showById () {
    this.app.get('/photo/:id', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.PhotoModel.findById(req.params.id).then((photo) => {
          res.status(200).json(photo || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photos/:id -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Create a new photo
   */
  create () {
    this.app.post('/photo/', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        const photoModel = new this.PhotoModel(req.body);
 
        photoModel.save().then((photo) => {
          res.status(200).json(photo || {});
        }).catch(() => {
          res.status(400).json({});
        });
      } catch (err) {
        console.error(`[ERROR] photos/create -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Get all photos for a specific album
   */
  getAllPhotosForAlbum () {
    this.app.get('/albums/:albumId/photos', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.PhotoModel.find({ albumId: req.params.albumId }).then((photos) => {
          res.status(200).json(photos || []);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] albums/:albumId/photos -> ${err}`);
 
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
 
  /**
   * Update a photo by id within a specific album
   */
  updatePhotoInAlbum () {
    this.app.put('/albums/:albumId/photos/:photoId', /*this.authenticateToken,*/ (req, res) => {  // Comment out authenticateToken
      try {
        this.PhotoModel.findOneAndUpdate(
          { _id: req.params.photoId, albumId: req.params.albumId },
          req.body,
          { new: true }
        ).then((photo) => {
          res.status(200).json(photo || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] albums/:albumId/photos/:photoId -> ${err}`);
 
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
    this.getAllPhotosForAlbum();
    this.updatePhotoInAlbum();
  }
}
 
module.exports = Photos;