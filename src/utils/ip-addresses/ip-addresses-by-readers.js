const network = "192.168.0";

export const ip_byReaders = {
  server: `${network}.2`,
  client: `${network}.3`,
  readers: [
    {
      id: 1,
      name: "Create",
      spots: [
        {
          id: 1,
          name: "Skybridge",
          ip: `${network}.23`
        },
        {
          id: 2,
          name: "ATV",
          ip: `${network}.33`
        },
        {
          id: 3,
          name: "Paintball",
          ip: `${network}.43`
        },
        {
          id: 4,
          name: "Flying Fox",
          ip: `${network}.53`
        },
        {
          id: 5,
          name: "Virtual Reality",
          ip: `${network}.63`
        },
      ]
    },
    {
      id: 2,
      name: "Top Up",
      spots: [
        {
          id: 1,
          name: "Skybridge",
          ip: `${network}.24`
        },
        {
          id: 2,
          name: "ATV",
          ip: `${network}.34`
        },
        {
          id: 3,
          name: "Paintball",
          ip: `${network}.44`
        },
        {
          id: 4,
          name: "Flying Fox",
          ip: `${network}.54`
        },
        {
          id: 5,
          name: "Virtual Reality",
          ip: `${network}.64`
        },
      ]
    },
    {
      id: 3,
      name: "Check In",
      spots: [
        {
          id: 1,
          name: "Skybridge",
          ip: `${network}.25`
        },
        {
          id: 2,
          name: "ATV",
          ip: `${network}.35`
        },
        {
          id: 3,
          name: "Paintball",
          ip: `${network}.45`
        },
        {
          id: 4,
          name: "Flying Fox",
          ip: `${network}.55`
        },
        {
          id: 5,
          name: "Virtual Reality",
          ip: `${network}.65`
        },
      ]
    },
  ]
}
