$(document).ready(function() {
    // Initialize Materialize select input
    $('select').formSelect();

    // Add a new course input when clicking the "Add Course" button
    $('#addCourseBtn').click(function() {
        const courseItem = `
            <div class="row course-item">
                <div class="course-content">
                    <div class="input-field col s12 m6">
                        <input type="text" class="courseName validate" placeholder="e.g., M251, BUS101, TM351">
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="number" class="courseCredits validate" min="1" placeholder="Credits">
                    </div>
                    <div class="input-field col s12 m3">
                        <select class="gradeSelect">
                            <option value="" disabled selected>Choose Grade</option>
                            <option value="4.00">A (4.00)</option>
                            <option value="3.50">B+ (3.50)</option>
                            <option value="3.00">B (3.00)</option>
                            <option value="2.50">C+ (2.50)</option>
                            <option value="2.00">C (2.00)</option>
                            <option value="1.50">D (1.50)</option>
                        </select>
                        <label>Grade</label>
                    </div>
                </div>
                <button class="delete-course-btn btn-floating btn-small waves-effect waves-light red">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        $('#courseList').append(courseItem);
        $('select').formSelect(); // Re-initialize the select dropdown
    });

    // Remove course input when "X" is clicked
    $(document).on('click', '.delete-course-btn', function() {
        $(this).closest('.course-item').fadeOut(300, function() {
            $(this).remove();
        });
    });

    // Calculate GPA when "Calculate GPA" is clicked
    $('#calculateBtn').click(function() {
        let totalCredits = parseFloat($('#totalCredits').val());
        let currentGPA = parseFloat($('#currentGPA').val());
        let totalPoints = 0;
        let totalCourses = 0;
        
        $('.course-item').each(function() {
            let grade = parseFloat($(this).find('.gradeSelect').val());
            let credits = parseFloat($(this).find('.courseCredits').val());
            if (grade && credits) {
                totalPoints += (grade * credits);
                totalCourses += credits;
            }
        });
        
        let predictedGPA = (totalPoints + (currentGPA * totalCredits)) / (totalCredits + totalCourses);
        
        // Display the result
        $('#predictedGPA').text(predictedGPA.toFixed(2));
        $('#courseSummary tbody').empty();
        
        $('.course-item').each(function() {
            let courseName = $(this).find('.courseName').val();
            let grade = $(this).find('.gradeSelect').val();
            let credits = $(this).find('.courseCredits').val();
            let points = (grade * credits).toFixed(2);
            
            $('#courseSummary tbody').append(`
                <tr>
                    <td>${courseName}</td>
                    <td>${credits}</td>
                    <td>${grade}</td>
                    <td>${points}</td>
                </tr>
            `);
        });
        
        // Show the result section
        $('.gpa-result').show();
    });
});