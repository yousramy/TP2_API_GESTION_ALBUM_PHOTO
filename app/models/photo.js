const mongoose = require('mongoose');
 
const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true }
}, {
  collection: 'photos',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});
 
module.exports = photoSchema;