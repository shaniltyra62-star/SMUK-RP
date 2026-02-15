window.auth = {
    user: null, type: null, data: null,
    
    showLogin() {
        document.getElementById('login-modal').style.display = 'flex';
        let remembered = localStorage.getItem('remembered');
        if(remembered) {
            document.getElementById('login-username').value = remembered;
            document.getElementById('remember-me').checked = true;
        }
    },
    
    hideLogin() { document.getElementById('login-modal').style.display = 'none' },
    
    login() {
        let u = document.getElementById('login-username').value.trim();
        let p = document.getElementById('login-password').value.trim();
        let r = document.getElementById('remember-me').checked;
        
        if(DB.admins[u] && DB.admins[u].password === p) {
            this.user = u; this.type = 'admin'; this.data = DB.admins[u];
            if(r) localStorage.setItem('remembered', u); else localStorage.removeItem('remembered');
            this.hideLogin(); this.updateUI(); app.notify('Admin login successful!', 'success');
        }
        else if(DB.teachers[u] && DB.teachers[u].password === p) {
            this.user = u; this.type = 'teacher'; this.data = DB.teachers[u];
            if(r) localStorage.setItem('remembered', u); else localStorage.removeItem('remembered');
            this.hideLogin(); this.updateUI(); app.notify('Teacher login successful!', 'success');
        }
        else document.getElementById('login-error').textContent = 'Invalid credentials';
    },
    
    logout() {
        this.user = null; this.type = null; this.data = null;
        this.updateUI(); app.showPage('home'); app.notify('Logged out', 'success');
    },
    
    updateUI() {
        let h = document.getElementById('main-header');
        h.classList.toggle('teacher-header', this.type === 'teacher');
        document.getElementById('login-btn').classList.toggle('hidden', !!this.user);
        document.getElementById('logout-btn').classList.toggle('hidden', !this.user);
        document.getElementById('profile-btn').classList.toggle('hidden', !this.user);
        document.getElementById('admin-dashboard-link').classList.toggle('hidden', this.type !== 'admin');
        document.getElementById('teacher-dashboard-link').classList.toggle('hidden', this.type !== 'teacher');
        
        let badge = document.getElementById('user-role-badge');
        if(this.type === 'admin') { badge.textContent = 'Admin'; badge.className = 'admin-badge'; badge.classList.remove('hidden'); }
        else if(this.type === 'teacher') { badge.textContent = 'Teacher'; badge.className = 'teacher-badge'; badge.classList.remove('hidden'); }
        else badge.classList.add('hidden');
        
        document.getElementById('admin-greeting').textContent = this.data ? `Welcome, ${this.data.fullName}` : 'Welcome, Guest';
        document.getElementById('home-title').textContent = this.data ? `Welcome, ${this.data.fullName}` : 'Welcome to SMUK School Portal';
    },
    
    isAdmin() { return this.type === 'admin' },
    isTeacher() { return this.type === 'teacher' },
    isLoggedIn() { return !!this.user }
};

// Check remembered user
let remembered = localStorage.getItem('remembered');
if(remembered) {
    if(DB.admins[remembered]) { auth.user = remembered; auth.type = 'admin'; auth.data = DB.admins[remembered]; auth.updateUI(); }
    else if(DB.teachers[remembered]) { auth.user = remembered; auth.type = 'teacher'; auth.data = DB.teachers[remembered]; auth.updateUI(); }
}
