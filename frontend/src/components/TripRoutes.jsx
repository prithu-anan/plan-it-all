import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services, tripRoutes } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { useLocation, useNavigate } from 'react-router-dom'

const ServiceCard = ({ index, cost, time, name, comment, score }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative">
          {/* Recommended Sticker */}
          {index === 0 && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
              Recommended
            </div>
          )}
					<div className="absolute top-2 right-2 bg-purple-800 text-white text-xs font-bold py-1 px-2 rounded-full">
            Score: {score}
          </div>
          <h3 className='text-white text-[25px] font-bold text-center'>
            {name}
          </h3>
          <h4 className='text-white text-[15px] font-bold text-center'>
            {comment}
          </h4>
					<h4 className='text-white text-[15px] font-bold text-center'>
            <span className='text-purple-600'>Cost: </span>{cost} BDT
          </h4>
					<h4 className='text-white text-[15px] font-bold text-center'>
						<span className='text-purple-600'>Time: </span>{time} H
          </h4>
        </div>
      </div>
    </Tilt>
  );
}

const TripRoutes = () => {
  const location = useLocation();
  const transportations = location.state?.transportations || [];
	const destination = location.state?.destination || '';
	const cost = location.state?.cost || -1;
	const time = location.state?.time || -1;

  // Sort transportations by score in descending order
  const sortedTransportations = transportations.sort((a, b) => b.score - a.score);

  return (
    <section className="relative w-full h-screen mx-auto pt-56">
      <div className="flex flex-col items-center">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>Choose Your <span className="text-purple-800">Route</span></p>
          <h2 className={`${styles.sectionHeadText} text-center uppercase`}>{destination}</h2>
        </motion.div>

        <div className="mt-20 flex flex-wrap gap-10">
          {sortedTransportations.map((trip, index) => (
            <ServiceCard key={trip.name} index={index} cost={cost} time={time} {...trip} />  
          ))}
        </div>
      </div>
    </section>
  );
}

export default TripRoutes