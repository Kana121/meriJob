import React from 'react'
import 
{ BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                 Duniya Job
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/company-home">
                    <BsGrid1X2Fill className='icon'/> Home
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsFillArchiveFill className='icon'/> Search Candidates
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/job-postings">
                    <BsFillGrid3X3GapFill className='icon'/> Job Posting
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsPeopleFill className='icon'/> Shortlist
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsListCheck className='icon'/> Interview
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsMenuButtonWideFill className='icon'/> Massage
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsFillGearFill className='icon'/> Setting
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar