window.app = {
    current: { level: '', year: '', stream: '', studentId: null, combo: null },
    history: ['home'],
    
    showPage(page) {
        document.querySelectorAll('#content-container > div').forEach(p => p.classList.add('hidden'));
        let el = document.getElementById(page + '-page');
        if(el) {
            el.classList.remove('hidden');
            if(page === 'teacherDashboard') teacher.update();
            if(page === 'teacherManagement') admin.updateTeachers();
            if(page === 'userManagement') admin.updateUsers();
        }
        history.pushState({page}, '', `#${page}`);
        if(this.history[this.history.length-1] !== page) this.history.push(page);
        this.updateBack();
    },
    
    goBack() {
        if(this.history.length > 1) {
            this.history.pop();
            this.showPage(this.history[this.history.length-1]);
        } else this.showPage('home');
    },
    
    updateBack() {
        let btn = document.getElementById('header-back-btn');
        if(btn) btn.classList.toggle('hidden', this.history.length <= 1 || this.history[this.history.length-1] === 'home');
    },
    
    openProfile() { this.showPage('profileSettings') },
    
    notify(msg, type) {
        let n = document.createElement('div');
        n.className = `notification ${type}`;
        n.textContent = msg;
        document.getElementById('notification-container').appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }
};

window.onpopstate = (e) => app.showPage(e.state?.page || 'home');
