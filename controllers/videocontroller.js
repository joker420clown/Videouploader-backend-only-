const Video = require('../models/Video');
const path = require('path');

exports.uploadVideos = async (req,res) => {
        const { title, description} = req.body;
        const filepath = req.file.path;
        const video = new Video({title, description, filepath, userId: req.user.id })
   
        try{
            await video.save();
            res.status(201).json({message: 'Video uploaded successfully', video});
        }
        catch(error){
            res.status(500).json({error:'error in uploading', error});
        }
}

exports.getVideos = async (req, res) => {
    try{
        const videos = await Video.find().populate('userId', 'username');
        res.status(200).json({videos});
    }
    catch(error){
        res.status(500).json({error:'error in fetching videos', error});
    }
}
