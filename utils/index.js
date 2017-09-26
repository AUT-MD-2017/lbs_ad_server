import _ from 'lodash';


export const formatDistance = (distance) => {
  if (distance < 1000) {
    return `${distance}m`;
  }
  return `${_.round(distance / 1000, 1)}km`;
};
