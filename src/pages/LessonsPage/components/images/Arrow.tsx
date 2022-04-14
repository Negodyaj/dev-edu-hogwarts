import React from "react";


interface Props {
  id: string;
}

export const ArrowSvgSelector = ({id}: Props) => {
  switch (id) {
    case 'top':
      return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.292893 4.29289C-0.0976314 4.68342 -0.0976315 5.31658 0.292893 5.70711C0.683417 6.09763 1.31658 6.09763 1.70711 5.70711L0.292893 4.29289ZM5 1L5.70711 0.292893C5.31658 -0.0976313 4.68342 -0.0976314 4.29289 0.292893L5 1ZM8.29289 5.70711C8.68342 6.09763 9.31658 6.09763 9.70711 5.70711C10.0976 5.31658 10.0976 4.68342 9.70711 4.29289L8.29289 5.70711ZM1.70711 5.70711L5.70711 1.70711L4.29289 0.292893L0.292893 4.29289L1.70711 5.70711ZM4.29289 1.70711L8.29289 5.70711L9.70711 4.29289L5.70711 0.292893L4.29289 1.70711Z" fill="#A786DF"/>
        </svg>
      );
    case 'down':
      return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L9.70711 1.70711ZM5 5L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L5 5ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM8.29289 0.292893L4.29289 4.29289L5.70711 5.70711L9.70711 1.70711L8.29289 0.292893ZM5.70711 4.29289L1.70711 0.292893L0.292893 1.70711L4.29289 5.70711L5.70711 4.29289Z" fill="#A786DF"/>
        </svg>
      )
    default:
    return null
    break;
      
  }
}