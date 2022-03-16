import './Links.scss';

export type LinkProps={
  className:string,
  text:string,
  url:string
}

export const ButtonLinkWithSvg = (props:LinkProps)=>{
  return (
    <span className={props.className}>
<a href={props.url}/>{props.text}
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 10.5H15.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 15.75L10.5 5.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
);
}

export const LinkAddTask=<ButtonLinkWithSvg className='add-task-light' url="#" text="Добавить задание"/>

export const ButtonLink=(props:LinkProps)=>{
  return (
    <span className={props.className}>
        <a href={props.url}>{props.text}</a>
    </span>
);
}

export const LinkSavedTasks=<ButtonLink className='link-saved-tasks' url="#" text="Сохраненные задания"/>
