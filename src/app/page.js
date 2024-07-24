"use client"

import Image from "next/image";
import { TodoList } from "@/Components/TodoList";

export default function Home() {
  return (
    
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">       
      < TodoList user="user2" />
      </div>
  );
}
