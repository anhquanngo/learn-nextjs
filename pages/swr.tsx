import { StudentDetail } from "@/components/swr";
import * as React from "react";

export default function SWRPage() {
  const [detailList, setDetailList] = React.useState([1, 1, 1]);

  function handelAddClick() {
    setDetailList((prevList) => [...prevList, 1]);
  }
  return (
    <div>
      <h1>SWR Page</h1>
      <button onClick={handelAddClick}>Add detail</button>
      <ul>
        {detailList.map((x, index) => (
          // eslint-disable-next-line react/jsx-key
          <li key={index}>
            <StudentDetail studentId="sktwi1cgkkuif36f5" />
          </li>
        ))}
      </ul>
    </div>
  );
}
