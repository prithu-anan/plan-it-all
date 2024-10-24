const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const ai = require('./ai/waypoint');
const geocode = require('./ai/geocode');

// Helper function to generate JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token valid for 1 day
  }); 
}

// Signup Function
async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Login Function
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = generateToken(user);

    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get All Users Function
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function getRoutes(req, res) {

  const { lat, lon, dest } = req.query; // Source and destination from query params

  const location = await geocode.getPlaceName(lat, lon);
  src = location.display_name;

  console.log(`Fetching route from ${src} to ${dest}`);

  try {
    // 1. Check if the route already exists in the database
    const existingRoute = await prisma.route.findFirst({
      where: {
        src: {
           name: src ,
        },
        dest: {
          name: dest ,
        },
      },
      include: {
        transportations: {
          include: {
            waypoints: {
              include: { descriptions: true },
            },
          },
        },
      },
    });

    if (existingRoute) {
      console.log('Route found in database:', existingRoute);
      return res.json(existingRoute);
    }

    // 2. If the route does not exist, call the external API to generate it
    const routes = await ai.generateWaypoint(src, dest);
    const jsonObject = JSON.parse(routes);

    console.log('API Response:', jsonObject);

    // 3. Save the API response to the database
    const savedRoute = await prisma.route.create({
      data: {
        src: {
          create: {
            name: jsonObject.src.name,
            latitude: jsonObject.src.latitude,
            longitude: jsonObject.src.longitude,
          },
        },
        dest: {
          create: {
            name: jsonObject.dest.name,
            latitude: jsonObject.dest.latitude,
            longitude: jsonObject.dest.longitude,
          },
        },
        transportations: {
          create: jsonObject.transportations.map((t) => ({
            name: t.name,
            comment: t.comment || null,
            score: t.score || null,
            waypoints: {
              create: t.waypoints.map((w) => ({
                medium: w.medium,
                time: w.time.toString(),
                cost: w.cost,
                descriptions: {
                  create: w.description.map((d) => ({
                    name: d.name,
                    latitude: d.latitude,
                    longitude: d.longitude,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        transportations: {
          include: {
            waypoints: {
              include: { descriptions: true },
            },
          },
        },
      },
    });

    console.log('Saved route to database:', savedRoute);
    return res.json(savedRoute);
  } catch (err) {
    console.error('Error fetching or saving routes:', err);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
}



module.exports = { signup, login, getAllUsers,getRoutes }; 
