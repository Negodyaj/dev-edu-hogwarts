import { useEffect, useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import { TabContainer } from "../../components/TabContainer/TabContainer";
import { useDispatch, useSelector } from "react-redux";
import { baseWretch } from "../../services/base-wretch.service";
import { AppState } from "../../store/store";
import { loadLessons } from "../../actions/lessons.actions";
import { LessonResponse } from "../../models/responses/LessonResponse";

export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const { lessons, tabs, selectedTab } = useSelector(
    (state: AppState) => state.lessonPageState
  );

  const dispatch = useDispatch();

  function onElementClick(id: number) {
    setActiveLesson(id === activeLesson ? 0 : id);
  }

  useEffect(() => {
    if (selectedTab > 0) {
      baseWretch()
        .url(`by-groupId/${selectedTab}`)
        .get()
        .json((data) => dispatch(loadLessons(data as LessonResponse[])));
    }
  }, [selectedTab]);

  const newLessons = lessons?.map((item) => {
    let newLessons: LessonModel = {
      id: item.id,
      name: "Имя", //заменить методом!
      date: item.date,
      theme: "Тема", //заменить (взять данные с бэка)!
      videoLink: item.linkToRecord,
      additionalInfo: item.additionalMaterials,
    };
    return newLessons;
  }); //////////////////////////////////////

  return (
    <>
      {/* <TabContainer tabContainerData={ [
        {id: 1, icon: Icon.Cookie, text: 'Базовый курс'},
        {id: 2, icon: Icon.Calendar, text: 'Специализация Backend'},
        {id: 3, icon: Icon.Computer, text: 'Специализация Frontend'},
        {id: 4, icon: Icon.Cake, text: 'Специализация QA'},
        ] } selectedTab={1}
      /> */}

      <TabContainer tabContainerData={tabs} selectedTab={selectedTab} />

      <div>Занятия</div>
      <div className="lessons-container">
        {newLessons?.map((lesson) => (
          <Lesson
            data={lesson}
            id={lesson.id}
            key={lesson.id}
            activeLessonId={activeLesson}
            onClick={onElementClick}
          />
        ))}
      </div>
    </>
  );
};
