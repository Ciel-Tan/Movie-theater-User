export const calculateAge = (ioStringBirthday?: string): any => {
    if (!ioStringBirthday) {
        return null;
    }

    const d = new Date(ioStringBirthday);

    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const monthDiff = today.getMonth() - d.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d.getDate())) {
        age--;
    }

    return age;
}