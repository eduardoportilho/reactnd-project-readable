export const USERS = [
  {
    name: "Jane Eyre",
    avatar: "images/jane.jpg"
  },
  {
    name: "Binx Bolling",
    avatar: "images/binx.jpg"
  },
  {
    name: "Veruca Salt",
    avatar: "images/veruca.jpg"
  },
  {
    name: "Jay Gatsby",
    avatar: "images/jay.jpg"
  },
  {
    name: "Angela Argo",
    avatar: "images/argo.jpg"
  },
  {
    name: "Eustacia Vye",
    avatar: "images/vye.jpg"
  },
  {
    name: "Inigo Montoya",
    avatar: "images/inigo.jpg"
  },
  {
    name: "Ramona Quimby",
    avatar: "images/ramona.png"
  },
  {
    name: "thingone",
    avatar: "images/thingone.png"
  },
  {
    name: "thingtwo",
    avatar: "images/thingtwo.jpg"
  }
];

export const getAvatarURLFor = name =>
  (USERS.find(user => user.name === name) || USERS[0]).avatar;
