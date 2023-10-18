import React from 'react'

const CourseCard = (props) => {
    
  return (
    <div>
       <div class="w-fit rounded overflow-hidden shadow-xl">
  {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{props.course}</div>
    <p class="text-gray-700 text-base">
     {props.description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <button><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Syllabus</span>
    </button>
    <button onClick={props.st}><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Students</span>
</button>
  </div>
</div>
    </div>
  )
}

export default CourseCard
