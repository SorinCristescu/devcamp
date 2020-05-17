const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')


// @description   Get all bootcamps
// @route         GET/api/v1/bootcamps
// @access        Public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps, message: 'Get all bootcamps' })
    } catch (err) {
        next(err);
    }

}

// @description   Get single bootcamp
// @route         GET/api/v1/bootcamps/:id
// @access        Public

exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp) {
            // if ID is formatted right but not exists
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); 
        }
        res.status(200).json({ success: true, data: bootcamp, message: `Get bootcamp ${req.params.id}` })
    } catch (err) {
        // res.status(400).json({ success: false })
        // if ID is wrong formatted  
        next(err);     
    }

}

// @description   Create new bootcamp
// @route         POST/api/v1/bootcamps
// @access        Private

exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ 
            success: true, 
            data: bootcamp, 
            message: 'New bootcamp created' 
        });
    } catch (err) {
        next(err);
    }

}

// @description   Update bootcamp
// @route         PUT/api/v1/bootcamps/:id
// @access        Private

exports.updateBootcamp = async (req, res, next) => {
    try {
      const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
      }); 
      if(!bootcamp) {
        // if ID is formatted right but not exists
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));   
      } 
      res.status(200).json({ success: true, data: bootcamp, message: `Bootcamp ${req.params.id} updated` })
    } catch (err) {
        next(err);
    }

}

// @description   Delete bootcamp
// @route         DELETE/api/v1/bootcamps/:id
// @access        Private

exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id); 
        if(!bootcamp) {
            // if ID is formatted right but not exists
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));   
        } 
        res.status(200).json({ success: true, data: {}, message: `Bootcamp ${req.params.id} deleted` })
      } catch (err) {
        next(err);
      }
}