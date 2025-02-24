export interface IChatResponse {
  channels: Record<string, IChannel>;
}

export interface IStatsResponse {
  active_nodes: number;
  total_chat: number;
  total_nodes: number;
  total_messages: number;
  total_mqtt_messages: number;
  total_telemetry: number;
  total_traceroutes: number;
}

export interface ITelemetryResponse {
  channel: number;
  decoded: {
    payload: string;
    portnum: number;
  };
  from: string;
  hop_limit?: number;
  hop_start?: number;
  id: number;
  payload: { [key: string]: number };
  rssi: number;
  rx_rssi?: number;
  rx_snr?: number;
  rx_time?: number;
  snr: number;
  timestamp: number;
  to: string;
  topic: string;
  type: "telemetry";
  priority?: number;
}

export interface ITraceroutesResponse {
  channel: number;
  decoded?: {
    portnum: number;
    request_id?: number;
    want_response?: boolean;
  };
  from: string;
  hop_start?: number;
  id: number;
  payload: {
    route: string[];
  };
  route: string[];
  route_ids?: string[];
  rssi: number;
  rx_rssi?: number;
  rx_snr?: number;
  rx_time?: number;
  snr: number;
  timestamp: number;
  to: string;
  topic?: string;
  type: "traceroute";
  want_ack?: boolean;
  hop_limit?: number;
  hops_away?: number;
  sender?: string;
}

export interface IMessagesResponse {
  channel: number;
  from: string;
  hop_limit: number;
  hop_start: number;
  id: number;
  rx_rssi?: number;
  rx_snr?: number;
  rx_time: number;
  to: string;
  rssi: number;
  snr: number;
  timestamp: number;
  topic: string;
  type: string;
  payload: Payload;
  priority?: number;
}

export interface Payload {
  hw_model?: number;
  id?: string;
  long_name?: string;
  macaddr?: string;
  short_name?: string;
  air_util_tx?: number;
  battery_level?: number;
  channel_utilization?: number;
  uptime_seconds?: number;
  voltage?: number;
}

export interface IChannel {
  messages: IMessage[];
  totalMessages: number;
  name: string;
}

export interface IMessage {
  /**
   * ID is not unique
   */
  id: number;
  to: string;
  from: string;
  sender: string;
  hops_away: number;
  timestamp: number;
  message: string;
  text: string;
}

export type INodesResponse = Record<string, INode>;

export interface INode {
  id: string;
  active: boolean;
  shortname: string;
  longname: string;
  location: string;
  status: string;
  last_seen: string;
  hardware: number | null;
  role?: NodeRole;
  position?: INodePosition;
  telemetry?: { [key: string]: number } | null;
  neighborinfo?: {
    last_sent_by_id: string;
    neighbors_count: number;
    node_broadcast_interval_secs: number;
    node_id: number;
    neighbors?: INeighbor[];
  };
}

export enum NodeRole {
  CLIENT = 0,
  CLIENT_MUTE = 1,
  ROUTER = 2,
  ROUTER_CLIENT = 3,
  REPEATER = 4,
  TRACKER = 5,
  SENSOR = 6,
  ATAK = 7,
  CLIENT_HIDDEN = 8,
  LOST_AND_FOUND = 9,
  ATAK_TRACKER = 10,
}

export const roleTitles: {
  [key in NodeRole]: { title: string; abbreviation: string };
} = {
  [NodeRole.CLIENT]: { title: "Client", abbreviation: "C" },
  [NodeRole.CLIENT_MUTE]: { title: "Client Mute", abbreviation: "CM" },
  [NodeRole.ROUTER]: { title: "Router", abbreviation: "R" },
  [NodeRole.ROUTER_CLIENT]: { title: "Router Client", abbreviation: "RC" },
  [NodeRole.REPEATER]: { title: "Repeater", abbreviation: "RE" },
  [NodeRole.TRACKER]: { title: "Tracker", abbreviation: "T" },
  [NodeRole.SENSOR]: { title: "Sensor", abbreviation: "S" },
  [NodeRole.ATAK]: { title: "ATAK", abbreviation: "A" },
  [NodeRole.CLIENT_HIDDEN]: { title: "Client Hidden", abbreviation: "CH" },
  [NodeRole.LOST_AND_FOUND]: { title: "Lost and Found", abbreviation: "LF" },
  [NodeRole.ATAK_TRACKER]: { title: "ATAK Tracker", abbreviation: "AT" },
};

export interface INeighbor {
  last_rx_time: number;
  node_broadcast_interval_secs: number;
  node_id: number;
  snr: number;
  distance?: number;
}

export interface INodePosition {
  altitude?: number;
  latitude_i: number;
  latitude: number;
  longitude_i: number;
  longitude: number;
  precision_bits?: number;
  time?: number;
  PDOP?: number;
  ground_speed?: number;
  sats_in_view?: number;
  ground_track?: number;
  timestamp?: number;
  geocoded?: {
    display_name: string;
  };
}

export enum HardwareModel {
  UNSET = 0,
  TLORA_V2 = 1,
  TLORA_V1 = 2,
  TLORA_V2_1_1P6 = 3,
  TBEAM = 4,
  HELTEC_V2_0 = 5,
  TBEAM_V0P7 = 6,
  T_ECHO = 7,
  TLORA_V1_1P3 = 8,
  RAK4631 = 9,
  HELTEC_V2_1 = 10,
  HELTEC_V1 = 11,
  LILYGO_TBEAM_S3_CORE = 12,
  RAK11200 = 13,
  NANO_G1 = 14,
  TLORA_V2_1_1P8 = 15,
  TLORA_T3_S3 = 16,
  NANO_G1_EXPLORER = 17,
  NANO_G2_ULTRA = 18,
  LORA_TYPE = 19,
  WIPHONE = 20,
  WIO_WM1110 = 21,
  RAK2560 = 22,
  HELTEC_HRU_3601 = 23,
  STATION_G1 = 25,
  RAK11310 = 26,
  SENSELORA_RP2040 = 27,
  SENSELORA_S3 = 28,
  CANARYONE = 29,
  RP2040_LORA = 30,
  STATION_G2 = 31,
  LORA_RELAY_V1 = 32,
  NRF52840DK = 33,
  PPR = 34,
  GENIEBLOCKS = 35,
  NRF52_UNKNOWN = 36,
  PORTDUINO = 37,
  ANDROID_SIM = 38,
  DIY_V1 = 39,
  NRF52840_PCA10059 = 40,
  DR_DEV = 41,
  M5STACK = 42,
  HELTEC_V3 = 43,
  HELTEC_WSL_V3 = 44,
  BETAFPV_2400_TX = 45,
  BETAFPV_900_NANO_TX = 46,
  RPI_PICO = 47,
  HELTEC_WIRELESS_TRACKER = 48,
  HELTEC_WIRELESS_PAPER = 49,
  T_DECK = 50,
  T_WATCH_S3 = 51,
  PICOMPUTER_S3 = 52,
  HELTEC_HT62 = 53,
  EBYTE_ESP32_S3 = 54,
  ESP32_S3_PICO = 55,
  CHATTER_2 = 56,
  HELTEC_WIRELESS_PAPER_V1_0 = 57,
  HELTEC_WIRELESS_TRACKER_V1_0 = 58,
  UNPHONE = 59,
  TD_LORAC = 60,
  CDEBYTE_EORA_S3 = 61,
  TWC_MESH_V4 = 62,
  NRF52_PROMICRO_DIY = 63,
  RADIOMASTER_900_BANDIT_NANO = 64,
  HELTEC_CAPSULE_SENSOR_V3 = 65,
  PRIVATE_HW = 255,
}

export const HARDWARE_PHOTOS: { [key in HardwareModel]?: string } = {
  [HardwareModel.HELTEC_HT62]: "HELTEC_HT62.png",
  [HardwareModel.HELTEC_V2_0]: "HELTEC_V2_0.png",
  [HardwareModel.HELTEC_V2_1]: "HELTEC_V2_1.png",
  [HardwareModel.HELTEC_V3]: "HELTEC_V3.png",
  [HardwareModel.HELTEC_WIRELESS_PAPER]: "HELTEC_WIRELESS_PAPER.png",
  [HardwareModel.HELTEC_WIRELESS_PAPER_V1_0]: "HELTEC_WIRELESS_PAPER_V1_0.png",
  [HardwareModel.HELTEC_WIRELESS_TRACKER]: "HELTEC_WIRELESS_TRACKER.png",
  [HardwareModel.HELTEC_WIRELESS_TRACKER_V1_0]:
    "HELTEC_WIRELESS_TRACKER_V1_0.png",
  [HardwareModel.HELTEC_WSL_V3]: "HELTEC_WSL_V3.png",
  [HardwareModel.LILYGO_TBEAM_S3_CORE]: "LILYGO_TBEAM_S3_CORE.png",
  [HardwareModel.NANO_G1_EXPLORER]: "NANO_G1_EXPLORER.png",
  [HardwareModel.NANO_G2_ULTRA]: "NANO_G2_ULTRA.png",
  [HardwareModel.NRF52_PROMICRO_DIY]: "NRF52_PROMICRO_DIY.png",
  [HardwareModel.RAK11310]: "RAK11310.png",
  [HardwareModel.RAK4631]: "RAK4631.png",
  [HardwareModel.RP2040_LORA]: "RP2040_LORA.png",
  [HardwareModel.RPI_PICO]: "RPI_PICO.png",
  [HardwareModel.TBEAM]: "TBEAM.png",
  [HardwareModel.TLORA_T3_S3]: "TLORA_T3_S3.png",
  [HardwareModel.TLORA_V2_1_1P6]: "TLORA_V2_1_1P6.png",
  [HardwareModel.T_DECK]: "T_DECK.png",
  [HardwareModel.T_ECHO]: "T_ECHO.png",
  [HardwareModel.T_WATCH_S3]: "T_WATCH_S3.png",
  [HardwareModel.PRIVATE_HW]: "PRIVATE_HW.png",
};

export interface IMqttMessagesResponse {
  channel: number;
  decoded: {
    payload: string;
    portnum: number;
    want_response?: boolean;
    request_id?: number;
  };
  from: string;
  hop_limit?: number;
  hop_start: number;
  id: number;
  rx_rssi?: number;
  rx_snr?: number;
  rx_time: number;
  to: string;
  rssi: number;
  snr: number;
  timestamp: number;
  topic: string;
  type: "nodeinfo" | "telemetry";
  payload?: unknown;
  priority?: number;
}
