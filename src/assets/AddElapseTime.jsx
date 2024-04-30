export default function AddElapseTime({ timeList }) {
  return (
    <ul>
      {timeList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
