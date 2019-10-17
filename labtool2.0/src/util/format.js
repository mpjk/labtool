import React from 'react'
import { Icon } from 'semantic-ui-react'
const zeros = number => {
  const stringForm = number.toString()
  return stringForm.length === 1 ? `0${stringForm}` : stringForm
}

export const trimDate = stringForm => {
  const date = new Date(stringForm)
  if (!date) return '--.--.----, --:--:--'
  return `${zeros(date.getDate())}.${zeros(date.getMonth() + 1)}.${date.getFullYear()}, ${zeros(date.getHours())}:${zeros(date.getMinutes())}:${zeros(date.getSeconds())}`
}

export const createEuropeanDate = date => {
  return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`
}

export const createShorterCourseid = ohid => {
  return `${ohid.substring(0, 8)}`
}

export const getAcademicYear = startDate => {
  let year = Number(startDate.substring(0, 4))
  const month = Number(startDate.split('-')[1])
  if (1 <= month && month <= 4) {
    return year - 1 + '-' + year
  }
  if (5 <= month && month <= 8) {
    return year
  }
  if (9 <= month && month <= 12) {
    return year + '-' + (year + 1)
  }
}

const getPeriod = startDate => {
  const month = Number(startDate.split('-')[1])
  if (month === 9) {
    return 'P.I'
  } else if (month === 10 || month === 11 || month === 12) {
    return 'P.II'
  } else if (month === 1 || month === 2) {
    return 'P.III'
  } else if (month === 3 || month == 4) {
    return 'P.IV'
  } else if (month === 5) {
    return 'early Summer'
  } else {
    return 'late Summer'
  }
}

export const getSemesterAndYear = ohid => {
  const semesters = { S: 'autumn ', K: 'spring ', V: 'summer ' }
  const tokens = ohid.split('.')
  const year = tokens[1]
  const semester = semesters[tokens[2]] || tokens[2]
  return `${semester}${year}`
}

export const formatCourseName = (name, ohid, startDate) => {
  if (name.toLowerCase().includes('period')) {
    return `${name} (${getAcademicYear(startDate)})`.replace(/\) \(/g, ', ')
  } else {
    return `${name} (${getSemesterAndYear(ohid)})`.replace(/\) \(/g, ', ')
  }
}

/**
 * Show courseId and the year and term of the course
 * @param {*} ohid
 * @param {*} startDate
 */
export const createCourseIdWithYearAndTerm = (ohid, startDate) => {
  return createShorterCourseid(ohid) + ' ' + getAcademicYear(startDate) + ' ' + getPeriod(startDate)
}

export const capitalize = text => {
  if (text.length < 2) {
    return text.toUpperCase()
  } else {
    return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase()
  }
}

export const createRepositoryLink = url => {
  const { Fragment } = React
  let cleanUrl = url
  cleanUrl = cleanUrl.replace(/^https?:\/\//, '')

  if (cleanUrl.startsWith('github.com/')) {
    const cleanUrlNoGithub = cleanUrl.substring('github.com/'.length)
    cleanUrl = (
      <Fragment>
        <Icon name="github" color="black" />
        {cleanUrlNoGithub}
      </Fragment>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {cleanUrl}
    </a>
  )
}
