import { DateTime } from 'luxon'

export default {
  openingHours: ({ openingHours, build }) => {
    const { publishDateFrom, changeDateFrom, changeDateTo, publishDateTo } = openingHours
    const today = DateTime.fromJSDate(build.timestamp)

    const changeFrom = changeDateFrom ? DateTime.fromISO(changeDateFrom, { zone: 'UTC' }) : today
    const publishFrom = publishDateFrom ? DateTime.fromISO(publishDateFrom, { zone: 'UTC' }) : changeFrom

    const changeTo = changeDateTo ? DateTime.fromISO(changeDateTo, { zone: 'UTC' }) : today
    const publishTo = publishDateTo ? DateTime.fromISO(publishDateTo, { zone: 'UTC' }) : changeTo

    // Check if dates are in a chronological order: publishFrom <= changeFrom <= changeTo <= publishTo
    const datesChronological = publishFrom <= changeFrom && changeFrom <= changeTo && changeTo <= publishTo

    const isWithinPeriod = (dateToCheck, start, end) => dateToCheck >= start && dateToCheck <= end

    return {
      ...openingHours,
      showChangedHours: datesChronological && isWithinPeriod(today, publishFrom, publishTo), // today within publish period
      isChangedToday: datesChronological && isWithinPeriod(today, changeFrom, changeTo) // today within change period
    }
  }
}
