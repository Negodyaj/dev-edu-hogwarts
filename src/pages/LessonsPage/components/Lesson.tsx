
import '../../LessonsPage/css/Lesson.scss';
import { ArrowSvgSelector } from './images/Arrow';
import '../../LessonsPage/fonts/fonts.scss';
// import '../js/Lesson.jsx';
import { useState } from 'react';
import '../components/Toggle';


export type LessonProps = {
  id: number
  data: LessonModel
  onClick: (id:number) => void
  activeLessonId: number

}

export type LessonModel = {
  id: number
  name: string
  date: string
  theme: string
  videoLink: string
  additionalInfo: string
  // toggle: Toggle
  
}

export const Lesson = (props: LessonProps) => {
  console.log(props.id)
  const lesson = props.data;
 
  const toggleAccordionItem = () => {    
    props.onClick (lesson.id);
  }
  return (
    
    <div className='lesson-container'>
      <div className="header-container">
        <div className="lesson-main-info">
          <div className='lesson-name'>{ lesson.name }</div>
          <div className='lesson-date'>{ lesson.date }</div>
        </div>
        <div className='lesson-theme font-600'>{ lesson.theme }</div>       
        
        <button className='circle' onClick={toggleAccordionItem}><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M0.292893 4.29289C-0.0976314 4.68342 -0.0976315 5.31658 0.292893 5.70711C0.683417 6.09763 1.31658 6.09763 1.70711 5.70711L0.292893 4.29289ZM5 1L5.70711 0.292893C5.31658 -0.0976313 4.68342 -0.0976314 4.29289 0.292893L5 1ZM8.29289 5.70711C8.68342 6.09763 9.31658 6.09763 9.70711 5.70711C10.0976 5.31658 10.0976 4.68342 9.70711 4.29289L8.29289 5.70711ZM1.70711 5.70711L5.70711 1.70711L4.29289 0.292893L0.292893 4.29289L1.70711 5.70711ZM4.29289 1.70711L8.29289 5.70711L9.70711 4.29289L5.70711 0.292893L4.29289 1.70711Z" fill="#A786DF"/>
        </svg>
        </button>
      </div>
      {props.activeLessonId === lesson.id ? (<div className="content-container">
        <div className="video-container grid">
          <div className='video-txt container-250'>Ссылка на видео</div>
          
          <a className="video-link container-470" href={ lesson.videoLink }>Смотреть</a>

        </div>
        
        <div className="additional-container grid">
          <div className='additional-txt'>Дополнительные материалы</div>
          <div className="additional-info">{ lesson.additionalInfo }</div>
        </div>
      </div>) : null }
      
    </div>     
      
      
    
  )
}