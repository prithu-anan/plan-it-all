import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services, tripRoutes } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { useLocation, useNavigate } from 'react-router-dom'

const ServiceCard = ({ index, name, comment, score }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/map'); // Navigate to the provided route
  };

  return(
    <Tilt className="xs:w-[250px] w-full">
			<div
				className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
				onClick={() => { handleCardClick() }}
			>
				<div
					options={{
						max: 45,
						scale: 1,
						speed: 450
					}}
					className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
				>
					<h3 className='text-white text-[25px] font-bold text-center'>
						{name}
					</h3>
					<h4 className='text-white text-[15px] font-bold text-center'>
						{comment}
					</h4>
				</div>
				<div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
					<div className='bg-purple-950 text-white py-1 px-3 rounded-md shadow-md h-8'>
						<p>Score: {score}</p>
					</div>
				</div>
			</div>
		</Tilt>
  )
}

const TripRoutes = () => {
  const location = useLocation();
  const transportations = location.state?.transportations || [];

  // Sort transportations by score in descending order
  const sortedTransportations = transportations.sort((a, b) => b.score - a.score);

  return (
    <section className="relative w-full h-screen mx-auto pt-56">
      <div className="flex flex-col items-center">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>Destination</p>
          <h2 className={styles.sectionHeadText}>Choose Your Route</h2>
        </motion.div>

        <div className="mt-20 flex flex-wrap gap-10">
          {sortedTransportations.map((trip, index) => (
            <ServiceCard key={trip.name} index={index} {...trip} />  
          ))}
        </div>
      </div>
    </section>
  );
}

export default TripRoutes