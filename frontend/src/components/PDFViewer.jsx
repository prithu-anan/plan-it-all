import React from 'react'
import { styles } from '../styles'

const PDFViewer = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col items-center gap-5`}
      >
				{/* Header and Plus Icon */}
				{/* PDF Viewer */}
				<div className="rounded-xl shadow-card flex justify-center items-center">
					<iframe
						src="../public/Cracking the Coding Interview.pdf"
						title="pdf"
						className="flex items-center w-[50vw] h-[80vh]"
					/>
					</div>
    	</div>
    </section>
  )
}

export default PDFViewer