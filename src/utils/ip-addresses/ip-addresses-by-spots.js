const network = "192.168.0";

export const ip_bySpots = {
  server: `${network}.2`,
  client: `${network}.3`,
  spots: [
    {
      id: 1,
      name: "Skybridge",
      reader: [
        {
          id: 1,
          name: "Create",
          ip: `${network}.23`
        },
        {
          id: 2,
          name: "Top Up",
          ip: `${network}.24`
        },
        {
          id: 3,
          name: "Check In",
          ip: `${network}.25`
        },
      ]
    },
    {
      id: 2,
      name: "ATV",
      reader: [
        {
          id: 1,
          name: "Create",
          ip: `${network}.33`
        },
        {
          id: 2,
          name: "Top Up",
          ip: `${network}.34`
        },
        {
          id: 3,
          name: "Check In",
          ip: `${network}.35`
        },
      ]
    },
    {
      id: 3,
      name: "Paintball",
      reader: [
        {
          id: 1,
          name: "Create",
          ip: `${network}.43`
        },
        {
          id: 2,
          name: "Top Up",
          ip: `${network}.44`
        },
        {
          id: 3,
          name: "Check In",
          ip: `${network}.45`
        },
      ]
    },
    {
      id: 4,
      name: "Flying Fox",
      reader: [
        {
          id: 1,
          name: "Create",
          ip: `${network}.53`
        },
        {
          id: 2,
          name: "Top Up",
          ip: `${network}.54`
        },
        {
          id: 3,
          name: "Check In",
          ip: `${network}.55`
        },
      ]
    },
    {
      id: 5,
      name: "Virtual Reality",
      reader: [
        {
          id: 1,
          name: "Create",
          ip: `${network}.63`
        },
        {
          id: 2,
          name: "Top Up",
          ip: `${network}.64`
        },
        {
          id: 3,
          name: "Check In",
          ip: `${network}.65`
        },
      ]
    },
  ]
}
