export const updateObject = (oldObject, updatedProperties) => {
  const newObj = {
    ...oldObject,
    ...updatedProperties,
  };

  // remove duplicate messages
  if (newObj.messages) {
    newObj.messages = newObj.messages.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
  }

  return newObj;
};
