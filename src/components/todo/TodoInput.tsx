// 할 일 입력창
import React, { useState } from 'react';

const TodoInput: React.FC = () => {
  const [task, setTask] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAdd = () => {
    if (task.trim()) {
      console.log('할 일 추가:', task);
      setTask('');
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={task}
        onChange={handleChange}
        className="border p-2 rounded-md w-full"
        placeholder="할 일을 입력하세요"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        추가
      </button>
    </div>
  );
};

export default TodoInput;
