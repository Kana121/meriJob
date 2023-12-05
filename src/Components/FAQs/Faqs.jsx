import React from 'react'
import styles from './Faqs.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Faqs = () => {
  return (
    <section className={styles.FaqSec}>
        <h1 className={styles.Faq_Heading}>Frequently asked questions</h1>
        <div className={styles.Faq_grid}>
            <div className={styles.faq_ques}>
                <p className="ques">How do I upgrade/downgrade my workplace plan?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">Can I add other information be added to an invoice?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">why should I use a new table vs. a view?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">how can I transfer data from one base to another?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">How do I change my account email address?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">How does billing work?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">Can I share an individual app?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">Can I export list of all collaborators?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">Can invoices be sent other collaborators?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className={styles.faq_ques}>
                <p className="ques">How do I contact support?</p>
                <Link to='faq' style={{textDecoration:"none",color:'black'}}><FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
        </div>

    </section>
  )
}

export default Faqs