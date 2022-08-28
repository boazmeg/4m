export function getNewLocation(currentLocation) {
  const randomDegrees = getRandomDegree();
  const verticalNunber = Math.floor(Math.random() * 2) + 1;
  return verticalNunber === 1
    ? { ...currentLocation, lat: currentLocation.lat + randomDegrees }
    : { ...currentLocation, lng: currentLocation.lng + randomDegrees };
}

export function getShouldCangeAnchorLocation(anchorLocation, currentLocation) {
  const MAX_DISTANCE_FROM_ANCHOR = 0.0008;

  return (
    Math.abs(anchorLocation.lat - currentLocation.lat) >
      MAX_DISTANCE_FROM_ANCHOR ||
    Math.abs(anchorLocation.lng - currentLocation.lng) >
      MAX_DISTANCE_FROM_ANCHOR
  );
}

function getPlusOrMinus() {
  return Math.random() < 0.5 ? -1 : 1;
}
function getRandomDegree() {
  const plusOrMinus = getPlusOrMinus();
  const randomDegree = Math.random() / 1000;
  return randomDegree * plusOrMinus;
}
