import React from 'react'
import { styles } from '../styles'

const PDFViewer = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col items-start gap-5`}
      >
				{/* Header and Plus Icon */}
				<div className="flex flex-row justify-between items-center w-full">
					{/* Header Text */}
					<div className="flex flex-col items-start gap-5">
						<h1 className={`${styles.sectionHeadText} text-white`}>PDF Viewer</h1>
						<p className={`${styles.sectionSubText} text-white`}>
							View your PDF here
						</p>
					</div>
				</div>
				{/* PDF Viewer */}
				<div className="w-full h-full bg-white rounded-xl shadow-card flex justify-center items-center">
					<iframe
						src="../public/Cracking the Coding Interview.pdf"
						title="pdf"
						className="w-full h-[120vh]"
					/>
					</div>
    	</div>
    </section>
  )
}

export default PDFViewer