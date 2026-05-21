import { useEffect } from 'react'
import '../styles/LegalPages.css'

export default function Terms() {
    return (
        <main className="page legal-page-layout">
            <section className="legal-container">
                <div className="section-label">User Guidelines</div>
                <h1 className="section-title">Terms of <span>Service</span></h1>
                <p className="legal-date">Last Updated: May 2026</p>

                <div className="legal-content">
                    <h3>1. Operational Protocols</h3>
                    <p>By engaging our crew for production management or technical infrastructure setups, you agree to coordinate asset declarations securely within our specified timelines.</p>

                    <h3>2. Booking & Allocations</h3>
                    <p>All venue scheduling structures, logistics delivery solutions, and equipment arrays become reserved assets only upon formal validation by an authorized EventCrew project leader.</p>

                    <h3>3. Proprietary Media Ownership</h3>
                    <p>All high-fidelity live audio streams, cinematic clips, photography, and structural interfaces hosted across this portal remain copyrighted assets under direct EventCrew ownership.</p>
                </div>
            </section>
        </main>
    )
}