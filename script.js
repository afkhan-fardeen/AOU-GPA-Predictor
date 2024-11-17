const courseList = document.getElementById('courseList');
const addCourseBtn = document.getElementById('addCourseBtn');
const calculateBtn = document.getElementById('calculateBtn');
const backBtn = document.getElementById('backBtn');
const resultSection = document.getElementById('resultSection');
const formSection = document.getElementById('formSection');
const predictedGPA = document.getElementById('predictedGPA');
const courseSummary = document.getElementById('courseSummary');

// Add a new course row, retaining existing data
addCourseBtn.addEventListener('click', () => {
    const courseRow = document.createElement('div');
    courseRow.classList.add('course-item', 'flex', 'items-center', 'space-x-4');

    courseRow.innerHTML = `
        <input type="text" class="courseName p-2 border rounded-lg w-1/2" placeholder="Course Name">
        <input type="number" class="courseCredits p-2 border rounded-lg w-1/4" placeholder="Credits">
        <select class="gradeSelect p-2 border rounded-lg w-1/4">
            <option value="4">A</option>
            <option value="3.5">B+</option>
            <option value="3">B</option>
            <option value="2.5">C+</option>
            <option value="2">C</option>
            <option value="1.5">D</option>
        </select>
        <i class="fas fa-trash-alt delete-icon"></i>
    `;

    // Add delete functionality
    courseRow.querySelector('.delete-icon').addEventListener('click', () => {
        courseRow.remove();
    });

    courseList.appendChild(courseRow);
});

// Calculate GPA
calculateBtn.addEventListener('click', () => {
    let totalCredits = parseFloat(document.getElementById('totalCredits').value);
    let currentGPA = parseFloat(document.getElementById('currentGPA').value);
    let totalPoints = currentGPA * totalCredits;
    let additionalCredits = 0;

    courseSummary.innerHTML = '';
    document.querySelectorAll('.course-item').forEach(course => {
        const courseName = course.querySelector('.courseName').value;
        const grade = parseFloat(course.querySelector('.gradeSelect').value);
        const credits = parseFloat(course.querySelector('.courseCredits').value);
        if (grade && credits) {
            totalPoints += grade * credits;
            additionalCredits += credits;
            courseSummary.innerHTML += `<tr>
                <td>${courseName}</td>
                <td>${credits}</td>
                <td>${grade}</td>
                <td>${(grade * credits).toFixed(2)}</td>
            </tr>`;
        }
    });

    const finalGPA = totalPoints / (totalCredits + additionalCredits);
    predictedGPA.textContent = finalGPA.toFixed(2);

    formSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
});

// Back to form
backBtn.addEventListener('click', () => {
    formSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
});