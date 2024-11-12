const mongoose = require('mongoose');

// Define the Painting schema
const paintingSchema = new mongoose.Schema({
    PaintingID: { type: Number, required: true },
    ArtistID: { type: Number, required: true },
    FirstName: { type: String, default: null },
    LastName: { type: String, required: true },
    ImageFileName: { type: String, required: true },
    Title: { type: String, required: true },
    GalleryID: { type: Number, required: true },
    GalleryName: { type: String, required: true },
    GalleryCity: { type: String, required: true },
    GalleryCountry: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    ShapeID: { type: Number, required: true },
    MuseumLink: { type: String, required: true },
    AccessionNumber: { type: String, required: true },
    CopyrightText: { type: String, required: true },
    Description: { type: String, required: true },
    Excerpt: { type: String, required: true },
    YearOfWork: { type: Number, required: true },
    Width: { type: Number, required: true },
    Height: { type: Number, required: true },
    Medium: { type: String, required: true },
    Cost: { type: Number, required: true },
    MSRP: { type: Number, required: true },
    WikiLink: { type: String, required: true },
    ShapeName: { type: String, required: true },
    JsonAnnotations: {
        safeSearchAnnotation: {
            violence: { type: Number, required: true },
            racy: { type: Number, required: true }
        },
        dominantColors: [
            {
                color: {
                    red: { type: Number, required: true },
                    green: { type: Number, required: true },
                    blue: { type: Number, required: true }
                },
                web: { type: String, required: true },
                name: { type: String, required: true }
            }
        ]
    }
});

// Create the Painting model
const Painting = mongoose.model('Painting', paintingSchema, 'Paintings'); // Use 'Paintings' for case-sensitive matching


// Export the model
module.exports = Painting;
