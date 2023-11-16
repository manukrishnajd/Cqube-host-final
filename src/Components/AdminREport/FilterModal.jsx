import React from 'react'
const FilterModal = ({
  isOpen,
  onClose,
  handleStartDate,
  handleEndDate,
  handleSubmit,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md mx-auto rounded-md">
        <h2 className="text-2xl font-bold mb-4">Filter Options</h2>

        <div className="flex space-x-4">
          <input
            onChange={handleStartDate}
            type="date"
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            onChange={handleEndDate}
            type="date"
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Submit
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-blue-500 underline cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default FilterModal
