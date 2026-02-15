window.DB = {
    admins: {
        'shaniltyra62@gmail.com': { password: 'Shanil', fullName: 'Shani Tyra', role: 'admin' }
    },
    teachers: JSON.parse(localStorage.getItem('smuk_teachers')) || {},
    students: JSON.parse(localStorage.getItem('smuk_students')) || {
        'O-Level': {
            'S.1': { North: [], South: [], East: [], West: [] },
            'S.2': { North: [], South: [], East: [], West: [] },
            'S.3': { North: [], South: [], East: [], West: [] },
            'S.4': { North: [], South: [], East: [], West: [] }
        },
        'A-Level': { 'S.5': [], 'S.6': [] }
    },
    timetables: JSON.parse(localStorage.getItem('smuk_timetables')) || {
        'S.1': { North: [], South: [], East: [], West: [] },
        'S.2': { North: [], South: [], East: [], West: [] },
        'S.3': { North: [], South: [], East: [], West: [] },
        'S.4': { North: [], South: [], East: [], West: [] },
        'S.5': [], 'S.6': []
    },
    streams: ['North', 'South', 'East', 'West'],
    combinations: {
        PCM: { name: 'PCM (Physics, Chemistry, Math)', subjects: ['Physics', 'Chemistry', 'Math'] },
        PCB: { name: 'PCB (Physics, Chemistry, Biology)', subjects: ['Physics', 'Chemistry', 'Biology'] },
        MEG: { name: 'MEG (Math, Economics, Geography)', subjects: ['Math', 'Economics', 'Geography'] }
    },
    oLevelSubjects: ['Math', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History'],
    progression: { 'S.1':'S.2', 'S.2':'S.3', 'S.3':'S.4', 'S.4':'S.5', 'S.5':'S.6', 'S.6':'Graduated' },
    
    saveStudents() { localStorage.setItem('smuk_students', JSON.stringify(this.students)) },
    saveTeachers() { localStorage.setItem('smuk_teachers', JSON.stringify(this.teachers)) },
    saveTimetables() { localStorage.setItem('smuk_timetables', JSON.stringify(this.timetables)) },
    
    nextId() {
        let max = 0;
        Object.values(this.students).forEach(l => {
            Object.values(l).forEach(y => {
                if(Array.isArray(y)) y.forEach(s => { if(s.id > max) max = s.id });
                else Object.values(y).forEach(stream => stream.forEach(s => { if(s.id > max) max = s.id }));
            });
        });
        return max + 1;
    }
};
