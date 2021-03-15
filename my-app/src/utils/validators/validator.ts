export type TValidators = (value: string) => string | void;

export const requiredField: TValidators = value => {
    return !value ? 'Filed is required' : undefined;
};

export const fieldMaxLength = (maxLength: number): TValidators => value => {
    return value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;
};
