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

    toObject() {
        return {
            major: this.major,
            studentCode: this.studentCode,
            name: this.name,
            gradeLevel: this.gradeLevel,
            userStatus: this.userStatus,
            completedSemesters: this.completedSemesters,
            verifiedSemesters: this.verifiedSemesters,
        };
    }

    serialize() {
        return JSON.stringify(this.toObject());
    }
}

export default ProfileResponseDto;
