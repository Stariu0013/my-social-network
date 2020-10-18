export const requiredField = value => {
    return !value ? 'Filed is required' : undefined;
};

export const fieldMaxLength = maxLength => value => {
    return value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;
};
