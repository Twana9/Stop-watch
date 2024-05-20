export default function AddElapseTime({ timeList, onDelete }) {
  return (
    <ul>
      {timeList.map((item, index) => (
        <li key={index}>
          {item}
          <button
            className="btn stop-btn"
            onClick={() => {
              onDelete(index);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
