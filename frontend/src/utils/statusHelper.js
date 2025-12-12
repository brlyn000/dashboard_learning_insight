

export const getCourseStatus = (course, progress) => {

    if (progress >= 100) return 'Completed';
    

    const now = new Date();
    const deadline = new Date(course.deadline);
    if (deadline < now && progress < 100) {
        return 'Not Completed';
    }


    if (progress > 0) return 'In Progress';
    return 'Not Started';
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-700';
        case 'Not Completed': return 'bg-red-100 text-red-700';
        case 'In Progress': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-purple-100 text-purple-700';
    }
};