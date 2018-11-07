
const translationDefaults = {
  invalidEmailAddress: () => 'This email address is invalid',
  maxCharLength: max => `May not contain more than ${max} characters`,
  minCharLength: min => `May not contain less than ${min} characters`,
  invalidURL: () => 'This URL is invalid',
  minPasswordCharLength: min => `Password may not contain less than ${min} characters`,
  dateRange: (fromDate, toDate) => `Choose a date between ${fromDate.toDateString()} and ${toDate.toDateString()}`,
  maxDateRange: toDate => `Choose a date earlier than ${toDate}`,
  minDateRange: fromDate => `Choose a date later than ${fromDate}`,
  maxNumber: max => `Choose a number lower than ${max}`,
  minNumber: min => `Choose a number higher than ${min}`,
  maxSelectOptions: max => `May not select more than ${max} options`,
  minSelectOptions: min => `May not select less than ${min} options`,
  requiredField: () => 'This is a required field',
  defaultInvalidInput: () => 'Invalid input'
}

export const getTranslation = (name, userTranslations, ...args) => {
  if (userTranslations[name] !== undefined) {
    return userTranslations[name](...args)
  }
  return translationDefaults[name](...args)
}
