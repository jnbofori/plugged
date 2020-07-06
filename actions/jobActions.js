export function postJob(data){
    return {
        type: "CREATED_JOB_SUCCESS",
        jobCreated: true,
        jobData: {
            id: data.id,
            description: data.description,
            phone: data.phone,
            ownerId: data.ownerId
        }
    }
} 

export function failedJob(titleError, descriptionError, locationError, phoneError, deadlineError){
    return {
        type: "CREATED_JOB_FAILED",
        titleError: titleError,
        descriptionError: descriptionError,
        locationError: locationError,
        phoneError: phoneError,
        deadlineError: deadlineError
    }
} 

export function clearErrorMessage(){
    return {
        type: "CLEAR_ERROR_MESSAGE",
        titleError: undefined,
        descriptionError: undefined,
        locationError: undefined,
        phoneError: undefined,
        deadlineError: undefined
    }
} 

export function fetchAllJobs(userId, loadedJobs){
    return {
        type: "SET_JOBS",
        allJobs: loadedJobs,
        usersOwnJobs: loadedJobs.filter(job => job.ownerId == userId)
    }
}

export function fetchUserJobs(userId, loadedJobs){
    return {
        type: "SET_USER_JOBS",
        usersOwnJobs: loadedJobs.filter(job => job.ownerId == userId)
    }
}

export function deleteJob(jobId) {
    return {
        type: "DELETE_JOB",
        jobId: jobId
    }
}