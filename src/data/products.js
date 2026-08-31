import mcb6 from "../assets/products/mcb6a.png";
import mcb10 from "../assets/products/mcb10a.png";
import mcb16 from "../assets/products/mcb16a.png";
import mcb20 from "../assets/products/mcb20a.png";
import mcb25 from "../assets/products/mcb25a.png";
import mcb32 from "../assets/products/mcb32a.png";
import mcb40 from "../assets/products/mcb40a.png";
import mcb50 from "../assets/products/mcb50a.png";
import mcb63 from "../assets/products/mcb63a.png";
import doublePoleMcb from "../assets/products/double pole MCB.png";
import triplepoleMcb from "../assets/products/triplepoleMcb.png";
import fourPoleMcb from "../assets/products/four pole MCB.png";

// ========================= WIRE =========================

import wire15 from "../assets/products/copper-wire-1-5.png";
import wire25 from "../assets/products/copper-wire-2-5.png";
import wire4 from "../assets/products/copper-wire-4.png";
import wire6 from "../assets/products/copper-wire-6.png";
import wire10 from "../assets/products/copper-wire-10.png";
import wire16 from "../assets/products/copper-wire-16.png";
import wire1 from "../assets/products/copper-wire-1.png";
import wire15a from "../assets/products/copper-wire-1.5.png";
import wire25a from "../assets/products/copper-wire-2.5.png";
import wire25b from "../assets/products/copper-wire-25.png";
import wire32 from "../assets/products/copper-wire-32.png";
import wire2 from "../assets/products/copper-wire-2.png";

// ========================= FAN =========================

import fan48 from "../assets/products/ceiling-fan-48.png";
import fan56 from "../assets/products/ceiling-fan-56.png";
import bldcFan from "../assets/products/bldc-fan.png";
import wallFan from "../assets/products/wall-fan.png";
import tableFan from "../assets/products/table-fan.png";
import pedestalFan from "../assets/products/pedestal-fan.png";
import exhaustFan from "../assets/products/Exhaust Fan.png";
import decorativeFan from "../assets/products/Decorative Fan.png";
import smartCeilingFan from "../assets/products/Smart Ceiling Fan.png";
import highSpeedCeilingFan from "../assets/products/High Speed Ceiling Fan.png";
import industrialFan from "../assets/products/Industrial Fan.png";
import designerCeilingFan from "../assets/products/Designer Ceiling Fan.png";

// ========================= LED =========================

import led5 from "../assets/products/5w.png";
import led7 from "../assets/products/7w.png";
import led9 from "../assets/products/9w.png";
import led12 from "../assets/products/12w.png";
import led15 from "../assets/products/15w.png";
import led20 from "../assets/products/20w.png";
import ledPanel6 from "../assets/products/6w.png";
import ledPanel12 from "../assets/products/12e.png";
import ledPanel18 from "../assets/products/18w.png";
import ledTube20 from "../assets/products/20w.png";
import ledFlood30 from "../assets/products/30w.png";
import ledFlood50 from "../assets/products/50w.png";

// ========================= EXTENSION =========================

import extension4 from "../assets/products/extension-board-4.png";
import extension6 from "../assets/products/extension-board-6.png";
import extension8 from "../assets/products/extension-board-8.png";
import spikeGuard from "../assets/products/spike-guard.png";
import powerStrip from "../assets/products/power-strip.png";
import powerStrip4 from "../assets/products/power-strip-4.png";
import powerStrip8 from "../assets/products/power-strip-8.png";
import powerStrip10 from "../assets/products/power-strip-10.png";
import powerStripm from "../assets/products/power-strip-m.png";
import powerStripr from "../assets/products/power-strip-r.png";
import powerStripr1 from "../assets/products/power-strip-r1.png";
import powerStripc from "../assets/products/power-strip-c.png";

// ========================= PLUG =========================

import plug1 from "../assets/products/plug1.png";
import plug2 from "../assets/products/plug2.png";
import plug3 from "../assets/products/plug3.png";
import plug4 from "../assets/products/plug4.png";
import plug5 from "../assets/products/plug5.png";
import plug6 from "../assets/products/plug6.png";
import plug7 from "../assets/products/plug7.png";
import plug8 from "../assets/products/plug8.png";
import plug9 from "../assets/products/plug9.png";
import plug10 from "../assets/products/plug10.png";
import plug11 from "../assets/products/plug11.png";
import plug12 from "../assets/products/plug12.png";

// ======================== Switches ======================

import Switch1 from "../assets/products/Switch1.png";
import Switch2 from "../assets/products/Switch2.png";
import Switch3 from "../assets/products/Switch3.png";
import Switch4 from "../assets/products/Switch4.png";
import Switch5 from "../assets/products/Switch5.png";
import Switch6 from "../assets/products/Switch6.png";
import Switch7 from "../assets/products/Switch7.png";
import Switch8 from "../assets/products/Switch8.png";
import Switch9 from "../assets/products/Switch9.png";
import Switch10 from "../assets/products/Switch10.png";
import Switch11 from "../assets/products/Switch11.png";
import Switch12 from "../assets/products/Switch12.png";

//========================== SOCKET ====================

import Socket1 from "../assets/products/Socket1.png";
import Socket2 from "../assets/products/Socket2.png";
import Socket3 from "../assets/products/Socket3.png";
import Socket4 from "../assets/products/Socket4.png";
import Socket5 from "../assets/products/Socket5.png";
import Socket6 from "../assets/products/Socket6.png";
import Socket7 from "../assets/products/Socket7.png";
import Socket8 from "../assets/products/Socket8.png";
import Socket9 from "../assets/products/Socket9.png";
import Socket10 from "../assets/products/Socket10.png";
import Socket11 from "../assets/products/Socket11.png";
import Socket12 from "../assets/products/Socket12.png";
import { FcNext } from "react-icons/fc";

/* =========================================================
   PRODUCT HELPER
========================================================= */

const createProduct = (
  id,
  name,
  slug,
  category,
  price,
  oldPrice,
  image,
  badge = "Popular",
  featured = false,
  description = "",
  specifications = {}
) => ({
  id,
  name,
  slug,
  category,
  price,
  oldPrice,
  image,

  rating: 4.5,

  reviews: 20 + (id % 25),

  stock: 15 + (id % 40),

  badge,

  featured,

  description,

  specifications,
});

/* =========================================================
   PRODUCT LIST
========================================================= */

const products = [

  /* =======================================================
     MCB - 12 PRODUCTS
  ======================================================= */

  createProduct(
    1,
    "MCB 6A",
    "mcb-6a",
    "MCB",
    180,
    220,
    mcb6,
    "Popular",
    true,
    "6A miniature circuit breaker suitable for residential electrical protection.",
    {
      current: "6A",
      type: "Single Pole",
      application: "Residential",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    2,
    "MCB 10A",
    "mcb-10a",
    "MCB",
    190,
    230,
    mcb10,
    "Popular",
    true,
    "10A miniature circuit breaker designed for reliable circuit protection.",
    {
      current: "10A",
      type: "Single Pole",
      application: "Residential",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    3,
    "MCB 16A",
    "mcb-16a",
    "MCB",
    200,
    250,
    mcb16,
    "Best Seller",
    true,
    "16A MCB suitable for residential and commercial electrical applications.",
    {
      current: "16A",
      type: "Single Pole",
      application: "Residential & Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    4,
    "MCB 20A",
    "mcb-20a",
    "MCB",
    210,
    260,
    mcb20,
    "Value Pick",
    false,
    "20A circuit breaker for safe and reliable electrical protection.",
    {
      current: "20A",
      type: "Single Pole",
      application: "Residential & Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    5,
    "MCB 25A",
    "mcb-25a",
    "MCB",
    220,
    270,
    mcb25,
    "Popular",
    true,
    "25A miniature circuit breaker suitable for electrical installations.",
    {
      current: "25A",
      type: "Single Pole",
      application: "Residential & Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    6,
    "MCB 32A",
    "mcb-32a",
    "MCB",
    240,
    290,
    mcb32,
    "Best Seller",
    true,
    "32A MCB providing dependable protection against overload and short circuit.",
    {
      current: "32A",
      type: "Single Pole",
      application: "Residential & Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    7,
    "MCB 40A",
    "mcb-40a",
    "MCB",
    280,
    330,
    mcb40,
    "Heavy Duty",
    false,
    "40A miniature circuit breaker for higher electrical loads.",
    {
      current: "40A",
      type: "Single Pole",
      application: "Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    8,
    "MCB 50A",
    "mcb-50a",
    "MCB",
    320,
    380,
    mcb50,
    "Heavy Duty",
    false,
    "50A circuit breaker designed for higher-load electrical installations.",
    {
      current: "50A",
      type: "Single Pole",
      application: "Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    9,
    "MCB 63A",
    "mcb-63a",
    "MCB",
    380,
    450,
    mcb63,
    "Premium",
    true,
    "63A miniature circuit breaker for demanding electrical applications.",
    {
      current: "63A",
      type: "Single Pole",
      application: "Commercial & Industrial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    10,
    "Double Pole MCB",
    "double-pole-mcb",
    "MCB",
    420,
    500,
    doublePoleMcb,
    "Premium",
    true,
    "Double pole MCB for reliable protection and circuit isolation.",
    {
      current: "Up to 63A",
      type: "Double Pole",
      application: "Residential & Commercial",
      protection: "Overload & Short Circuit",
    }
  ),

  // ✅ CORRECTED: TRIPLE POLE MCB

  createProduct(
    11,
    "Triple Pole MCB",
    "triple-pole-mcb",
    "MCB",
    520,
    620,
    triplepoleMcb,
    "Premium",
    true,
    "Triple pole MCB designed for reliable three-phase circuit protection and isolation.",
    {
      current: "Up to 63A",
      type: "Triple Pole",
      application: "Commercial & Industrial",
      protection: "Overload & Short Circuit",
    }
  ),

  createProduct(
    12,
    "Four Pole MCB",
    "four-pole-mcb",
    "MCB",
    650,
    750,
    fourPoleMcb,
    "Premium",
    true,
    "Four pole MCB designed for three-phase electrical installations.",
    {
      current: "Up to 63A",
      type: "Four Pole",
      application: "Industrial & Commercial",
      protection: "Overload & Short Circuit",
    }
  ),
    /* =======================================================
     WIRE - 12 PRODUCTS
  ======================================================= */

  createProduct(
    13,
    "1.5 sq mm Copper Wire",
    "1-5-sq-mm-copper-wire",
    "Wire",
    1200,
    1400,
    wire15,
    "Popular",
    true,
    "High-quality copper electrical wire suitable for household wiring.",
    {
      size: "1.5 sq mm",
      conductor: "Copper",
      application: "House Wiring",
      type: "Electrical Wire",
    }
  ),

  createProduct(
    14,
    "2.5 sq mm Copper Wire",
    "2-5-sq-mm-copper-wire",
    "Wire",
    1800,
    2100,
    wire25,
    "Best Seller",
    true,
    "Durable copper wire suitable for domestic electrical installations.",
    {
      size: "2.5 sq mm",
      conductor: "Copper",
      application: "House Wiring",
      type: "Electrical Wire",
    }
  ),

  createProduct(
    15,
    "4 sq mm Copper Wire",
    "4-sq-mm-copper-wire",
    "Wire",
    2800,
    3200,
    wire4,
    "Heavy Duty",
    true,
    "4 sq mm copper wire for higher-load electrical applications.",
    {
      size: "4 sq mm",
      conductor: "Copper",
      application: "Heavy Load",
      type: "Electrical Wire",
    }
  ),

  createProduct(
    16,
    "6 sq mm Copper Wire",
    "6-sq-mm-copper-wire",
    "Wire",
    4200,
    4700,
    wire6,
    "Heavy Duty",
    true,
    "6 sq mm copper wire designed for heavy electrical loads.",
    {
      size: "6 sq mm",
      conductor: "Copper",
      application: "Heavy Load",
      type: "Electrical Wire",
    }
  ),

  createProduct(
    17,
    "10 sq mm Copper Wire",
    "10-sq-mm-copper-wire",
    "Wire",
    6500,
    7200,
    wire10,
    "Heavy Duty",
    false,
    "10 sq mm copper wire for high-load electrical applications.",
    {
      size: "10 sq mm",
      conductor: "Copper",
      application: "Heavy Load",
      type: "Electrical Wire",
    }
  ),

  createProduct(
    18,
    "16 sq mm Copper Wire",
    "16-sq-mm-copper-wire",
    "Wire",
    9500,
    10500,
    wire16,
    "Premium",
    false,
    "16 sq mm copper wire designed for high-capacity electrical installations.",
    {
      size: "16 sq mm",
      conductor: "Copper",
      application: "Industrial",
      type: "Electrical Wire",
    }
  ),

  createProduct(
    19,
    "1 sq mm Flexible Wire",
    "1-sq-mm-flexible-wire",
    "Wire",
    850,
    1000,
    wire1,
    "Popular",
    false,
    "Flexible copper wire suitable for light electrical wiring.",
    {
      size: "1 sq mm",
      conductor: "Copper",
      application: "Home Wiring",
      type: "Flexible Wire",
    }
  ),

  createProduct(
    20,
    "1.5 sq mm Flexible Wire",
    "1-5-sq-mm-flexible-wire",
    "Wire",
    1100,
    1300,
    wire15a,
    "Popular",
    true,
    "Flexible 1.5 sq mm copper wire for household electrical applications.",
    {
      size: "1.5 sq mm",
      conductor: "Copper",
      application: "Home Wiring",
      type: "Flexible Wire",
    }
  ),

  createProduct(
    21,
    "2.5 sq mm Flexible Wire",
    "2-5-sq-mm-flexible-wire",
    "Wire",
    1600,
    1900,
    wire25a,
    "Best Seller",
    true,
    "Flexible 2.5 sq mm copper wire for domestic electrical wiring.",
    {
      size: "2.5 sq mm",
      conductor: "Copper",
      application: "Home Wiring",
      type: "Flexible Wire",
    }
  ),

  createProduct(
    22,
    "4 sq mm Flexible Wire",
    "4-sq-mm-flexible-wire",
    "Wire",
    2500,
    2900,
    wire25b,
    "Heavy Duty",
    false,
    "Flexible 4 sq mm wire suitable for higher electrical loads.",
    {
      size: "4 sq mm",
      conductor: "Copper",
      application: "Heavy Load",
      type: "Flexible Wire",
    }
  ),

  createProduct(
    23,
    "6 sq mm Flexible Wire",
    "6-sq-mm-flexible-wire",
    "Wire",
    3800,
    4300,
    wire32,
    "Heavy Duty",
    false,
    "Flexible 6 sq mm copper wire for heavy electrical applications.",
    {
      size: "6 sq mm",
      conductor: "Copper",
      application: "Heavy Load",
      type: "Flexible Wire",
    }
  ),

  createProduct(
    24,
    "10 sq mm Flexible Wire",
    "10-sq-mm-flexible-wire",
    "Wire",
    5900,
    6700,
    wire2,
    "Premium",
    false,
    "Heavy-duty flexible copper wire for high-load applications.",
    {
      size: "10 sq mm",
      conductor: "Copper",
      application: "Industrial",
      type: "Flexible Wire",
    }
  ),


  /* =======================================================
     FAN - 12 PRODUCTS
  ======================================================= */

  createProduct(
    25,
    "Ceiling Fan 48 Inch",
    "ceiling-fan-48-inch",
    "Fan",
    2200,
    2600,
    fan48,
    "Popular",
    true,
    "48 inch ceiling fan designed for efficient air circulation.",
    {
      size: "48 Inch",
      type: "Ceiling Fan",
      application: "Home & Office",
      motor: "High Performance",
    }
  ),

  createProduct(
    26,
    "Ceiling Fan 56 Inch",
    "ceiling-fan-56-inch",
    "Fan",
    2800,
    3300,
    fan56,
    "Large Room",
    true,
    "56 inch ceiling fan suitable for larger rooms.",
    {
      size: "56 Inch",
      type: "Ceiling Fan",
      application: "Large Rooms",
      motor: "High Performance",
    }
  ),

  createProduct(
    27,
    "BLDC Fan",
    "bldc-fan",
    "Fan",
    3500,
    4200,
    bldcFan,
    "Best Seller",
    true,
    "Energy-efficient BLDC ceiling fan with powerful air delivery.",
    {
      type: "BLDC Ceiling Fan",
      application: "Home & Office",
      motor: "BLDC",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    28,
    "Wall Fan",
    "wall-fan",
    "Fan",
    2400,
    2800,
    wallFan,
    "Popular",
    true,
    "Wall-mounted fan for convenient and efficient air circulation.",
    {
      type: "Wall Fan",
      application: "Home & Office",
      mounting: "Wall Mounted",
      motor: "High Performance",
    }
  ),

  createProduct(
    29,
    "Table Fan",
    "table-fan",
    "Fan",
    1600,
    1900,
    tableFan,
    "Value Pick",
    false,
    "Compact table fan suitable for home and office use.",
    {
      type: "Table Fan",
      application: "Home & Office",
      design: "Compact",
      motor: "High Performance",
    }
  ),

  createProduct(
    30,
    "Pedestal Fan",
    "pedestal-fan",
    "Fan",
    2500,
    3000,
    pedestalFan,
    "Popular",
    true,
    "Powerful pedestal fan with adjustable height and airflow.",
    {
      type: "Pedestal Fan",
      application: "Home & Office",
      height: "Adjustable",
      motor: "High Performance",
    }
  ),

  createProduct(
    31,
    "Exhaust Fan",
    "exhaust-fan",
    "Fan",
    1400,
    1700,
    exhaustFan,
    "Popular",
    false,
    "Exhaust fan suitable for kitchens, bathrooms and utility areas.",
    {
      type: "Exhaust Fan",
      application: "Home & Office",
      mounting: "Wall",
      motor: "High Performance",
    }
  ),

  createProduct(
    32,
    "Decorative Fan",
    "decorative-fan",
    "Fan",
    4200,
    4800,
    decorativeFan,
    "Premium",
    true,
    "Decorative ceiling fan combining stylish design with efficient airflow.",
    {
      type: "Decorative Ceiling Fan",
      application: "Home",
      design: "Premium",
      motor: "High Performance",
    }
  ),

  createProduct(
    33,
    "Smart Ceiling Fan",
    "smart-ceiling-fan",
    "Fan",
    5200,
    6000,
    smartCeilingFan,
    "Smart",
    true,
    "Smart ceiling fan designed for convenient modern home use.",
    {
      type: "Smart Ceiling Fan",
      application: "Smart Home",
      motor: "BLDC",
      control: "Remote Control",
    }
  ),

  createProduct(
    34,
    "High Speed Ceiling Fan",
    "high-speed-ceiling-fan",
    "Fan",
    2700,
    3200,
    highSpeedCeilingFan,
    "High Speed",
    true,
    "High-speed ceiling fan providing powerful air circulation.",
    {
      type: "High Speed Ceiling Fan",
      application: "Home & Office",
      size: "56 Inch",
      motor: "High Speed",
    }
  ),

  createProduct(
    35,
    "Industrial Fan",
    "industrial-fan",
    "Fan",
    6500,
    7500,
    industrialFan,
    "Industrial",
    false,
    "Heavy-duty industrial fan for workshops and commercial spaces.",
    {
      type: "Industrial Fan",
      application: "Industrial",
      motor: "Heavy Duty",
      airflow: "High Air Delivery",
    }
  ),

  createProduct(
    36,
    "Designer Ceiling Fan",
    "designer-ceiling-fan",
    "Fan",
    4800,
    5500,
    designerCeilingFan,
    "Premium",
    true,
    "Designer ceiling fan with premium styling and efficient performance.",
    {
      type: "Designer Ceiling Fan",
      application: "Home",
      design: "Premium",
      motor: "High Performance",
    }
  ),
    /* =======================================================
     LED - 12 PRODUCTS
  ======================================================= */

  createProduct(
    37,
    "LED Bulb 5W",
    "led-bulb-5w",
    "LED",
    90,
    120,
    led5,
    "Popular",
    true,
    "5W LED bulb providing efficient and bright illumination.",
    {
      wattage: "5W",
      type: "LED Bulb",
      application: "Home & Office",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    38,
    "LED Bulb 7W",
    "led-bulb-7w",
    "LED",
    110,
    140,
    led7,
    "Popular",
    true,
    "7W LED bulb suitable for everyday home lighting.",
    {
      wattage: "7W",
      type: "LED Bulb",
      application: "Home & Office",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    39,
    "LED Bulb 9W",
    "led-bulb-9w",
    "LED",
    130,
    160,
    led9,
    "Best Seller",
    true,
    "9W LED bulb offering bright and energy-efficient lighting.",
    {
      wattage: "9W",
      type: "LED Bulb",
      application: "Home & Office",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    40,
    "LED Bulb 12W",
    "led-bulb-12w",
    "LED",
    150,
    180,
    led12,
    "Popular",
    true,
    "12W LED bulb designed for bright household illumination.",
    {
      wattage: "12W",
      type: "LED Bulb",
      application: "Home & Office",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    41,
    "LED Bulb 15W",
    "led-bulb-15w",
    "LED",
    180,
    220,
    led15,
    "Popular",
    false,
    "15W LED bulb suitable for larger rooms and brighter lighting.",
    {
      wattage: "15W",
      type: "LED Bulb",
      application: "Home & Office",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    42,
    "LED Bulb 20W",
    "led-bulb-20w",
    "LED",
    220,
    270,
    led20,
    "High Brightness",
    true,
    "20W high-brightness LED bulb for powerful illumination.",
    {
      wattage: "20W",
      type: "LED Bulb",
      application: "Home & Commercial",
      efficiency: "Energy Efficient",
    }
  ),

  createProduct(
    43,
    "LED Panel Light 6W",
    "led-panel-light-6w",
    "LED",
    120,
    150,
    ledPanel6,
    "Popular",
    false,
    "6W LED panel light for clean and modern ceiling lighting.",
    {
      wattage: "6W",
      type: "LED Panel Light",
      application: "Home & Office",
      installation: "Ceiling",
    }
  ),

  createProduct(
    44,
    "LED Panel Light 12W",
    "led-panel-light-12w",
    "LED",
    180,
    220,
    ledPanel12,
    "Best Seller",
    true,
    "12W LED panel light providing uniform and comfortable illumination.",
    {
      wattage: "12W",
      type: "LED Panel Light",
      application: "Home & Office",
      installation: "Ceiling",
    }
  ),

  createProduct(
    45,
    "LED Panel Light 18W",
    "led-panel-light-18w",
    "LED",
    250,
    300,
    ledPanel18,
    "Premium",
    true,
    "18W LED panel light suitable for larger rooms and workspaces.",
    {
      wattage: "18W",
      type: "LED Panel Light",
      application: "Home & Office",
      installation: "Ceiling",
    }
  ),

  createProduct(
    46,
    "LED Tube Light 20W",
    "led-tube-light-20w",
    "LED",
    280,
    340,
    ledTube20,
    "Popular",
    true,
    "20W LED tube light for bright and energy-efficient illumination.",
    {
      wattage: "20W",
      type: "LED Tube Light",
      application: "Home & Office",
      installation: "Wall & Ceiling",
    }
  ),

  createProduct(
    47,
    "LED Flood Light 30W",
    "led-flood-light-30w",
    "LED",
    450,
    550,
    ledFlood30,
    "Outdoor",
    false,
    "30W LED flood light for outdoor and security lighting.",
    {
      wattage: "30W",
      type: "LED Flood Light",
      application: "Outdoor",
      lighting: "High Brightness",
    }
  ),

  createProduct(
    48,
    "LED Flood Light 50W",
    "led-flood-light-50w",
    "LED",
    650,
    780,
    ledFlood50,
    "Heavy Duty",
    true,
    "50W LED flood light for powerful outdoor illumination.",
    {
      wattage: "50W",
      type: "LED Flood Light",
      application: "Outdoor & Commercial",
      lighting: "High Brightness",
    }
  ),


  /* =======================================================
     SWITCHES - 12 PRODUCTS
  ======================================================= */

  createProduct(
    49,
    "1 Way Switch",
    "1-way-switch",
    "Switches",
    80,
    100,
    Switch1,
    "Popular",
    true,
    "Reliable 1-way modular switch for everyday electrical control.",
    {
      type: "1 Way Switch",
      application: "Home",
      mounting: "Modular",
      operation: "Single Circuit",
    }
  ),

  createProduct(
    50,
    "2 Way Switch",
    "2-way-switch",
    "Switches",
    90,
    120,
    Switch2,
    "Popular",
    true,
    "2-way switch suitable for controlling a light from two locations.",
    {
      type: "2 Way Switch",
      application: "Home",
      mounting: "Modular",
      operation: "Two Way",
    }
  ),

  createProduct(
    51,
    "Bell Push Switch",
    "bell-push-switch",
    "Switches",
    70,
    90,
    Switch3,
    "Popular",
    false,
    "Bell push switch designed for doorbells and calling systems.",
    {
      type: "Bell Push",
      application: "Doorbell",
      mounting: "Modular",
      operation: "Momentary",
    }
  ),

  createProduct(
    52,
    "16A Switch",
    "16a-switch",
    "Switches",
    120,
    150,
    Switch4,
    "Heavy Duty",
    true,
    "16A switch designed for high-load household electrical appliances.",
    {
      current: "16A",
      type: "Power Switch",
      application: "Home",
      mounting: "Modular",
    }
  ),

  createProduct(
    53,
    "20A Switch",
    "20a-switch",
    "Switches",
    150,
    180,
    Switch5,
    "Heavy Duty",
    true,
    "20A heavy-duty switch for higher electrical loads.",
    {
      current: "20A",
      type: "Power Switch",
      application: "Home & Commercial",
      mounting: "Modular",
    }
  ),

  createProduct(
    54,
    "Intermediate Switch",
    "intermediate-switch",
    "Switches",
    110,
    140,
    Switch6,
    "Premium",
    false,
    "Intermediate switch for controlling lighting circuits from multiple locations.",
    {
      type: "Intermediate Switch",
      application: "Home",
      mounting: "Modular",
      operation: "Multi Way",
    }
  ),

  createProduct(
    55,
    "Modular Switch",
    "modular-switch",
    "Switches",
    85,
    110,
    Switch7,
    "Popular",
    true,
    "Modern modular switch with a clean design for residential interiors.",
    {
      type: "Modular Switch",
      application: "Home & Office",
      mounting: "Modular",
      design: "Modern",
    }
  ),

  createProduct(
    56,
    "2 Module Switch",
    "2-module-switch",
    "Switches",
    100,
    130,
    Switch8,
    "Popular",
    false,
    "2 module switch suitable for modular electrical plates.",
    {
      type: "2 Module Switch",
      application: "Home",
      mounting: "Modular",
      modules: "2 Module",
    }
  ),

  createProduct(
    57,
    "3 Module Switch",
    "3-module-switch",
    "Switches",
    130,
    160,
    Switch9,
    "Premium",
    false,
    "3 module switch designed for modern modular switchboards.",
    {
      type: "3 Module Switch",
      application: "Home & Office",
      mounting: "Modular",
      modules: "3 Module",
    }
  ),

  createProduct(
    58,
    "4 Module Switch",
    "4-module-switch",
    "Switches",
    160,
    200,
    Switch10,
    "Premium",
    true,
    "4 module switch suitable for larger modular electrical panels.",
    {
      type: "4 Module Switch",
      application: "Home & Office",
      mounting: "Modular",
      modules: "4 Module",
    }
  ),

  createProduct(
    59,
    "Fan Regulator",
    "fan-regulator",
    "Switches",
    140,
    180,
    Switch11,
    "Best Seller",
    true,
    "Fan regulator for smooth and convenient fan speed control.",
    {
      type: "Fan Regulator",
      application: "Home",
      mounting: "Modular",
      control: "Fan Speed",
    }
  ),

  createProduct(
    60,
    "Dimmer Switch",
    "dimmer-switch",
    "Switches",
    180,
    220,
    Switch12,
    "Premium",
    true,
    "Dimmer switch for adjustable lighting brightness control.",
    {
      type: "Dimmer Switch",
      application: "Home",
      mounting: "Modular",
      control: "Light Brightness",
    }
  ),
    /* =======================================================
     SOCKET - 12 PRODUCTS
  ======================================================= */

  createProduct(
    61,
    "6A Socket",
    "6a-socket",
    "Socket",
    90,
    120,
    Socket1,
    "Popular",
    true,
    "6A socket suitable for everyday household electrical connections.",
    {
      current: "6A",
      type: "Socket",
      application: "Home",
      mounting: "Modular",
    }
  ),

  createProduct(
    62,
    "6A 2-Pin Socket",
    "6a-2-pin-socket",
    "Socket",
    80,
    110,
    Socket2,
    "Popular",
    true,
    "6A 2-pin socket for standard household electrical connections.",
    {
      current: "6A",
      type: "2-Pin Socket",
      application: "Home",
      mounting: "Modular",
    }
  ),

  createProduct(
    63,
    "6A 3-Pin Socket",
    "6a-3-pin-socket",
    "Socket",
    100,
    130,
    Socket3,
    "Popular",
    true,
    "6A 3-pin socket providing a secure electrical connection.",
    {
      current: "6A",
      type: "3-Pin Socket",
      application: "Home",
      mounting: "Modular",
    }
  ),

  createProduct(
    64,
    "16A Socket",
    "16a-socket",
    "Socket",
    140,
    180,
    Socket4,
    "Heavy Duty",
    true,
    "16A socket designed for higher-load household appliances.",
    {
      current: "16A",
      type: "Power Socket",
      application: "Home",
      mounting: "Modular",
    }
  ),

  createProduct(
    65,
    "16A 3-Pin Socket",
    "16a-3-pin-socket",
    "Socket",
    160,
    200,
    Socket5,
    "Heavy Duty",
    true,
    "16A 3-pin socket for high-load electrical appliances.",
    {
      current: "16A",
      type: "3-Pin Socket",
      application: "Home & Commercial",
      mounting: "Modular",
    }
  ),

  createProduct(
    66,
    "6A/16A Universal Socket",
    "6a-16a-universal-socket",
    "Socket",
    180,
    230,
    Socket6,
    "Best Seller",
    true,
    "Universal socket compatible with both 6A and 16A plugs.",
    {
      current: "6A / 16A",
      type: "Universal Socket",
      application: "Home & Office",
      mounting: "Modular",
      compatibility: "Multiple Plug Types",
    }
  ),

  createProduct(
    67,
    "USB Socket",
    "usb-socket",
    "Socket",
    280,
    350,
    Socket7,
    "Modern",
    true,
    "USB charging socket for convenient device charging.",
    {
      type: "USB Socket",
      application: "Home & Office",
      charging: "USB",
      mounting: "Modular",
    }
  ),

  createProduct(
    68,
    "USB-C Socket",
    "usb-c-socket",
    "Socket",
    320,
    400,
    Socket8,
    "Premium",
    true,
    "USB-C charging socket for modern electronic devices.",
    {
      type: "USB-C Socket",
      application: "Home & Office",
      charging: "USB-C",
      mounting: "Modular",
    }
  ),

  createProduct(
    69,
    "TV Socket",
    "tv-socket",
    "Socket",
    120,
    150,
    Socket9,
    "Modern",
    false,
    "TV socket designed for clean and convenient television connections.",
    {
      type: "TV Socket",
      application: "Home",
      connection: "TV",
      mounting: "Modular",
    }
  ),

  createProduct(
    70,
    "Telephone Socket",
    "telephone-socket",
    "Socket",
    110,
    140,
    Socket10,
    "Modern",
    false,
    "Telephone socket for standard telephone line connections.",
    {
      type: "Telephone Socket",
      application: "Home & Office",
      connection: "Telephone",
      mounting: "Modular",
    }
  ),

  createProduct(
    71,
    "Modular Socket",
    "modular-socket",
    "Socket",
    130,
    170,
    Socket11,
    "Popular",
    true,
    "Modern modular socket suitable for residential electrical installations.",
    {
      type: "Modular Socket",
      application: "Home & Office",
      mounting: "Modular",
      design: "Modern",
    }
  ),

  createProduct(
    72,
    "Heavy Duty Socket",
    "heavy-duty-socket",
    "Socket",
    220,
    280,
    Socket12,
    "Heavy Duty",
    true,
    "Heavy-duty socket designed for demanding electrical applications.",
    {
      type: "Heavy Duty Socket",
      application: "Commercial & Industrial",
      mounting: "Modular",
      protection: "High Load",
    }
  ),


  /* =======================================================
     EXTENSION BOARD - 12 PRODUCTS
  ======================================================= */

  createProduct(
    73,
    "4 Socket Extension Board",
    "4-socket-extension-board",
    "Extension Board",
    450,
    550,
    extension4,
    "Popular",
    true,
    "4-socket extension board for convenient multi-device power connection.",
    {
      sockets: "4",
      type: "Extension Board",
      application: "Home & Office",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    74,
    "6 Socket Extension Board",
    "6-socket-extension-board",
    "Extension Board",
    550,
    650,
    extension6,
    "Best Seller",
    true,
    "6-socket extension board suitable for multiple electrical devices.",
    {
      sockets: "6",
      type: "Extension Board",
      application: "Home & Office",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    75,
    "8 Socket Extension Board",
    "8-socket-extension-board",
    "Extension Board",
    700,
    850,
    extension8,
    "Heavy Duty",
    true,
    "8-socket extension board for powering multiple devices.",
    {
      sockets: "8",
      type: "Extension Board",
      application: "Office & Commercial",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    76,
    "Spike Guard",
    "spike-guard",
    "Extension Board",
    480,
    580,
    spikeGuard,
    "Protection",
    true,
    "Spike guard designed to protect connected electrical devices from voltage spikes.",
    {
      type: "Spike Guard",
      application: "Home & Office",
      protection: "Voltage Spike Protection",
      sockets: "Multiple",
    }
  ),

  createProduct(
    77,
    "Power Strip",
    "power-strip",
    "Extension Board",
    400,
    500,
    powerStrip,
    "Popular",
    true,
    "Power strip providing convenient access to multiple electrical connections.",
    {
      type: "Power Strip",
      application: "Home & Office",
      sockets: "Multiple",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    78,
    "4 Socket Power Strip",
    "4-socket-power-strip",
    "Extension Board",
    430,
    520,
    powerStrip4,
    "Popular",
    false,
    "4-socket power strip for convenient everyday use.",
    {
      sockets: "4",
      type: "Power Strip",
      application: "Home & Office",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    79,
    "8 Socket Power Strip",
    "8-socket-power-strip",
    "Extension Board",
    650,
    780,
    powerStrip8,
    "Heavy Duty",
    true,
    "8-socket power strip designed for multiple connected devices.",
    {
      sockets: "8",
      type: "Power Strip",
      application: "Office & Commercial",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    80,
    "10 Socket Power Strip",
    "10-socket-power-strip",
    "Extension Board",
    850,
    1000,
    powerStrip10,
    "Heavy Duty",
    true,
    "10-socket power strip for high-capacity multi-device power requirements.",
    {
      sockets: "10",
      type: "Power Strip",
      application: "Commercial",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    81,
    "USB Power Strip",
    "usb-power-strip",
    "Extension Board",
    700,
    850,
    powerStripm,
    "Modern",
    true,
    "Power strip with USB charging support for modern devices.",
    {
      type: "USB Power Strip",
      application: "Home & Office",
      charging: "USB",
      sockets: "Multiple",
    }
  ),

  createProduct(
    82,
    "USB Extension Board",
    "usb-extension-board",
    "Extension Board",
    750,
    900,
    powerStripr,
    "Modern",
    true,
    "USB extension board for powering electrical devices and charging USB devices.",
    {
      type: "USB Extension Board",
      application: "Home & Office",
      charging: "USB",
      sockets: "Multiple",
    }
  ),

  createProduct(
    83,
    "Heavy Duty Extension Board",
    "heavy-duty-extension-board",
    "Extension Board",
    900,
    1100,
    powerStripr1,
    "Heavy Duty",
    true,
    "Heavy-duty extension board designed for higher-load applications.",
    {
      type: "Heavy Duty Extension Board",
      application: "Commercial & Industrial",
      sockets: "Multiple",
      protection: "Overload Protection",
    }
  ),

  createProduct(
    84,
    "Surge Protector",
    "surge-protector",
    "Extension Board",
    850,
    1000,
    powerStripc,
    "Premium",
    true,
    "Surge protector designed to help protect connected electronic equipment.",
    {
      type: "Surge Protector",
      application: "Home & Office",
      protection: "Surge Protection",
      sockets: "Multiple",
    }
  ),
    /* =======================================================
     PLUG - 12 PRODUCTS
  ======================================================= */

  createProduct(
    85,
    "6A Plug Top",
    "6a-plug-top",
    "Plug",
    70,
    90,
    plug1,
    "Popular",
    true,
    "6A plug top suitable for everyday household electrical connections.",
    {
      current: "6A",
      type: "Plug Top",
      application: "Home",
      pins: "3 Pin",
    }
  ),

  createProduct(
    86,
    "16A Plug Top",
    "16a-plug-top",
    "Plug",
    120,
    150,
    plug2,
    "Heavy Duty",
    true,
    "16A plug top designed for higher-load electrical appliances.",
    {
      current: "16A",
      type: "Plug Top",
      application: "Home & Commercial",
      pins: "3 Pin",
    }
  ),

  createProduct(
    87,
    "6A 2-Pin Plug",
    "6a-2-pin-plug",
    "Plug",
    60,
    80,
    plug3,
    "Popular",
    true,
    "6A 2-pin plug suitable for standard household electrical devices.",
    {
      current: "6A",
      type: "2-Pin Plug",
      application: "Home",
      pins: "2 Pin",
    }
  ),

  createProduct(
    88,
    "6A 3-Pin Plug",
    "6a-3-pin-plug",
    "Plug",
    70,
    95,
    plug4,
    "Popular",
    true,
    "6A 3-pin plug providing a secure connection for household appliances.",
    {
      current: "6A",
      type: "3-Pin Plug",
      application: "Home",
      pins: "3 Pin",
    }
  ),

  createProduct(
    89,
    "16A 3-Pin Plug",
    "16a-3-pin-plug",
    "Plug",
    130,
    160,
    plug5,
    "Heavy Duty",
    true,
    "16A 3-pin plug designed for high-power electrical appliances.",
    {
      current: "16A",
      type: "3-Pin Plug",
      application: "Home & Commercial",
      pins: "3 Pin",
    }
  ),

  createProduct(
    90,
    "Universal Plug",
    "universal-plug",
    "Plug",
    180,
    230,
    plug6,
    "Best Seller",
    true,
    "Universal plug compatible with multiple socket configurations.",
    {
      type: "Universal Plug",
      application: "Home & Travel",
      compatibility: "Multiple Plug Types",
      design: "Universal",
    }
  ),

  createProduct(
    91,
    "Travel Adapter",
    "travel-adapter",
    "Plug",
    350,
    450,
    plug7,
    "Travel",
    true,
    "Compact travel adapter for convenient charging while travelling.",
    {
      type: "Travel Adapter",
      application: "Travel",
      compatibility: "Multiple Plug Types",
      design: "Compact",
    }
  ),

  createProduct(
    92,
    "International Travel Adapter",
    "international-travel-adapter",
    "Plug",
    550,
    700,
    plug8,
    "Premium",
    true,
    "International travel adapter designed for use with different plug standards.",
    {
      type: "International Travel Adapter",
      application: "Travel",
      compatibility: "International",
      design: "Universal",
    }
  ),

  createProduct(
    93,
    "USB Travel Adapter",
    "usb-travel-adapter",
    "Plug",
    500,
    650,
    plug9,
    "Modern",
    true,
    "Travel adapter with USB charging support.",
    {
      type: "USB Travel Adapter",
      application: "Travel",
      charging: "USB",
      compatibility: "Multiple Plug Types",
    }
  ),

  createProduct(
    94,
    "Right Angle Plug",
    "right-angle-plug",
    "Plug",
    100,
    130,
    plug10,
    "Modern",
    false,
    "Right angle plug designed for convenient connections in tight spaces.",
    {
      type: "Right Angle Plug",
      application: "Home",
      design: "Right Angle",
      current: "6A",
    }
  ),

  createProduct(
    95,
    "Heavy Duty Plug",
    "heavy-duty-plug",
    "Plug",
    180,
    230,
    plug11,
    "Heavy Duty",
    true,
    "Heavy-duty plug designed for demanding electrical applications.",
    {
      type: "Heavy Duty Plug",
      application: "Commercial & Industrial",
      construction: "Heavy Duty",
      current: "16A",
    }
  ),

  createProduct(
    96,
    "Industrial Plug",
    "industrial-plug",
    "Plug",
    350,
    450,
    plug12,
    "Industrial",
    true,
    "Industrial plug designed for reliable electrical connections in demanding environments.",
    {
      type: "Industrial Plug",
      application: "Industrial",
      construction: "Heavy Duty",
      protection: "Industrial Grade",
    }
  ),
];

/* =========================================================
   EXPORT PRODUCTS
========================================================= */

export default products;