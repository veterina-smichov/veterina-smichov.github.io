import { DateTime } from 'luxon'

const isWithinPeriod = (dateToCheck, start, end) => dateToCheck >= start && dateToCheck <= end

export default {
    openingHours: ({ openingHours, build }) => {
        const { publishDateFrom, changeDateFrom, changeDateTo, publishDateTo } = openingHours
        const todayDay = DateTime.fromJSDate(build.timestamp, { zone: 'UTC' }).startOf('day')

        const changeFromDay = changeDateFrom ? DateTime.fromJSDate(changeDateFrom, { zone: 'UTC' }).startOf('day') : todayDay
        const publishFromDay = publishDateFrom ? DateTime.fromJSDate(publishDateFrom, { zone: 'UTC' }).startOf('day') : changeFromDay

        const changeToDay = changeDateTo ? DateTime.fromJSDate(changeDateTo, { zone: 'UTC' }).startOf('day') : todayDay
        const publishToDay = publishDateTo ? DateTime.fromJSDate(publishDateTo, { zone: 'UTC' }).startOf('day') : changeToDay

        // Check if dates are in a chronological order: publishFromDay <= changeFromDay <= changeToDay <= publishToDay
        const datesChronological = publishFromDay <= changeFromDay && changeFromDay <= changeToDay && changeToDay <= publishToDay

        return {
            ...openingHours,
            showChangedHours: datesChronological && isWithinPeriod(todayDay, publishFromDay, publishToDay), // today within publish period
            isChangedToday: datesChronological && isWithinPeriod(todayDay, changeFromDay, changeToDay) // today within change period
        }
    },
    generalAnnouncements: ({ generalAnnouncements, build }) => {
        const { publishDateFrom, publishDateTo, publish } = generalAnnouncements
        const todayDay = DateTime.fromJSDate(build.timestamp, { zone: 'UTC' }).startOf('day')

        const publishFromDay = publishDateFrom ? DateTime.fromJSDate(publishDateFrom, { zone: 'UTC' }).startOf('day') : todayDay
        const publishTo = publishDateTo ? DateTime.fromJSDate(publishDateTo, { zone: 'UTC' }).startOf('day') : todayDay
        const datesChronological = publishFromDay <= publishTo

        const showAnnouncements = publish && datesChronological && isWithinPeriod(todayDay, publishFromDay, publishTo)

        return {
            ...generalAnnouncements,
            showAnnouncements,
        }
    }
}
