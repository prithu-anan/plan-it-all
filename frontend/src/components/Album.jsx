import React, { useRef, useState } from 'react';
import { styles } from '../styles';
import { motion } from 'framer-motion';
import { trip1, trip2, trip3, trip4, trip5, trip6, plus } from '../assets';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
// import { generateAiCaption } from '../../../backend/caption';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' },
  },
};

const images = [
  trip1,
  trip2,
  trip3,
  trip4,
  trip5,
  trip6,
];

const Album = () => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // URL of uploaded image
  const [selectedImage, setSelectedImage] = useState(null); // Currently selected image
  const [openDialog, setOpenDialog] = useState(false); // Dialog open state
  const [openImageDialog, setOpenImageDialog] = useState(false); // Image dialog open state
  const [place, setPlace] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  // Handle the button click to trigger file input
  const handlePlusClick = () => {
    setOpenDialog(true); // Open the dialog instead of file input
  };

  // Function to handle file input change (when an image is selected)
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Read the file as a Buffer
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1]; // Get base64 string only
            console.log(base64data); // This is your encoded image
            
            // Call the function to get the image description
            // generateAiCaption(base64data).then(description => {
            //     console.log('Image Description:', description);
            // });

            // Proceed with uploading the image to Firebase
            uploadImage(file);
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
};

// Function to upload image to Firebase Storage
const uploadImage = (file) => {
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to 'images' folder in Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true); // Start uploading state

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            // Progress function (optional)
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            // Error handling
            console.error('Upload failed:', error);
            setUploading(false);
        },
        () => {
            // On successful upload, get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at:', downloadURL);
                setImageUrl(downloadURL); // Set the uploaded image URL
                setUploading(false); // End uploading state
            });
        }
    );
};


  // Function to open the dialog with the selected image
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

    // Function to close the image dialog
    const handleImageCloseDialog = () => {
        setOpenImageDialog(false);
    };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null); // Reset selected image
    setPlace(''); // Reset place input
    setTime(''); // Reset time input
    setDescription(''); // Reset description input
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log({ imageUrl, place, time, description });
    handleCloseDialog(); // Close the dialog after submission
  };

  return (
    <section className='relative w-full h-screen mx-auto'>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col items-start gap-5`}
      >
        {/* Header and Plus Icon */}
        <div className="flex flex-row justify-between items-center w-full">
          {/* Header Text */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <h1 className={`${styles.heroHeadText} text-white`}>
              See Your <span className='text-[#915eff]'>Memories</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Where have you been to?
            </p>
          </motion.div>

          {/* Plus Icon */}
          <div
            className="w-12 h-12 flex justify-center items-center rounded-full bg-[#915eff] cursor-pointer hover:bg-purple-800 transition-all"
            onClick={handlePlusClick} // Open the dialog on click
          >
            <img src={plus} alt='plus' className='w-6 h-6' />
          </div>
        </div>

        {/* Image Grid with Motion */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
          {images.map((src, index) => (
            <motion.div
              key={index}
              className='w-full h-full cursor-pointer'
              onClick={() => handleImageClick(src)} // Click to open image
              initial={{ opacity: 0, scale: 0.95 }} // Initial animation state
              animate={{ opacity: 1, scale: 1 }} // Animation on render
              transition={{ duration: 1 }} // Transition settings
            >
              <img
                src={src}
                alt={`Album ${index}`}
                className='w-full h-full object-cover rounded-lg shadow-lg'
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialog for Adding New Memory */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add a New Memory</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Place"
              type="text"
              fullWidth
              variant="outlined"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              type="date"
              fullWidth
              variant="outlined"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginTop: '10px' }} // Adjust styling as needed
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Add Memory
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Image Viewing */}
      <Dialog open={openImageDialog} onClose={handleImageCloseDialog} fullWidth maxWidth="lg">
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full" // Adjust as needed for responsiveness
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Album;
