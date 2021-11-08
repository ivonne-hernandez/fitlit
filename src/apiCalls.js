//here is where our API fetch calls will happen
//export the functions

// let fetchUserData = () => {
//   fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users").then(response => response.json()).then(data => data.userData);
// }

export let fetchUserData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users").then(response => response.json());
};
export let fetchSleepData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/sleep").then(response => response.json());
}

export let fetchActivityData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/activity").then(response => response.json());
}

export let fetchHydrationData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/hydration").then(response => response.json());
}
