export const AttendanceRatingColumn = ({ data }: any) => {
  return (
    <div className="list-container rating">
      <div className="one-block rating">
        <b>%</b>
      </div>
      <div className="one-block rating" />
      {data.map((student: any, index: number) => {
        const successIndicator =
          student.percent >= 85 ? 'green' : student.percent < 70 ? 'red' : 'yellow';
        return (
          <div className="one-block rating" key={index}>
            <span className={`indicator ${successIndicator}`} />
            {student.percent}%
          </div>
        );
      })}
      <div className="one-block rating" />
    </div>
  );
};
