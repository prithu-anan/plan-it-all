import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { useNavigate } from 'react-router-dom'

const ServiceCard = ({ index, title, icon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/itinerary'); // Navigate to the provided route
  };

  return(
    <Tilt className="xs:w-[250px] w-full" >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        onClick={() => {handleCardClick()}}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Our Features</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Our travel route suggestion website is designed to simplify your journey planning process. With just a few clicks, users can input their desired destination and preferences, and our intelligent algorithm generates optimal travel routes tailored to individual needs. Whether you're looking for the fastest route, scenic paths, or stops along the way for dining and sightseeing, our platform provides detailed itineraries and maps to enhance your travel experience.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service}/>  
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")