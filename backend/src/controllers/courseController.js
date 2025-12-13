
import prisma from '../utils/prisma.js';

// Using singleton prisma from utils


const getCourseStatusFromProgress = (course, progress) => {
  const now = new Date();
  const deadline = course.deadline ? new Date(course.deadline) : null;


  if (progress >= 100) return 'Completed';


  if (deadline && deadline < now && progress < 100) {
    return 'Not Completed';
  }


  if (progress > 0) return 'In Progress';
  return 'Not Started';
};


export const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'userId is required' });
    }

    let journeys;
    try {
      journeys = await prisma.developer_journeys.findMany({
        include: {
          tutorials: {
            select: { id: true },
          },
        },
      });
    } catch (dbError) {
      console.log('Database not available, using fallback courses');
      return res.json({
        success: true,
        data: [
          {
            id: 'course-1',
            title: 'React Fundamentals',
            summary: 'Learn React basics',
            difficulty: 'beginner',
            totalModules: 5,
            doneModules: 3,
            progress: 60,
            status: 'In Progress'
          },
          {
            id: 'course-2',
            title: 'Node.js Backend',
            summary: 'Build REST APIs',
            difficulty: 'intermediate',
            totalModules: 8,
            doneModules: 5,
            progress: 62,
            status: 'In Progress'
          }
        ]
      });
    }


    const trackings = await prisma.developer_journey_trackings.findMany({
      where: {
        developer_id: userId,
        status: 1,
      },
      select: {
        journey_id: true,
        tutorial_id: true,
      },
    });


    const doneMap = {};
    trackings.forEach((t) => {
      if (!doneMap[t.journey_id]) {
        doneMap[t.journey_id] = new Set();
      }
      doneMap[t.journey_id].add(t.tutorial_id);
    });


    const courses = journeys.map((j) => {
      const totalModules = j.tutorials.length;
      const doneModules = doneMap[j.id] ? doneMap[j.id].size : 0;

      const ratio = totalModules > 0 ? doneModules / totalModules : 0;
      const progress = Math.round(ratio * 100);

      const status = getCourseStatusFromProgress(j, progress);

      return {
        id: j.id,
        title: j.name,
        summary: j.summary,
        description: j.description,
        difficulty: j.difficulty,
        deadline: j.deadline,
        hoursToStudy: j.hours_to_study ?? j.hoursToStudy ?? null,
        totalModules,
        doneModules,
        progress,
        status,
      };
    });

    return res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error('[getUserCourses] Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCourseDetail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'courseId and userId are required',
      });
    }


    const course = await prisma.developer_journeys.findUnique({
      where: { id: courseId },
      include: {
        tutorials: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            title: true,
            type: true,
            position: true,
            content: true,
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }


    const trackings = await prisma.developer_journey_trackings.findMany({
      where: {
        developer_id: userId,
        journey_id: courseId,
      },
      select: {
        tutorial_id: true,
        status: true,
      },
    });


    const trackingMap = {};
    trackings.forEach((t) => {
      trackingMap[t.tutorial_id] = t.status === 1; // status 1 = completed
    });


    const modulesByType = {};
    
    course.tutorials.forEach((tutorial) => {
      const type = tutorial.type || 'default';
      
      if (!modulesByType[type]) {
        modulesByType[type] = {
          title: type.charAt(0).toUpperCase() + type.slice(1) + ' Modules',
          subModules: [],
        };
      }
      
      modulesByType[type].subModules.push({
        id: tutorial.id,
        title: tutorial.title,
        type: tutorial.type,
        content: tutorial.content,
        position: tutorial.position,
        isCompleted: trackingMap[tutorial.id] || false,
      });
    });


    const modules = Object.values(modulesByType);


    const totalTutorials = course.tutorials.length;
    const completedTutorials = Object.values(trackingMap).filter(Boolean).length;
    const progress = totalTutorials > 0 
      ? Math.round((completedTutorials / totalTutorials) * 100) 
      : 0;


    const response = {
      id: course.id,
      title: course.name,
      desc: course.description || course.summary || 'No description available',
      totalHours: course.hours_to_study || 0,
      deadline: course.deadline ? new Date(course.deadline).toLocaleDateString() : 'No deadline',
      progress,
      modules: modules,
    };

    return res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('[getCourseDetail] Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};