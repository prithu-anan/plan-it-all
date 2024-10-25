const axios = require('axios');
// const fs = require('fs');
require('dotenv').config();

// Your API key
const apiKey = process.env.OPENAI_API_KEY;

// Function to get image description from API
async function generateAiCaption(encodedImage) {
    // Prepare the payload
    const payload = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: [{ type: "text", text: "You are a cool image analyst. Your goal is to describe what is in this image." }]
            },
            {
                role: "user",
                content: [
                    { type: "text", text: "What is in the image?" },
                    { 
                      type: "image_url", 
                      image_url: {
                        url: `data:image/jpeg;base64,${encodedImage}`
                      }
                    }
                ]
            }
        ],
        max_tokens: 500
    };

    // Set headers
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    try {
        // Make the API request using axios
        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
        // Return the first choice string reply
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error during API request:', error);
    }
}

/*
// Example usage
// Load and encode the image in base64
const imageFilePath = 'bart.png'; // Replace with your image path
const imageBuffer = fs.readFileSync(imageFilePath);
const encodedImage = imageBuffer.toString('base64');

console.log(encodedImage);


// Call the function to get the image description
generateAiCaption(encodedImage).then(description => {
    console.log('Image Description:', description);
});
*/

// module.exports = {
//   generateAiCaption
// };

export default generateAiCaption





