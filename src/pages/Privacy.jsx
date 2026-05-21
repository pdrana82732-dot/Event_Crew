import { useEffect } from 'react'
import '../styles/LegalPages.css' // We will create this simple stylesheet next

export default function Privacy() {
  return (
    <main className="page legal-page-layout">
      <section className="legal-container">
        <div className="section-label">Legal Security</div>
        <h1 className="section-title">Privacy <span>Policy</span></h1>
        <p className="legal-date">Last Updated: May 2026</p>
        
        <div className="legal-content">
          <h3>1. Information Gathering</h3>
          <p>We process data submitted explicitly through our inquiry systems. This includes names, email logs, and operational service requests required to engineer custom estimates.</p>
          
          <h3>2. Data Utilization</h3>
          <p>Your specifications are used purely to coordinate event logistics and establish secure communications with your assigned event crew manager.</p>
          
          <h3>3. Protection Safeguards</h3>
          <p>We enforce strict encryption parameters across all contact logs. EventCrew does not monetize, distribute, or exchange user profiles with external advertising aggregators.</p>
        </div>
      </section>
    </main>
  )
}