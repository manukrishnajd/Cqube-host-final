import React, { useState } from 'react';

const CourseTile = ({ title, technologies }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg m-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">Technologies: {technologies.join(', ')}</p>
    </div>
  );
};

const MainCourse = ({ mainCourse, onMainCourseClick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg m-4 bg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{mainCourse.title}</h2>
        <button
          onClick={() => {
            handleExpandClick();
            onMainCourseClick(mainCourse.id);
          }}
          className="px-4 py-2 rounded-full bg-blue-500 text-white"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {expanded && (
        <div className="flex flex-wrap mt-4">
          {mainCourse.subCourses.map((subCourse) => (
            <CourseTile
              key={subCourse.id}
              title={subCourse.title}
              technologies={subCourse.technologies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CourseTree = () => {
  const courses = [
    {
      id: 1,
      title: 'Main Course 1',
      subCourses: [
        {
          id: 11,
          title: 'Sub Course 1.1',
          technologies: ['Technology A', 'Technology B'],
        },
        {
          id: 12,
          title: 'Sub Course 1.2',
          technologies: ['Technology C', 'Technology D'],
        },
        {
          id: 13,
          title: 'Sub Course 1.3',
          technologies: ['Technology E', 'Technology F'],
        },
      ],
    },
    {
      id: 2,
      title: 'Main Course 2',
      subCourses: [
        {
          id: 21,
          title: 'Sub Course 2.1',
          technologies: ['Technology G', 'Technology H'],
        },
        {
          id: 22,
          title: 'Sub Course 2.2',
          technologies: ['Technology I', 'Technology J'],
        },
        {
          id: 23,
          title: 'Sub Course 2.3',
          technologies: ['Technology K', 'Technology L'],
        },
      ],
    },
    {
      id: 3,
      title: 'Main Course 2',
      subCourses: [
        {
          id: 21,
          title: 'Sub Course 2.1',
          technologies: ['Technology G', 'Technology H'],
        },
        {
          id: 22,
          title: 'Sub Course 2.2',
          technologies: ['Technology I', 'Technology J'],
        },
        {
          id: 23,
          title: 'Sub Course 2.3',
          technologies: ['Technology K', 'Technology L'],
        },
      ],
    },
    {
      id: 4,
      title: 'Main Course 2',
      subCourses: [
        {
          id: 21,
          title: 'Sub Course 2.1',
          technologies: ['Technology G', 'Technology H'],
        },
        {
          id: 22,
          title: 'Sub Course 2.2',
          technologies: ['Technology I', 'Technology J'],
        },
        {
          id: 23,
          title: 'Sub Course 2.3',
          technologies: ['Technology K', 'Technology L'],
        },
      ],
    },
    {
      id: 5,
      title: 'Main Course 2',
      subCourses: [
        {
          id: 21,
          title: 'Sub Course 2.1',
          technologies: ['Technology G', 'Technology H'],
        },
        {
          id: 22,
          title: 'Sub Course 2.2',
          technologies: ['Technology I', 'Technology J'],
        },
        {
          id: 23,
          title: 'Sub Course 2.3',
          technologies: ['Technology K', 'Technology L'],
        },
      ],
    },
    {
      id: 5,
      title: 'Main Course 2',
      subCourses: [
        {
          id: 21,
          title: 'Sub Course 2.1',
          technologies: ['Technology G', 'Technology H'],
        },
        {
          id: 22,
          title: 'Sub Course 2.2',
          technologies: ['Technology I', 'Technology J'],
        },
        {
          id: 23,
          title: 'Sub Course 2.3',
          technologies: ['Technology K', 'Technology L'],
        },
      ],
    },
  ];

  const [expandedMainCourseId, setExpandedMainCourseId] = useState(null);

  const handleMainCourseClick = (courseId) => {
    setExpandedMainCourseId(expandedMainCourseId === courseId ? null : courseId);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course) => (
        <MainCourse
          key={course.id}
          mainCourse={course}
          onMainCourseClick={handleMainCourseClick}
        />
      ))}
    </div>
  );
};

export default CourseTree;
