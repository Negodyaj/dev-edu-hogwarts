export type LessonProps = {
  data: LessonModel
}

export type LessonModel = {
  id: number
  name: string
  date: string
  theme: string
}

export const Lesson = (props: LessonProps) => {
  const lesson = props.data;

  return (
    <>
      <div>{ lesson.name }</div>
      <div>{ lesson.date }</div>
      <div>{ lesson.theme }</div>
      <br />
      <br />
    </>
  )
}