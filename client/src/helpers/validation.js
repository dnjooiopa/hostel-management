const comparePassword = (password, confirmPassword) => {
    return password === confirmPassword
}

const validateDate = (startDate, endDate) => {
    const currentDate = new Date()
    currentDate.setHours(0)
    currentDate.setMinutes(0)
    return (endDate.getTime() - startDate.getTime()) >= (1000 * 60 * 60 * 24) && (startDate.getTime() >= currentDate.getTime())
}

export {
    comparePassword,
    validateDate
}