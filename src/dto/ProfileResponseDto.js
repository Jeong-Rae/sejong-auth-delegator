class ProfileResponseDto {
    constructor(
        major,
        studentCode,
        name,
        gradeLevel,
        userStatus,
        completedSemesters,
        verifiedSemesters
    ) {
        this.major = major;
        this.studentCode = studentCode;
        this.name = name;
        this.gradeLevel = this.extractNumber(gradeLevel);
        this.userStatus = userStatus;
        this.completedSemesters = this.extractNumber(completedSemesters);
        this.verifiedSemesters = this.extractNumber(verifiedSemesters);
    }

    extractNumber(semesterString) {
        return parseInt(semesterString.split(" ")[0], 10);
    }
}

export default ProfileResponseDto;
