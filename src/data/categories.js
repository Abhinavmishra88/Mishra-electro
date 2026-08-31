import switches from "../assets/categories/switches.png";
import socket from "../assets/categories/socket.png";
import wire from "../assets/categories/wire.png";
import mcb from "../assets/categories/mcb.png";
import fan from "../assets/categories/fan.png";
import led from "../assets/categories/led.png";
import extensionBoard from "../assets/categories/extension-board.png";
import plug from "../assets/categories/plug.png";
import dbBox from "../assets/categories/db-box.png";
import accessories from "../assets/categories/accessories.png";

const categories = [
  {
    id: 1,
    name: "MCB",
    image: mcb,
    description: "Miniature Circuit Breakers",
    featured: true,
  },

  {
    id: 2,
    name: "Wire",
    image: wire,
    description: "Electrical Wires",
    featured: true,
  },

  {
    id: 3,
    name: "LED",
    image: led,
    description: "LED Lighting",
    featured: true,
  },

  {
    id: 4,
    name: "Fan",
    image: fan,
    description: "Ceiling Fans",
    featured: true,
  },

  {
    id: 5,
    name: "Switches",
    image: switches,
    description: "Electrical Switches",
    featured: true,
  },

  {
    id: 6,
    name: "Socket",
    image: socket,
    description: "Electrical Sockets",
    featured: true,
  },

  {
    id: 7,
    name: "Extension Board",
    image: extensionBoard,
    description: "Extension Boards",
    featured: true,
  },

  {
    id: 8,
    name: "Plug",
    image: plug,
    description: "Electrical Plugs",
    featured: true,
  },

  {
    id: 9,
    name: "DB Box",
    image: dbBox,
    description: "Distribution Boxes",
    featured: true,
  },

  {
    id: 10,
    name: "Accessories",
    image: accessories,
    description: "Electrical Accessories",
    featured: true,
  },
];

export default categories;