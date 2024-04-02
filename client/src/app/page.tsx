"use client";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR(`http://localhost:1337/api/me`, fetcher);

  if (data) return <div className="">{JSON.stringify(data)}</div>;
  return <div className="">login</div>;
}
