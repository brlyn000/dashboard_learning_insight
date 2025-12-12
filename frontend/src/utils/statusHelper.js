// File: frontend/src/utils/statusHelper.js

export const getCourseStatus = (course, progress) => {
    // 1. Cek Completed
    if (progress >= 100) return 'Completed';
    
    // 2. Cek Not Completed (Deadline Lewat & Belum 100%)
    const now = new Date();
    const deadline = new Date(course.deadline);
    if (deadline < now && progress < 100) {
        return 'Not Completed';
    }

    // 3. Cek In Progress / Not Started
    if (progress > 0) return 'In Progress';
    return 'Not Started';
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-700';
        case 'Not Completed': return 'bg-red-100 text-red-700'; // Merah untuk deadline lewat
        case 'In Progress': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-purple-100 text-purple-700';
    }
};