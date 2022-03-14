import './Links.scss';

export const LinkAddTask=()=>{
    return (
        <span className="add-task-light">
<a href="#">Добавить задание 
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 10.5H15.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 15.75L10.5 5.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</a></span>
    );
}

export const LinkSavedTasks=()=>{
    return (
        <span className="link-saved-tasks">
            <a href="#">Сохраненные задания</a>
        </span>
    )
}