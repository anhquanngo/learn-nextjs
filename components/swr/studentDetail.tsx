import * as React from "react";
import useSWR from "swr";

export interface StudentDetailProps {
  studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: 3000,
  });

  function handelMutateClick() {
    mutate({ name: "Anh Quan" }, false);
  }

  return (
    <div>
      Name: {data?.name || "=="} <button onClick={handelMutateClick}>mutate</button>
    </div>
  );
}
