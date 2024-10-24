const axios = require('axios');
require('dotenv').config();

const fixedprompt = `
You are a geographical expert. You will be given a source and a destination and your task is to find all the possible routes.
Your output format will follow this Scheme:
Location {
    name: string,
    latitude: number,
    longitude: number
}

Waypoint {
    medium: string,
    time: number,
    cost: number,
    description: [Location, Location]
}

[Here Waypoint.time is in hour and Waypoint.cost is in source country currency]

Transportation {
    name: string,
    comment: string,
    score: number,
    waypoints: Waypoint[]
}

[Here Transportation.score is in 0-100]

Based on the above class definitions, your output will be the following json: 
{
    src: Location,
    dest: Location,
    transportations: Transportation[],
}

For example, if the source location was Dhaka and your destination location was Saint Martin, then a valid response would be
{
  "src": {
    "name": "Dhaka",
    "latitude": 23.81,
    "longitude": 90.41
  },
  "dest": {
    "name": "Saint Martin",
    "latitude": 20.628576,
    "longitude": 92.322815
  },
  "transportations": [
    {
      "name": "Bus + Ferry",
      "comment": "It is the most common route for this trip",
      "score": 53,
      "waypoints": [
        {
          "medium": "Bus",
          "time": 10,
          "cost": 2000,
          
          "description": [
            {
              "name": "Dhaka",
              "latitude": 23.81,
              "longitude": 90.41
            },
            {
              "name": "Teknaf",
              "latitude": 20.859778,
              "longitude": 92.297084
            }
          ]
        },
        {
          "medium": "Ferry",
          "time": 3,
          "cost": 1200,
          
          "description": [
            {
              "name": "Teknaf",
              "latitude": 20.859778,
              "longitude": 92.297084
            },
            {
              "name": "Saint Martin",
              "latitude": 20.628576,
              "longitude": 92.322815
            }
          ]
        }
      ]
    },
    {
      "name": "Plane + Bus + Ferry",
      "comment": "It is faster but one of the most expensive routes",
      "score": 67,
      "waypoints": [
        {
          "medium": "Plane",
          "time": 1,
          "cost": 2000,
          
          "description": [
            {
              "name": "Dhaka",
              "latitude": 23.81,
              "longitude": 90.41
            },
            {
              "name": "Cox's Bazar",
              "latitude": 21.439735,
              "longitude": 92.083275
            }
          ]
        },
        {
          "medium": "Bus",
          "time": 3,
          "cost": 1200,
          
          "description": [
            {
              "name": "Cox's Bazar",
              "latitude": 21.439735,
              "longitude": 92.083275
            },
            {
              "name": "Teknaf",
              "latitude": 20.859778,
              "longitude": 92.297084
            }
          ]
        },
        {
          "medium": "Ferry",
          "time": 3,
          "cost": 1200,
          
          "description": [
            {
              "name": "Teknaf",
              "latitude": 20.859778,
              "longitude": 92.297084
            },
            {
              "name": "Saint Martin",
              "latitude": 92.322815,
              "longitude": 20.628576
            }
          ]
        }
      ]
    }
  ]
}

[Here just to show the example, the number of possible transportation is kept limited to 2, but ideally it should be more than 2]

You are to output the JSON and only the JSON. Nothing else in front or end.
Now give me the route json for a trip from `;



const api_key = process.env.OPENAI_KEY ;

/**
 * Generate a waypoint based on the source and destination using OpenAI API.
 * @param {string} src - The source location.
 * @param {string} dest - The destination location.
 * @returns {Promise<Object>} - A promise that resolves with the generated waypoint or an error.
 */
async function generateWaypoint(src, dest) {
    const data = {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: `${fixedprompt} ${src} to ${dest}` }]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
                'Authorization': `Bearer ${api_key}`, // Ensure to replace with your actual API key
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content; // No need to parse, Axios handles it automatically
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to propagate it to the caller
    }
}

module.exports = {
    generateWaypoint
};
