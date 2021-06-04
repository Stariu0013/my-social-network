export const updateObjectInArray = (items: any, objPropName: any, itemId: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
};
