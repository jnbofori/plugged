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

export function failedJob(descriptionError, phoneError){
    return {
        type: "CREATED_JOB_FAILED",
        descriptionError: descriptionError,
        phoneError: phoneError
    }
} 

export function clearErrorMessage(){
    return {
        type: "CLEAR_ERROR_MESSAGE",
        descriptionError: undefined,
        phoneError: undefined
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