export const USERS = [
  {
    name: "Jane Eyre",
    avatar: "/images/jane.jpg"
  },
  {
    name: "Binx Bolling",
    avatar: "/images/binx.jpg"
  },
  {
    name: "Veruca Salt",
    avatar: "/images/veruca.jpg"
  },
  {
    name: "Jay Gatsby",
    avatar: "/images/jay.png"
  },
  {
    name: "Angela Argo",
    avatar: "/images/argo.jpg"
  },
  {
    name: "Eustacia Vye",
    avatar: "/images/vye.jpg"
  },
  {
    name: "Inigo Montoya",
    avatar: "/images/inigo.jpg"
  },
  {
    name: "Ramona Quimby",
    avatar: "/images/ramona.png"
  },
  {
    name: "thingone",
    avatar: "/images/thingone.png"
  },
  {
    name: "thingtwo",
    avatar: "/images/thingtwo.jpg"
  }
];

export const getUserAvatarURL = name =>
  (USERS.find(user => user.name === name) || USERS[0]).avatar;

export const getCategoryColor = category => {
  switch (category) {
    case "react":
      return "red";
    case "redux":
      return "teal";
    case "udacity":
      return "orange";
    default:
      return "blue";
  }
};
