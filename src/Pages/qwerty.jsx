import React from 'react';

const YourComponent = () => {
  const addTask = () => {
    // Implement your addTask function logic here
  };

  return (
    <form className="flex flex-col md:flex-row bg-white p-4 mb-1 gap-2 justify-between" onSubmit={(e) => {
      e.preventDefault();
      const task = e.target.task.value;
      const grade = e.target.grade.value;
      const topic = e.target.topic.value;
      const due_date = e.target.due_date.value;
      const time = e.target.time.value;
      const type = e.target.type.value;
      const evaluated_by = e.target.evaluated_by.value;
      const status = e.target.status.value;
      const mark = e.target.mark.value;
      const evaluated = e.target.evaluated.value;

      if (task && grade) {
        addTask(
          task,
          grade,
          topic,
          due_date,
          time,
          type,
          evaluated_by,
          status,
          mark,
          evaluated
        );
        e.target.reset();
      }
    }}>
      <div className="flex flex-col md:flex-row mb-4">
        <div className="md:w-1/4 mb-2 md:mb-0">
          <label htmlFor="task" className="block text-gray-700 text-sm font-bold mb-2">
            Task:
          </label>
          <input
            type="text"
            name="task"
            id="task"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="md:w-1/4 mb-2 md:mb-0">
          <label htmlFor="grade" className="block text-gray-700 text-sm font-bold mb-2">
            Grade:
          </label>
          <input
            type="text"
            name="grade"
            id="grade"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="md:w-1/4 mb-2 md:mb-0">
          <label htmlFor="topic" className="block text-gray-700 text-sm font-bold mb-2">
            Topic:
          </label>
          <input
            type="text"
            name="topic"
            id="topic"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="md:w-1/4 mb-2 md:mb-0">
          <label htmlFor="due_date" className="block text-gray-700 text-sm font-bold mb-2">
            Due Date:
          </label>
          <input
            type="text"
            name="due_date"
            id="due_date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mb-4">
      <label
                  htmlFor="time"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Time:
                </label>
                <input
                  type="text"
                  name="time"
                  id="time"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
      </div>

      <div className="flex flex-col md:flex-row mb-4">
      <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type:
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
      </div>

      <div className="flex flex-col md:flex-row mb-4">
      <label
                  htmlFor="evaluated_by"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Evaluated By
                </label>
                <input
                  type="text"
                  name="evaluated_by"
                  id="evaluated_by"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
      </div>
      <div className="flex flex-col md:flex-row mb-4">
      <label
                  htmlFor="status"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
      </div>
      <div className="flex flex-col md:flex-row mb-4">
      <label
                  htmlFor="mark"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mark:
                </label>
                <input
                  type="text"
                  name="mark"
                  id="mark"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
      </div>
      <div className="flex flex-col md:flex-row mb-4">
      <label
                  htmlFor="evaluated"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Evaluated:
                </label>
                <input
                  type="text"
                  name="evaluated"
                  id="evaluated"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default YourComponent;
